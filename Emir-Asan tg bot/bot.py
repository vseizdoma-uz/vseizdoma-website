import os
import asyncio
import logging
import sqlite3
import base64
from datetime import datetime

from aiogram import Bot, Dispatcher, types, F
from aiogram.filters import Command
from aiogram.types import InlineKeyboardMarkup, InlineKeyboardButton, BufferedInputFile
from aiogram.fsm.context import FSMContext
from aiogram.fsm.state import State, StatesGroup
from aiogram.fsm.storage.memory import MemoryStorage

import aiohttp
from aiohttp import ClientTimeout
import trimesh
import io

# ========================================
# КОНФИГУРАЦИЯ
# ========================================

BOT_TOKEN = "8473740910:AAFXjXyLfnE7jmc_0nkZxNjawIhQ_rnCgeo"
TRIPO_API_KEY = "tsk_4a1jNuk85uh16_v8kRchYEGMUn4yvIHVTfaI-L2CEBy"

TRIPO_BASE_URL = "https://api.tripo3d.ai/v2/openapi"

logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

bot = Bot(token=BOT_TOKEN)
storage = MemoryStorage()
dp = Dispatcher(storage=storage)

user_sessions = {}

# ========================================
# ДИЗАЙН
# ========================================

WELCOME = """
╭━━━━━━━━━━━━━━━━━━━━━━━━━╮
┃  🎮  <b>3D MODEL AI</b>  ┃
╰━━━━━━━━━━━━━━━━━━━━━━━━━╯

Привет! Я создаю <b>3D модели из фото</b>.

<b>Как работаю:</b>
┌ 📷 Кинь фото объекта
├ ⚙️ AI создаст 3D модель
└ 📦 Получишь OBJ/GLB/FBX файл

<b>Поддерживаемые форматы:</b>
• GLB (универсальный)
• FBX (Unreal, Unity)
• OBJ + MTL

<i>Отправь фото чтобы начать!</i>
"""

PHOTO_RECEIVED = """
╭━━━━━━━━━━━━━━━━━━━━━━━━━╮
┃  📷  <b>ФОТО ПОЛУЧЕНО</b>  ┃
╰━━━━━━━━━━━━━━━━━━━━━━━━━╯

Фото принято! Нажми кнопку чтобы создать 3D модель.

<b>Советы для лучшего результата:</b>
• Объект на однотонном фоне
• Полностью в кадре
• Хорошее освещение
"""

GENERATING = """
╭━━━━━━━━━━━━━━━━━━━━━━━━━╮
┃  ⚡ <b>ГЕНЕРАЦИЯ 3D</b>  ┃
╰━━━━━━━━━━━━━━━━━━━━━━━━━╯

🔄 Создаю 3D модель из твоего фото...

<b>Статус:</b> {status}

⏳ Обычно занимает 1-2 минуты
"""

# ========================================
# БАЗА ДАННЫХ
# ========================================

DB_PATH = "model3d_bot.db"

def init_db():
    conn = sqlite3.connect(DB_PATH)
    c = conn.cursor()
    c.execute('''CREATE TABLE IF NOT EXISTS users (
        user_id INTEGER PRIMARY KEY,
        username TEXT,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    )''')
    c.execute('''CREATE TABLE IF NOT EXISTS generations (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        user_id INTEGER,
        task_id TEXT,
        status TEXT DEFAULT 'pending',
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    )''')
    conn.commit()
    conn.close()
    logger.info("💾 DB Ready")

def save_user(user_id, username=None):
    conn = sqlite3.connect(DB_PATH)
    c = conn.cursor()
    c.execute('INSERT OR REPLACE INTO users (user_id, username) VALUES (?, ?)', (user_id, username))
    conn.commit()
    conn.close()

def save_generation(user_id, task_id):
    conn = sqlite3.connect(DB_PATH)
    c = conn.cursor()
    c.execute('INSERT INTO generations (user_id, task_id) VALUES (?, ?)', (user_id, task_id))
    conn.commit()
    conn.close()

def update_generation(task_id, status):
    conn = sqlite3.connect(DB_PATH)
    c = conn.cursor()
    c.execute('UPDATE generations SET status = ? WHERE task_id = ?', (status, task_id))
    conn.commit()
    conn.close()

# ========================================
# СОСТОЯНИЯ
# ========================================

class S(StatesGroup):
    waiting_photo = State()
    generating = State()

# ========================================
# КЛАВИАТУРЫ
# ========================================

def kb_generate():
    return InlineKeyboardMarkup(inline_keyboard=[
        [InlineKeyboardButton(text="🎮 Создать 3D модель", callback_data="gen3d")]
    ])

def kb_formats():
    return InlineKeyboardMarkup(inline_keyboard=[
        [
            InlineKeyboardButton(text="📦 OBJ", callback_data="dl_obj"),
            InlineKeyboardButton(text="🎮 GLB", callback_data="dl_glb")
        ],
        [InlineKeyboardButton(text="📷 Новое фото", callback_data="new_photo")]
    ])

# ========================================
# TRIPO3D API
# ========================================

async def download_photo(file_id: str) -> bytes:
    """Скачать фото из Telegram"""
    file = await bot.get_file(file_id)
    async with aiohttp.ClientSession() as s:
        async with s.get(f"https://api.telegram.org/file/bot{BOT_TOKEN}/{file.file_path}") as r:
            return await r.read()

async def upload_image_to_tripo(image_data: bytes) -> dict:
    """Загрузить изображение в Tripo и получить file_token"""
    try:
        headers = {
            "Authorization": f"Bearer {TRIPO_API_KEY}"
        }

        # Создаём multipart form data
        form = aiohttp.FormData()
        form.add_field('file', image_data, filename='image.jpg', content_type='image/jpeg')

        async with aiohttp.ClientSession() as session:
            async with session.post(
                f"{TRIPO_BASE_URL}/upload",
                headers=headers,
                data=form
            ) as resp:
                result = await resp.json()
                logger.info(f"Upload response: {result}")

                if resp.status == 200:
                    # Tripo возвращает image_token в data
                    data = result.get("data", {})
                    image_token = data.get("image_token")
                    if image_token:
                        return {"success": True, "image_token": image_token}
                    else:
                        return {"success": False, "error": "No image_token in response"}
                else:
                    error_msg = result.get("message", str(result))
                    return {"success": False, "error": error_msg}

    except Exception as e:
        logger.error(f"Upload error: {e}")
        return {"success": False, "error": str(e)}

async def create_3d_task(image_token: str) -> dict:
    """Создать задачу на генерацию 3D модели"""
    try:
        headers = {
            "Authorization": f"Bearer {TRIPO_API_KEY}",
            "Content-Type": "application/json"
        }

        payload = {
            "type": "image_to_model",
            "file": {
                "type": "jpg",
                "file_token": image_token
            }
        }

        async with aiohttp.ClientSession() as session:
            async with session.post(
                f"{TRIPO_BASE_URL}/task",
                headers=headers,
                json=payload
            ) as resp:
                result = await resp.json()
                logger.info(f"Create task response: {result}")

                if resp.status == 200:
                    data = result.get("data", {})
                    task_id = data.get("task_id")
                    if task_id:
                        return {"success": True, "task_id": task_id}
                    else:
                        return {"success": False, "error": "No task_id in response"}
                else:
                    error_msg = result.get("message", str(result))
                    return {"success": False, "error": error_msg}

    except Exception as e:
        logger.error(f"Create task error: {e}")
        return {"success": False, "error": str(e)}

async def get_task_status(task_id: str) -> dict:
    """Получить статус задачи"""
    try:
        headers = {
            "Authorization": f"Bearer {TRIPO_API_KEY}"
        }

        async with aiohttp.ClientSession() as session:
            async with session.get(
                f"{TRIPO_BASE_URL}/task/{task_id}",
                headers=headers
            ) as resp:
                result = await resp.json()
                logger.info(f"Task status: {result}")
                return result.get("data", result)

    except Exception as e:
        logger.error(f"Get status error: {e}")
        return {"status": "failed", "message": str(e)}

async def wait_for_completion(task_id: str, status_message, max_wait: int = 300) -> dict:
    """Ждать завершения генерации"""
    start_time = asyncio.get_event_loop().time()
    last_status = ""

    status_map = {
        "queued": "В очереди...",
        "running": "Генерация...",
        "success": "Готово!",
        "failed": "Ошибка"
    }

    while True:
        elapsed = asyncio.get_event_loop().time() - start_time
        if elapsed > max_wait:
            return {"status": "failed", "message": "Timeout - слишком долго"}

        result = await get_task_status(task_id)
        status = result.get("status", "unknown")

        # Обновляем сообщение
        if status != last_status:
            last_status = status
            status_text = status_map.get(status, status)
            try:
                await status_message.edit_text(
                    GENERATING.format(status=status_text),
                    parse_mode="HTML"
                )
            except:
                pass

        if status == "success":
            return result
        elif status == "failed":
            return result

        await asyncio.sleep(3)

async def download_model(url: str) -> bytes:
    """Скачать файл модели с retry"""
    timeout = ClientTimeout(total=120)
    for attempt in range(3):
        try:
            async with aiohttp.ClientSession(timeout=timeout) as session:
                async with session.get(url) as resp:
                    return await resp.read()
        except Exception as e:
            logger.error(f"Download attempt {attempt+1} failed: {e}")
            if attempt == 2:
                raise
            await asyncio.sleep(2)

def convert_glb_to_obj(glb_data: bytes) -> tuple:
    """Конвертировать GLB в OBJ + MTL"""
    try:
        # Загружаем GLB из байтов
        mesh = trimesh.load(io.BytesIO(glb_data), file_type='glb')

        # Если это сцена, объединяем все меши
        if isinstance(mesh, trimesh.Scene):
            meshes = []
            for name, geometry in mesh.geometry.items():
                if isinstance(geometry, trimesh.Trimesh):
                    meshes.append(geometry)
            if meshes:
                mesh = trimesh.util.concatenate(meshes)
            else:
                return None, None

        # Экспортируем в OBJ
        obj_data = mesh.export(file_type='obj')

        return obj_data, None

    except Exception as e:
        logger.error(f"Convert error: {e}")
        return None, None

# ========================================
# ОБРАБОТЧИКИ
# ========================================

@dp.message(Command("start"))
async def cmd_start(msg: types.Message, state: FSMContext):
    await state.clear()
    user_sessions[msg.from_user.id] = {}
    save_user(msg.from_user.id, msg.from_user.username)
    await msg.answer(WELCOME, parse_mode="HTML")
    await state.set_state(S.waiting_photo)

@dp.message(Command("help"))
async def cmd_help(msg: types.Message):
    await msg.answer("""
╭━━━━━━━━━━━━━━━━━━━━━━━╮
┃  ❓  <b>ПОМОЩЬ</b>  ┃
╰━━━━━━━━━━━━━━━━━━━━━━━╯

<b>Как использовать:</b>
1. Отправь фото объекта
2. Нажми "Создать 3D модель"
3. Подожди 1-2 минуты
4. Скачай модель в нужном формате

<b>Советы для лучшего результата:</b>
• Фото на однотонном фоне
• Объект полностью в кадре
• Хорошее освещение
• Без размытия

<b>Форматы:</b>
• GLB - универсальный (веб, игры)
• FBX - Unreal Engine, Unity
• OBJ - 3ds Max, Blender, Maya
""", parse_mode="HTML")

# ========================================
# ФОТО
# ========================================

@dp.message(F.photo)
async def on_photo(msg: types.Message, state: FSMContext):
    user_id = msg.from_user.id
    photo = msg.photo[-1]  # Лучшее качество

    save_user(user_id, msg.from_user.username)

    # Скачиваем фото
    wait_msg = await msg.answer("⏳ Загружаю фото...")
    image_data = await download_photo(photo.file_id)
    await wait_msg.delete()

    # Сохраняем в сессию
    user_sessions[user_id] = {
        'image_data': image_data,
        'model_urls': None,
        'task_id': None
    }

    await msg.answer(PHOTO_RECEIVED, parse_mode="HTML", reply_markup=kb_generate())
    await state.set_state(S.waiting_photo)

# ========================================
# ГЕНЕРАЦИЯ 3D
# ========================================

@dp.callback_query(F.data == "gen3d")
async def cb_generate(cb: types.CallbackQuery, state: FSMContext):
    await cb.answer("🎮 Начинаю генерацию...")

    user_id = cb.from_user.id
    session = user_sessions.get(user_id, {})

    if not session.get('image_data'):
        await cb.message.answer("❌ Фото не найдено. Отправь новое фото.")
        return

    await state.set_state(S.generating)

    # Статус сообщение
    status_msg = await cb.message.answer(
        GENERATING.format(status="Загрузка изображения..."),
        parse_mode="HTML"
    )

    # 1. Загружаем изображение в Tripo
    upload_result = await upload_image_to_tripo(session['image_data'])

    if not upload_result.get('success'):
        await status_msg.edit_text(f"❌ Ошибка загрузки: {upload_result.get('error')}")
        await state.set_state(S.waiting_photo)
        return

    image_token = upload_result['image_token']

    # 2. Создаём задачу
    await status_msg.edit_text(
        GENERATING.format(status="Создание задачи..."),
        parse_mode="HTML"
    )

    create_result = await create_3d_task(image_token)

    if not create_result.get('success'):
        await status_msg.edit_text(f"❌ Ошибка: {create_result.get('error')}")
        await state.set_state(S.waiting_photo)
        return

    task_id = create_result['task_id']
    session['task_id'] = task_id
    user_sessions[user_id] = session
    save_generation(user_id, task_id)

    # 3. Ждём завершения
    result = await wait_for_completion(task_id, status_msg)

    if result.get('status') == 'success':
        # Получаем URL моделей из output
        output = result.get('output', {})

        # Tripo возвращает pbr_model как основную модель в GLB формате
        model_urls = {
            'glb': output.get('pbr_model') or output.get('model'),
            'rendered_image': output.get('rendered_image')
        }

        logger.info(f"Model URLs: {model_urls}")

        session['model_urls'] = model_urls
        user_sessions[user_id] = session

        update_generation(task_id, 'completed')

        # Результат
        caption = """
╭━━━━━━━━━━━━━━━━━━━━━━━━━╮
┃  ✅  <b>3D МОДЕЛЬ ГОТОВА!</b>  ┃
╰━━━━━━━━━━━━━━━━━━━━━━━━━╯

Выбери формат для скачивания:
"""

        await status_msg.delete()

        # Отправляем превью если есть
        rendered = model_urls.get('rendered_image')
        if rendered:
            try:
                await cb.message.answer_photo(
                    photo=rendered,
                    caption=caption,
                    parse_mode="HTML",
                    reply_markup=kb_formats()
                )
            except:
                await cb.message.answer(
                    caption,
                    parse_mode="HTML",
                    reply_markup=kb_formats()
                )
        else:
            await cb.message.answer(
                caption,
                parse_mode="HTML",
                reply_markup=kb_formats()
            )
    else:
        error_msg = result.get('message', 'Неизвестная ошибка')
        update_generation(task_id, 'failed')
        await status_msg.edit_text(f"❌ Ошибка генерации: {error_msg}")

    await state.set_state(S.waiting_photo)

# ========================================
# СКАЧИВАНИЕ МОДЕЛЕЙ
# ========================================

@dp.callback_query(F.data == "dl_glb")
async def cb_download_glb(cb: types.CallbackQuery):
    user_id = cb.from_user.id
    session = user_sessions.get(user_id, {})
    model_urls = session.get('model_urls', {})

    if not model_urls:
        await cb.answer("❌ Модель не найдена. Сгенерируй заново.", show_alert=True)
        return

    model_url = model_urls.get('glb')

    if not model_url:
        await cb.answer("❌ GLB файл недоступен", show_alert=True)
        return

    await cb.answer("⬇️ Скачиваю GLB...")

    try:
        # Скачиваем модель
        model_data = await download_model(model_url)

        # Отправляем файл
        await cb.message.answer_document(
            document=BufferedInputFile(model_data, "model.glb"),
            caption="📦 <b>GLB</b> модель готова!\n\n<i>Открывается в Blender, 3ds Max, Unity, Unreal Engine</i>",
            parse_mode="HTML"
        )

    except Exception as e:
        logger.error(f"Download error: {e}")
        await cb.message.answer(f"❌ Ошибка скачивания: {e}")

@dp.callback_query(F.data == "dl_obj")
async def cb_download_obj(cb: types.CallbackQuery):
    user_id = cb.from_user.id
    session = user_sessions.get(user_id, {})
    model_urls = session.get('model_urls', {})

    if not model_urls:
        await cb.answer("❌ Модель не найдена. Сгенерируй заново.", show_alert=True)
        return

    model_url = model_urls.get('glb')

    if not model_url:
        await cb.answer("❌ Модель недоступна", show_alert=True)
        return

    await cb.answer("⬇️ Конвертирую в OBJ...")

    wait_msg = None
    try:
        wait_msg = await cb.message.answer("🔄 Скачиваю и конвертирую в OBJ...")

        # Скачиваем GLB
        glb_data = await download_model(model_url)
        logger.info(f"Downloaded GLB: {len(glb_data)} bytes")

        # Конвертируем в OBJ
        obj_data, _ = await asyncio.to_thread(convert_glb_to_obj, glb_data)
        logger.info(f"Converted to OBJ: {len(obj_data) if obj_data else 0} bytes")

        if wait_msg:
            try:
                await wait_msg.delete()
            except:
                pass

        if obj_data:
            # Отправляем OBJ файл с retry
            for attempt in range(3):
                try:
                    await cb.message.answer_document(
                        document=BufferedInputFile(obj_data, "model.obj"),
                        caption="📦 <b>OBJ</b> модель готова!\n\n<i>Открывается в 3ds Max, Blender, Maya, Cinema 4D</i>",
                        parse_mode="HTML"
                    )
                    break
                except Exception as send_err:
                    logger.error(f"Send attempt {attempt+1} failed: {send_err}")
                    if attempt == 2:
                        await cb.message.answer("❌ Ошибка отправки. Проверь интернет и попробуй ещё раз.")
                    else:
                        await asyncio.sleep(3)
        else:
            await cb.message.answer("❌ Ошибка конвертации. Попробуй скачать GLB.")

    except Exception as e:
        logger.error(f"Download/convert error: {e}")
        if wait_msg:
            try:
                await wait_msg.delete()
            except:
                pass
        await cb.message.answer(f"❌ Ошибка: {e}")

@dp.callback_query(F.data == "new_photo")
async def cb_new_photo(cb: types.CallbackQuery, state: FSMContext):
    await cb.answer()
    user_sessions[cb.from_user.id] = {}
    await cb.message.answer("📷 Отправь новое фото для создания 3D модели")
    await state.set_state(S.waiting_photo)

# ========================================
# ЗАПУСК
# ========================================

async def main():
    init_db()
    logger.info("🎮 3D MODEL AI BOT запущен!")
    logger.info("🔧 API: Tripo3D")
    logger.info("📦 Форматы: GLB, FBX, OBJ")
    await dp.start_polling(bot)

if __name__ == "__main__":
    asyncio.run(main())
