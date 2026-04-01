const TelegramBot = require('node-telegram-bot-api');
const { GoogleGenerativeAI } = require('@google/generative-ai');
const axios = require('axios');
const fs = require('fs');
const path = require('path');
require('dotenv').config();

// ========================================
// КОНФИГУРАЦИЯ
// ========================================

const TOKEN = process.env.BOT_TOKEN || '8473740910:AAHQ19FSzm67YE7AZqZf-Nwj23xQEeYzia0';
const GEMINI_API_KEY = process.env.GEMINI_API_KEY || 'AIzaSyB_hqlG6q4wVVbb0uWdXsuBrR6vxakXPvY';

// Инициализация бота
const bot = new TelegramBot(TOKEN, { polling: true });

// Инициализация Gemini AI
const genAI = new GoogleGenerativeAI(GEMINI_API_KEY);

// Хранилище пользовательских данных (в памяти)
const userSessions = {};

// Коллектор для медиа-групп (фото приходят по одному с задержкой)
const photoCollectors = {}; // { chatId: { timer: null } }

// ========================================
// VEO 3.1 — ГЕНЕРАЦИЯ ВИДЕО
// ========================================

const VEO_BASE_URL = 'https://generativelanguage.googleapis.com/v1beta';
const VEO_MODEL = 'veo-3.1-generate-preview';

/**
 * Запускает генерацию видео через Veo 3.1
 */
async function startVideoGeneration(imageBuffer, prompt) {
  const imageBase64 = imageBuffer.toString('base64');

  const response = await axios.post(
    `${VEO_BASE_URL}/models/${VEO_MODEL}:predictLongRunning`,
    {
      instances: [{
        prompt: prompt,
        image: {
          bytesBase64Encoded: imageBase64,
          mimeType: 'image/jpeg'
        }
      }],
      parameters: {
        aspectRatio: '16:9',
        durationSeconds: 8,
        personGeneration: 'allow_adult'
      }
    },
    {
      headers: {
        'x-goog-api-key': GEMINI_API_KEY,
        'Content-Type': 'application/json'
      },
      maxBodyLength: Infinity
    }
  );

  return response.data.name; // operation name
}

/**
 * Проверяет статус операции Veo
 */
async function checkVeoOperation(operationName) {
  const response = await axios.get(
    `${VEO_BASE_URL}/${operationName}`,
    {
      headers: { 'x-goog-api-key': GEMINI_API_KEY }
    }
  );
  return response.data;
}

/**
 * Скачивает готовое видео по URI
 */
async function downloadVeoVideo(videoUri) {
  const separator = videoUri.includes('?') ? '&' : '?';
  const url = `${videoUri}${separator}key=${GEMINI_API_KEY}`;
  const response = await axios.get(url, { responseType: 'arraybuffer' });
  return Buffer.from(response.data);
}

/**
 * Полный цикл генерации видео: запуск, ожидание, скачивание
 */
async function generateVideo(imageBuffer, prompt, onProgress) {
  // Запускаем генерацию
  const operationName = await startVideoGeneration(imageBuffer, prompt);
  if (onProgress) onProgress('started', operationName);

  // Ждём завершения (до 6 минут)
  for (let i = 0; i < 36; i++) {
    await new Promise(r => setTimeout(r, 10000)); // 10 сек
    const status = await checkVeoOperation(operationName);

    if (status.done) {
      // Проверяем фильтрацию
      const resp = status.response;
      if (resp && resp.generateVideoResponse && resp.generateVideoResponse.generatedSamples
          && resp.generateVideoResponse.generatedSamples.length > 0) {
        const videoUri = resp.generateVideoResponse.generatedSamples[0].video.uri;
        const videoBuffer = await downloadVeoVideo(videoUri);
        return { success: true, videoBuffer };
      }

      // Проверяем формат ответа от нового SDK
      if (resp && resp.generatedVideos && resp.generatedVideos.length > 0) {
        const videoUri = resp.generatedVideos[0].video.uri;
        const videoBuffer = await downloadVeoVideo(videoUri);
        return { success: true, videoBuffer };
      }

      // Фильтрация контента
      const filtered = resp?.raiMediaFilteredReasons || status.response?.generateVideoResponse?.raiMediaFilteredReasons;
      if (filtered) {
        return { success: false, error: `Контент заблокирован фильтром Google: ${filtered.join(', ')}` };
      }

      return { success: false, error: 'Видео не было сгенерировано' };
    }

    if (onProgress) onProgress('waiting', i + 1);
  }

  return { success: false, error: 'Превышено время ожидания (6 минут)' };
}

// ========================================
// ВСПОМОГАТЕЛЬНЫЕ ФУНКЦИИ
// ========================================

/**
 * Возвращает клавиатуру главного меню
 */
function getMainMenuKeyboard() {
  return {
    keyboard: [
      ['📝 Новое ТЗ', '🎬 Veo 3 Видео'],
      ['📐 Пример анализа', 'ℹ️ Помощь']
    ],
    resize_keyboard: true
  };
}

/**
 * Скачивает файл изображения от Telegram
 */
async function downloadImage(fileId) {
  try {
    const file = await bot.getFile(fileId);
    const fileUrl = `https://api.telegram.org/file/bot${TOKEN}/${file.file_path}`;

    const response = await axios.get(fileUrl, { responseType: 'arraybuffer' });
    return Buffer.from(response.data);
  } catch (error) {
    console.error('Ошибка скачивания изображения:', error);
    throw error;
  }
}

/**
 * Конвертирует изображение в base64
 */
function imageToBase64(buffer) {
  return buffer.toString('base64');
}

/**
 * Генерирует фотореалистичное изображение из одного или нескольких изображений и описания
 * @param {Buffer|Buffer[]} styleImageBuffers - одно изображение или массив до 5 изображений
 */
async function generateRealisticRender(styleImageBuffers, description, angleModifier = '') {
  try {
    // Нормализуем: если передан один буфер, оборачиваем в массив
    const imageBuffers = Array.isArray(styleImageBuffers) ? styleImageBuffers : [styleImageBuffers];

    // Используем продвинутую модель для лучшего качества
    const model = genAI.getGenerativeModel({
      model: 'gemini-3-pro-image-preview',
      generationConfig: {
        responseModalities: ['IMAGE'],
        imageConfig: {
          aspectRatio: '16:9',
          imageSize: '4K'
        }
      }
    });

    // Конвертируем все изображения в формат для Gemini
    const imageParts = imageBuffers.map((buf, i) => ({
      inlineData: {
        data: imageToBase64(buf),
        mimeType: 'image/jpeg'
      }
    }));

    // Добавляем модификатор угла обзора в промпт
    const angleInstruction = angleModifier ? `\n\nCAMERA ANGLE MODIFICATION: ${angleModifier}` : '';

    // Инструкция по множественным фото
    const multiImageInstruction = imageBuffers.length > 1
      ? `\n\nYou are provided with ${imageBuffers.length} reference images of the SAME project from different angles/details.
Analyze ALL images together to understand the full picture:
- Combine information from all angles to get accurate geometry, proportions, and details.
- Use each photo to cross-reference and verify architectural elements.
- If one photo shows a detail more clearly, prioritize that detail from that photo.
- The result should be a SINGLE coherent visualization that incorporates details from ALL provided images.`
      : '';

    // Правило 2 меняется в зависимости от наличия angleModifier
    const rule2 = angleModifier
      ? `2. CHANGE THE CAMERA ANGLE as instructed below.
   - This image is a PREVIOUSLY RENDERED building. Show the EXACT SAME building from the new angle.
   - Keep ALL architectural details, materials, colors, proportions, floor count IDENTICAL.
   - Only the camera position changes — the building itself must NOT change.`
      : `2. DO NOT invent viewpoints.
   - Use ONLY the camera angle provided by the input image.`;

    // Профессиональный промпт для архитектурной визуализации (ArchViz Pro)
    const prompt = `
You are a professional architectural visualization assistant (ArchViz Pro).

Your role:
- Transform this unfinished architectural image into a realistic, real-life visualization.
- Work as an architect, architectural visualizer, and interior/exterior realism specialist.

PROJECT DESCRIPTION:
${description}${angleInstruction}${multiImageInstruction}

Core rules (VERY IMPORTANT):
1. DO NOT change geometry.
   - Walls, openings, proportions, ceiling height, floor plan, windows, doors, volumes MUST remain exactly as in the source image.
   - No creative remodeling, no added elements that are not logically implied.

${rule2}

3. Prioritize architectural realism over artistic fantasy.
   - Materials must be physically plausible.
   - Lighting must follow real-world physics (sun direction, shadows, reflections).
   - No "cinematic" exaggeration.

4. Treat the input image as a construction-stage reference.
   - Replace placeholders with real-world materials.
   - Convert gray/white materials into realistic finishes (concrete, plaster, wood, metal, glass).
   - Maintain construction logic.

5. Respect architectural logic:
   - Structural elements stay structural.
   - Finishes stay finishes.
   - No decorative elements that would be unrealistic in real life.

6. When unsure:
   - Choose the most standard, market-acceptable architectural solution.
   - Prefer minimalism and realism over bold design.

Visualization standards:
- Photorealistic lighting
- Correct scale of objects
- Realistic textures (no plastic look)
- Natural shadows and ambient occlusion
- Realistic reflections (glass, metal, polished surfaces)

Interior-specific rules:
- Furniture scale must match human proportions.
- Lighting sources must be visible or logically implied.
- No floating objects.
- No distorted perspectives.

Exterior-specific rules:
- Correct sky lighting
- Realistic environment context
- No exaggerated greenery
- Realistic weather and sun angle

Output: Produce a realistic visualization that looks like a real photo of a finished building/interior.

IMPORTANT: Generate ONLY the image, NO TEXT in the response.
`;

    const result = await model.generateContent([prompt, ...imageParts]);
    const response = await result.response;

    // Логируем полный ответ для отладки
    console.log('Gemini promptFeedback:', JSON.stringify(response.promptFeedback));
    console.log('Gemini response candidates:', JSON.stringify(response.candidates?.map(c => ({
      finishReason: c.finishReason,
      hasParts: !!(c.content && c.content.parts),
      partsCount: c.content?.parts?.length,
      partTypes: c.content?.parts?.map(p => p.inlineData ? p.inlineData.mimeType : (p.text ? 'text' : 'unknown'))
    }))));

    // Проверяем наличие изображения в ответе
    if (response.candidates && response.candidates[0] && response.candidates[0].content) {
      const parts = response.candidates[0].content.parts || [];

      for (const part of parts) {
        if (part.inlineData && part.inlineData.mimeType && part.inlineData.mimeType.startsWith('image/')) {
          return {
            success: true,
            imageData: part.inlineData.data,
            mimeType: part.inlineData.mimeType
          };
        }
      }
    }

    // Если blocked
    const blockReason = response.candidates?.[0]?.finishReason;
    console.log('Gemini no image, finishReason:', blockReason);

    return {
      success: false,
      error: `Не удалось сгенерировать изображение (причина: ${blockReason || 'нет данных'})`
    };

  } catch (error) {
    console.error('Ошибка генерации изображения:', error.message);
    console.error('Full error:', JSON.stringify(error.response?.data || error.errorDetails || error.status));
    return {
      success: false,
      error: error.message
    };
  }
}

/**
 * Анализирует ТЗ с помощью Gemini (текстовый анализ)
 */
async function analyzeTaskWithAI(taskText) {
  try {
    const model = genAI.getGenerativeModel({ model: 'gemini-2.5-flash' });

    const prompt = `
Ты — профессиональный архитектор-консультант. Проанализируй техническое задание и создай структурированный ответ.

Техническое задание:
${taskText}

Создай красиво отформатированный анализ с использованием символов рамок и структуры:

╔═══════════════════════════════
║ 📋 АНАЛИЗ ТЕХНИЧЕСКОГО ЗАДАНИЯ
╚═══════════════════════════════

┌─ ОСНОВНЫЕ ПАРАМЕТРЫ
│
├─ Тип проекта: [определи тип]
├─ Масштаб: [малый/средний/крупный]
├─ Площадь: [извлеки если указано]
└─ Сложность: [оцени]

┌─ КЛЮЧЕВЫЕ ТРЕБОВАНИЯ
│
[извлеки ключевые требования]

┌─ ПЛАН ДЕЙСТВИЙ
│
[создай пошаговый план из 4-5 этапов]

┌─ РЕКОМЕНДАЦИИ
│
[дай профессиональные рекомендации]

═══════════════════════════════════

Будь конкретным и профессиональным.
`;

    const result = await model.generateContent(prompt);
    const response = await result.response;
    return response.text();

  } catch (error) {
    console.error('Ошибка анализа с AI:', error);
    // Возвращаем простой анализ если AI недоступен
    return simpleAnalyze(taskText);
  }
}

/**
 * Простой анализ без AI (fallback)
 */
function simpleAnalyze(taskText) {
  const text = taskText.toLowerCase();

  let projectType = 'Общий архитектурный проект';
  if (text.includes('дом') || text.includes('жилой')) {
    projectType = 'Жилой дом';
  } else if (text.includes('офис') || text.includes('коммерческ')) {
    projectType = 'Коммерческое здание';
  } else if (text.includes('интерьер')) {
    projectType = 'Дизайн интерьера';
  }

  const areaMatch = taskText.match(/(\d+)\s*(м2|кв\.?\s*м|квадратн)/i);
  const area = areaMatch ? `${areaMatch[1]} м²` : 'не указана';

  return `
╔═══════════════════════════════
║ 📋 АНАЛИЗ ТЕХНИЧЕСКОГО ЗАДАНИЯ
╚═══════════════════════════════

┌─ ОСНОВНЫЕ ПАРАМЕТРЫ
│
├─ Тип проекта: ${projectType}
├─ Площадь: ${area}
└─ Статус: Требуется детализация

┌─ РЕКОМЕНДАЦИИ
│
├─ Уточните площадь и бюджет
├─ Определите сроки реализации
└─ Подготовьте референсы

═══════════════════════════════════
`;
}

/**
 * Возвращает пример анализа
 */
function getExampleAnalysis() {
  return `
╔═══════════════════════════════
║ 📐 КАК РАБОТАЕТ БОТ
╚═══════════════════════════════

🎨 ГЕНЕРАЦИЯ ФОТОРЕАЛИСТИЧНЫХ РЕНДЕРОВ

Простой процесс:

1️⃣ Отправьте изображение (стиль/материалы)
2️⃣ Напишите описание с указанием ракурса
3️⃣ Получите фотореалистичный рендер!

📷 ПРИМЕР:
Загрузите: Фото дома в современном стиле
Напишите: "Жилой дом, минимализм, стекло и бетон. Вид спереди, слегка сбоку"
Получите: Профессиональный фотореалистичный рендер!

✨ ИНТЕРАКТИВНОСТЬ:
• Понравилось? → Другой ракурс автоматически
• Не понравилось? → Загрузите другой стиль

💡 ВОЗМОЖНОСТИ:
• Высокое качество (2K)
• Реалистичные материалы
• Профессиональное освещение
• Широкий кадр (весь объект виден)

═══════════════════════════════════

💡 Попробуйте прямо сейчас!
`;
}

/**
 * Возвращает справку
 */
function getHelpMessage() {
  return `
╔═══════════════════════════════
║ ℹ️ ПОМОЩЬ
╚═══════════════════════════════

🤖 Architect Assistant Bot
Powered by Gemini AI (Nano Banana)

┌─ КАК ИСПОЛЬЗОВАТЬ
│
1. Отправьте изображение (стиль/материалы)
2. Напишите описание с указанием ракурса
3. Получите фотореалистичный рендер!
4. Оцените результат:
   • 👍 Понравилось → Другой ракурс
   • 👎 Не понравилось → Другой стиль

┌─ ПРИМЕРЫ ОПИСАНИЙ
│
├─ "Современный дом, минимализм, стекло и бетон. Вид спереди"
├─ "Офисное здание с панорамными окнами. Вид сбоку"
├─ "Уютный интерьер в скандинавском стиле. Общий план"
├─ "Загородная вилла с бассейном. Вид с высоты птичьего полета"
└─ "Торговый центр в современном стиле. Угловой вид"

┌─ ВОЗМОЖНОСТИ
│
├─ ✨ Фотореалистичные рендеры (2K)
├─ 🎨 Реалистичные материалы и текстуры
├─ 💡 Профессиональное освещение
├─ 📐 Смена ракурсов на лету
└─ 🔄 Быстрая замена стиля

═══════════════════════════════════

Создан с использованием Gemini AI
`;
}

// ========================================
// ОБРАБОТЧИКИ КОМАНД
// ========================================

/**
 * Команда /start
 */
bot.onText(/\/start/, (msg) => {
  const chatId = msg.chat.id;
  const userName = msg.from.first_name || 'пользователь';

  // Сбрасываем сессию пользователя
  userSessions[chatId] = {};

  const welcomeMessage = `
Привет, ${userName}! 👋

Я — <b>Architect Assistant Bot</b>, создаю фотореалистичные рендеры на базе <b>Gemini AI</b>!

🎨 <b>Как работает:</b>
1️⃣ Отправьте изображение (пример стиля/материалов)
2️⃣ Напишите описание с указанием желаемого ракурса
3️⃣ Получите профессиональный рендер!
4️⃣ Нравится? → Создам другой ракурс
5️⃣ Не нравится? → Применю другой стиль

✨ <b>Особенности:</b>
• Фотореалистичное качество (2K)
• Быстрая смена ракурсов
• Простая замена стиля

Начнём работу! 🏗️
`;

  bot.sendMessage(chatId, welcomeMessage, {
    parse_mode: 'HTML',
    reply_markup: getMainMenuKeyboard()
  });
});

/**
 * Обработка кнопки "Новое ТЗ"
 */
bot.onText(/📝 Новое ТЗ/, (msg) => {
  const chatId = msg.chat.id;
  userSessions[chatId] = {};

  bot.sendMessage(chatId,
    '📝 <b>Создание рендера</b>\n\n' +
    '1️⃣ Отправьте изображение (стиль/материалы)\n' +
    '2️⃣ Напишите описание с указанием ракурса\n' +
    '3️⃣ Получите фотореалистичный рендер!\n\n' +
    '💡 Начните с отправки изображения',
    { parse_mode: 'HTML' }
  );
});

/**
 * Обработка кнопки "Пример анализа"
 */
bot.onText(/📐 Пример анализа/, (msg) => {
  const chatId = msg.chat.id;
  bot.sendMessage(chatId, getExampleAnalysis(), {
    parse_mode: 'HTML',
    reply_markup: getMainMenuKeyboard()
  });
});

/**
 * Обработка кнопки "Veo 3 Видео"
 */
bot.onText(/🎬 Veo 3 Видео/, (msg) => {
  const chatId = msg.chat.id;
  userSessions[chatId] = { mode: 'veo3', step: 'waiting_photo' };

  bot.sendMessage(chatId,
    '🎬 <b>Генерация видео (Veo 3.1)</b>\n\n' +
    '1️⃣ Отправьте фото которое хотите анимировать\n' +
    '2️⃣ Напишите промпт (описание анимации)\n' +
    '3️⃣ Получите 8-секундное видео!\n\n' +
    '⏳ Генерация занимает 1-3 минуты\n\n' +
    '📷 Отправьте фото:',
    { parse_mode: 'HTML', reply_markup: getMainMenuKeyboard() }
  );
});

/**
 * Обработка кнопки "Помощь"
 */
bot.onText(/ℹ️ Помощь/, (msg) => {
  const chatId = msg.chat.id;
  bot.sendMessage(chatId, getHelpMessage(), {
    parse_mode: 'HTML',
    reply_markup: getMainMenuKeyboard()
  });
});

// ========================================
// ОБРАБОТЧИКИ СООБЩЕНИЙ
// ========================================

/**
 * Показать кнопку "Готово" с счётчиком фото
 */
function showPhotosReadyButton(chatId, count) {
  bot.sendMessage(chatId,
    `📷 <b>${count}/5 фото получено</b>\n\n` +
    `Отправьте ещё фото (до ${5 - count}) или нажмите кнопку ниже:`,
    {
      parse_mode: 'HTML',
      reply_markup: JSON.stringify({
        inline_keyboard: [
          [{ text: `✅ Готово — создать рендер (${count} фото)`, callback_data: 'photos_done' }]
        ]
      })
    }
  );
}

/**
 * Переход к описанию после сбора фото
 */
function proceedToDescription(chatId) {
  const session = userSessions[chatId];
  if (!session || !session.photoFileIds || session.photoFileIds.length === 0) return;

  session.waitingForDescription = true;
  const count = session.photoFileIds.length;

  bot.sendMessage(chatId,
    `✅ <b>${count} фото получено!</b>\n\n` +
    '📝 Теперь отправьте описание проекта с указанием желаемого ракурса:\n\n' +
    '• Тип объекта\n' +
    '• Стиль\n' +
    '• Желаемый ракурс камеры\n\n' +
    'Например: "Современный жилой дом в стиле минимализм с большими окнами. Вид спереди, слегка сбоку"',
    { parse_mode: 'HTML', reply_markup: getMainMenuKeyboard() }
  );
}

/**
 * Обработка изображений (фото) — поддержка до 5 фотографий
 */
bot.on('photo', async (msg) => {
  const chatId = msg.chat.id;

  try {
    // Получаем самое большое изображение
    const photo = msg.photo[msg.photo.length - 1];

    // Инициализируем сессию если её нет
    if (!userSessions[chatId]) {
      userSessions[chatId] = {};
    }

    const session = userSessions[chatId];

    // Режим Veo 3 — получаем фото для анимации
    if (session.mode === 'veo3' && session.step === 'waiting_photo') {
      session.veoPhotoFileId = photo.file_id;
      session.step = 'waiting_prompt';

      bot.sendMessage(chatId,
        '✅ Фото получено!\n\n' +
        '📝 Теперь напишите промпт — опишите какую анимацию хотите:\n\n' +
        '💡 Примеры:\n' +
        '• "Камера плавно облетает объект, кинематографичный свет"\n' +
        '• "Золотые частицы собираются в форму, 3D вращение"\n' +
        '• "Плавный зум с эффектом свечения и частицами"',
        { reply_markup: getMainMenuKeyboard() }
      );
      return;
    }

    // Режим смены стиля (после негативной оценки)
    if (session.reuseMode === 'change_style') {
      session.photoFileIds = [photo.file_id];
      session.waitingForDescription = true;
      delete session.reuseMode;

      const useOldDescription = session.lastDescription ? '\n\n💬 Хотите использовать прежнее описание или написать новое?' : '';
      bot.sendMessage(chatId,
        '✅ Новый стиль получен!\n\n' +
        '📝 Отправьте описание проекта с указанием ракурса (или введите "+" чтобы использовать прежнее):' + useOldDescription,
        { reply_markup: getMainMenuKeyboard() }
      );
      return;
    }

    // === Сбор множественных фото ===

    // Если это первое фото — инициализируем массив
    if (!session.photoFileIds || session.waitingForDescription || session.lastDescription) {
      // Начинаем новый сбор фото
      userSessions[chatId] = {
        photoFileIds: [],
        collectingPhotos: true
      };
    }

    const currentSession = userSessions[chatId];
    currentSession.photoFileIds = currentSession.photoFileIds || [];
    currentSession.collectingPhotos = true;

    // Добавляем фото в массив
    currentSession.photoFileIds.push(photo.file_id);
    const count = currentSession.photoFileIds.length;

    // Если достигли 5 фото — автоматически переходим к описанию
    if (count >= 5) {
      currentSession.collectingPhotos = false;
      // Отменяем таймер если был
      if (photoCollectors[chatId]) {
        clearTimeout(photoCollectors[chatId].timer);
        delete photoCollectors[chatId];
      }
      proceedToDescription(chatId);
      return;
    }

    // Таймер для группировки медиа-групп (1.5 сек)
    // Сбрасываем таймер при каждом новом фото
    if (photoCollectors[chatId]) {
      clearTimeout(photoCollectors[chatId].timer);
    }

    photoCollectors[chatId] = {
      timer: setTimeout(() => {
        // После 1.5 сек без новых фото — показываем кнопку "Готово"
        const sess = userSessions[chatId];
        if (sess && sess.collectingPhotos && sess.photoFileIds) {
          showPhotosReadyButton(chatId, sess.photoFileIds.length);
        }
        delete photoCollectors[chatId];
      }, 1500)
    };

  } catch (error) {
    console.error('Ошибка обработки фото:', error);
    bot.sendMessage(chatId,
      '❌ Ошибка обработки изображения. Попробуйте ещё раз.',
      { reply_markup: getMainMenuKeyboard() }
    );
  }
});

/**
 * Обработка текстовых сообщений
 */
bot.on('message', async (msg) => {
  const chatId = msg.chat.id;
  const text = msg.text;

  // Игнорируем команды, кнопки меню и сообщения без текста
  if (!text || text.startsWith('/') || text.includes('📝') ||
      text.includes('📐') || text.includes('ℹ️') || text.includes('🎬') || msg.photo) {
    return;
  }

  const session = userSessions[chatId] || {};

  // Veo 3 — получаем промпт и генерируем видео
  if (session.mode === 'veo3' && session.step === 'waiting_prompt' && session.veoPhotoFileId) {
    try {
      session.step = 'generating';
      const statusMsg = await bot.sendMessage(chatId,
        '🎬 Запускаю генерацию видео через Veo 3.1...\n⏳ Это займёт 1-3 минуты, подождите'
      );

      // Скачиваем фото
      const imageBuffer = await downloadImage(session.veoPhotoFileId);

      // Генерируем видео
      const result = await generateVideo(imageBuffer, text, (event, data) => {
        if (event === 'waiting' && data % 3 === 0) {
          bot.editMessageText(
            `🎬 Генерирую видео... (~${data * 10} сек)\n⏳ Пожалуйста, подождите`,
            { chat_id: chatId, message_id: statusMsg.message_id }
          ).catch(() => {});
        }
      });

      if (result.success) {
        await bot.sendVideo(chatId, result.videoBuffer, {
          caption: '✅ Видео готово! (Veo 3.1)',
          reply_markup: JSON.stringify({
            inline_keyboard: [
              [
                { text: '🔄 Другой промпт', callback_data: 'veo_retry' },
                { text: '🆕 Новое фото', callback_data: 'veo_new' }
              ]
            ]
          })
        }, {
          filename: 'veo3_video.mp4',
          contentType: 'video/mp4'
        });

        // Сохраняем для повторной генерации
        session.step = 'done';
        session.lastVeoPrompt = text;
      } else {
        bot.sendMessage(chatId,
          `❌ Ошибка генерации видео:\n${result.error}\n\nПопробуйте другой промпт или фото.`,
          { reply_markup: getMainMenuKeyboard() }
        );
        session.step = 'waiting_prompt';
      }
    } catch (error) {
      console.error('Ошибка Veo 3:', error.response?.data || error.message);
      bot.sendMessage(chatId,
        '❌ Ошибка при генерации видео. Попробуйте ещё раз.',
        { reply_markup: getMainMenuKeyboard() }
      );
      session.step = 'waiting_prompt';
    }
    return;
  }

  // Если пользователь отправил изображение и ждём описание
  if (session.waitingForDescription && session.photoFileIds && session.photoFileIds.length > 0) {
    try {
      // Если пользователь ввёл "+" - используем старое описание
      let description = text;
      if (text.trim() === '+' && session.lastDescription) {
        description = session.lastDescription;
        bot.sendMessage(chatId, `💬 Использую прежнее описание:\n"${description}"`);
      }

      const photoCount = session.photoFileIds.length;
      bot.sendMessage(chatId, `✨ Создаю фотореалистичный рендер из ${photoCount} фото с помощью Nano Banana...\n⏳ Это может занять 10-30 секунд`);

      // Скачиваем ВСЕ изображения
      const imageBuffers = await Promise.all(
        session.photoFileIds.map(fileId => downloadImage(fileId))
      );

      // Генерируем фотореалистичный рендер (передаём массив буферов)
      const result = await generateRealisticRender(imageBuffers, description);

      if (result.success) {
        // Отправляем сгенерированное изображение как документ (файл) для сохранения качества
        const generatedImageBuffer = Buffer.from(result.imageData, 'base64');

        // Сохраняем данные для повторного использования (включая готовый рендер!)
        userSessions[chatId] = {
          lastPhotoFileIds: session.photoFileIds,
          lastDescription: description,
          lastRenderBase64: result.imageData  // Сохраняем готовый рендер для смены ракурса
        };

        await bot.sendDocument(chatId, generatedImageBuffer, {
          caption: '✅ Рендер готов!\n\nВам нравится результат?',
          reply_markup: JSON.stringify({
            inline_keyboard: [
              [
                { text: '📐 Другой ракурс', callback_data: 'change_angle' },
                { text: '🔄 Перегенерировать', callback_data: 'regenerate' }
              ],
              [
                { text: '🆕 Новый рендер', callback_data: 'new_render' }
              ]
            ]
          })
        }, {
          filename: 'render.png',
          contentType: 'image/png'
        });
      } else {
        bot.sendMessage(chatId,
          `❌ Ошибка генерации изображения:\n${result.error}\n\nПопробуйте ещё раз или отправьте другое изображение.`,
          { reply_markup: getMainMenuKeyboard() }
        );
      }

    } catch (error) {
      console.error('Ошибка создания рендера:', error);
      bot.sendMessage(chatId,
        '❌ Произошла ошибка при создании рендера. Попробуйте ещё раз.',
        { reply_markup: getMainMenuKeyboard() }
      );
      delete userSessions[chatId];
    }
    return;
  }

  // Если текст без изображения - напоминаем отправить фото
  if (!session.photoFileIds || session.photoFileIds.length === 0) {
    bot.sendMessage(chatId,
      '📷 Пожалуйста, сначала отправьте изображение для создания рендера.',
      { reply_markup: getMainMenuKeyboard() }
    );
  }
});

/**
 * Обработка документов
 */
bot.on('document', (msg) => {
  const chatId = msg.chat.id;
  bot.sendMessage(chatId,
    '📄 Документ получен!\n\n' +
    'ℹ️ Пока бот работает только с изображениями и текстом.\n' +
    'Отправьте изображение (3D план) для создания рендера.',
    { reply_markup: getMainMenuKeyboard() }
  );
});

// ========================================
// ОБРАБОТЧИКИ CALLBACK ЗАПРОСОВ
// ========================================

/**
 * Обработка нажатий на inline кнопки
 */
bot.on('callback_query', async (callbackQuery) => {
  const chatId = callbackQuery.message.chat.id;
  const data = callbackQuery.data;
  const session = userSessions[chatId];

  // Отвечаем на callback чтобы убрать "часики"
  await bot.answerCallbackQuery(callbackQuery.id);

  if (data === 'photos_done') {
    // Кнопка "Готово" — переходим к описанию
    if (session && session.photoFileIds && session.photoFileIds.length > 0) {
      session.collectingPhotos = false;
      // Отменяем таймер если был
      if (photoCollectors[chatId]) {
        clearTimeout(photoCollectors[chatId].timer);
        delete photoCollectors[chatId];
      }
      proceedToDescription(chatId);
    } else {
      bot.sendMessage(chatId, '❌ Нет фотографий. Отправьте хотя бы одно фото.', {
        reply_markup: getMainMenuKeyboard()
      });
    }
  } else if (data === 'change_angle') {
    // Показываем меню выбора ракурса
    if (session && session.lastPhotoFileIds && session.lastDescription) {
      bot.sendMessage(chatId, '📐 Выберите ракурс для нового рендера:', {
        reply_markup: JSON.stringify({
          inline_keyboard: [
            [
              { text: '🏠 Фасад (спереди)', callback_data: 'angle_front' },
              { text: '🏗️ Угловой 3/4', callback_data: 'angle_corner' }
            ],
            [
              { text: '◀️ Вид слева', callback_data: 'angle_left' },
              { text: '▶️ Вид справа', callback_data: 'angle_right' }
            ],
            [
              { text: '🔙 Вид сзади', callback_data: 'angle_back' },
              { text: '🦅 Аэросъёмка', callback_data: 'angle_aerial' }
            ],
            [
              { text: '❌ Отмена', callback_data: 'new_render' }
            ]
          ]
        })
      });
    } else {
      bot.sendMessage(chatId, '❌ Сессия истекла. Начните заново.', {
        reply_markup: getMainMenuKeyboard()
      });
    }
  } else if (data.startsWith('angle_')) {
    // Генерируем с выбранным ракурсом из ИСХОДНОГО ПЛАНА
    if (session && session.lastPhotoFileIds && session.lastDescription) {
      const angleMap = {
        'angle_front': 'CAMERA: Front facade view, straight-on, eye-level, main entrance visible.',
        'angle_corner': 'CAMERA: Corner 3/4 view, 45-degree angle showing two sides, dramatic perspective.',
        'angle_left': 'CAMERA: Left side elevation, perpendicular view of left facade.',
        'angle_right': 'CAMERA: Right side elevation, perpendicular view of right facade.',
        'angle_back': 'CAMERA: Rear/back view, showing backyard and back facade.',
        'angle_aerial': 'CAMERA: Aerial drone shot from above at 45-degree angle, showing roof and surroundings.'
      };

      const angleModifier = angleMap[data];

      const angleName = {
        'angle_front': 'фасад спереди',
        'angle_corner': 'угловой 3/4',
        'angle_left': 'вид слева',
        'angle_right': 'вид справа',
        'angle_back': 'вид сзади',
        'angle_aerial': 'аэросъёмка'
      }[data];

      bot.sendMessage(chatId, `📐 Генерирую ракурс: ${angleName}...\n⏳ Подождите 10-30 секунд`);

      try {
        // Используем ПРЕДЫДУЩИЙ РЕНДЕР (если есть) для сохранения стиля здания
        let imageBuffer;
        if (session.lastRenderBase64) {
          imageBuffer = Buffer.from(session.lastRenderBase64, 'base64');
        } else {
          const buffers = await Promise.all(
            session.lastPhotoFileIds.map(fileId => downloadImage(fileId))
          );
          imageBuffer = buffers;
        }

        const result = await generateRealisticRender(
          imageBuffer,
          session.lastDescription,
          angleModifier
        );

        if (result.success) {
          const generatedImageBuffer = Buffer.from(result.imageData, 'base64');
          userSessions[chatId].lastRenderBase64 = result.imageData;

          await bot.sendDocument(chatId, generatedImageBuffer, {
            caption: `✅ Рендер (${angleName}) готов!`,
            reply_markup: JSON.stringify({
              inline_keyboard: [
                [
                  { text: '📐 Другой ракурс', callback_data: 'change_angle' },
                  { text: '🔄 Перегенерировать', callback_data: 'regenerate' }
                ],
                [
                  { text: '🆕 Новый рендер', callback_data: 'new_render' }
                ]
              ]
            })
          }, {
            filename: `render_${data}.png`,
            contentType: 'image/png'
          });
        } else {
          bot.sendMessage(chatId, `❌ Ошибка: ${result.error}`, {
            reply_markup: getMainMenuKeyboard()
          });
        }
      } catch (error) {
        console.error('Ошибка генерации ракурса:', error);
        bot.sendMessage(chatId, '❌ Произошла ошибка.', {
          reply_markup: getMainMenuKeyboard()
        });
      }
    } else {
      bot.sendMessage(chatId, '❌ Сессия истекла.', {
        reply_markup: getMainMenuKeyboard()
      });
    }
  } else if (data === 'regenerate') {
    // Перегенерируем с исходных фото
    if (session && session.lastPhotoFileIds && session.lastDescription) {
      bot.sendMessage(chatId, '🔄 Перегенерирую рендер...\n⏳ Подождите 10-30 секунд');

      try {
        const imageBuffers = await Promise.all(
          session.lastPhotoFileIds.map(fileId => downloadImage(fileId))
        );
        const result = await generateRealisticRender(imageBuffers, session.lastDescription);

        if (result.success) {
          const generatedImageBuffer = Buffer.from(result.imageData, 'base64');
          userSessions[chatId].lastRenderBase64 = result.imageData;

          await bot.sendDocument(chatId, generatedImageBuffer, {
            caption: '✅ Новый рендер готов!',
            reply_markup: JSON.stringify({
              inline_keyboard: [
                [
                  { text: '📐 Другой ракурс', callback_data: 'change_angle' },
                  { text: '🔄 Перегенерировать', callback_data: 'regenerate' }
                ],
                [
                  { text: '🆕 Новый рендер', callback_data: 'new_render' }
                ]
              ]
            })
          }, {
            filename: 'render.png',
            contentType: 'image/png'
          });
        } else {
          bot.sendMessage(chatId, `❌ Ошибка: ${result.error}`, {
            reply_markup: getMainMenuKeyboard()
          });
        }
      } catch (error) {
        console.error('Ошибка перегенерации:', error);
        bot.sendMessage(chatId, '❌ Произошла ошибка.', {
          reply_markup: getMainMenuKeyboard()
        });
      }
    } else {
      bot.sendMessage(chatId, '❌ Сессия истекла.', {
        reply_markup: getMainMenuKeyboard()
      });
    }
  } else if (data === 'veo_retry') {
    // Повторная генерация с другим промптом, то же фото
    if (session && session.veoPhotoFileId) {
      session.step = 'waiting_prompt';
      bot.sendMessage(chatId, '📝 Напишите новый промпт для анимации:', { reply_markup: getMainMenuKeyboard() });
    } else {
      bot.sendMessage(chatId, '❌ Сессия истекла.', { reply_markup: getMainMenuKeyboard() });
    }
  } else if (data === 'veo_new') {
    // Новое фото для Veo
    userSessions[chatId] = { mode: 'veo3', step: 'waiting_photo' };
    bot.sendMessage(chatId, '📷 Отправьте новое фото для анимации:', { reply_markup: getMainMenuKeyboard() });
  } else if (data === 'new_render') {
    // Начинаем полностью заново
    userSessions[chatId] = {};
    bot.sendMessage(chatId,
      '🆕 <b>Создание нового рендера</b>\n\n' +
      '1️⃣ Отправьте изображение (стиль/материалы)\n' +
      '2️⃣ Напишите описание проекта с указанием ракурса\n' +
      '3️⃣ Получите фотореалистичный рендер!',
      { parse_mode: 'HTML' }
    );
  }
});

// ========================================
// ОБРАБОТКА ОШИБОК
// ========================================

bot.on('polling_error', (error) => {
  console.error('Polling error:', error.code, error.message);
});

process.on('uncaughtException', (error) => {
  console.error('Uncaught Exception:', error);
});

process.on('unhandledRejection', (error) => {
  console.error('Unhandled Rejection:', error);
});

// ========================================
// ЗАПУСК БОТА
// ========================================

console.log('[BOT] Architect Assistant Bot started!');
console.log('[BOT] Powered by Gemini AI (Nano Banana)');
console.log('[BOT] Mode: polling');
console.log('[BOT] Waiting for messages...');
