import time
import os
import base64
from google import genai
from google.genai import types

# API ключ
client = genai.Client(api_key="AIzaSyBOljPaf90H6_NouVkJAspADV18L6VazVc")

# Загрузка картинки
with open("D:/Emir-Asan tg bot/photo_2026-03-10_19-59-09.jpg", "rb") as f:
    image_bytes = f.read()

print("Отправляю запрос на генерацию видео через Veo 3.1 (максимальное качество)...")

try:
    operation = client.models.generate_videos(
        model="veo-3.1-generate-preview",
        prompt="Cinematic animation of this black and white icon on a clean light background. IMPORTANT: Do NOT show any text, letters, words or writing at any point in the video. Only animate the circle and house icon. The animation starts with golden glowing particles swirling from darkness, converging into the center. The particles gradually form the black circle shape with the white house silhouette inside. Dramatic 3D rotation and volumetric lighting during the formation. Then by the end of the video, all golden effects and particles fade away, the background transitions to clean white, and the icon settles into its original form — a flat black circle with white house icon on a plain white background. The final frame must look identical to the original still image but without any text: just the black and white house-in-circle icon, flat design, no golden effects, clean white background. Absolutely no text, no letters, no words anywhere in the video.",
        image=types.Image(
            image_bytes=image_bytes,
            mime_type="image/jpeg",
        ),
        config=types.GenerateVideosConfig(
            aspect_ratio="16:9",
            duration_seconds="8",
            person_generation="allow_adult",
        ),
    )

    print(f"Операция запущена: {operation.name}")
    print("Ожидаю генерацию видео (может занять 1-6 минут)...")

    while not operation.done:
        time.sleep(10)
        operation = client.operations.get(operation)
        print(".", end="", flush=True)

    print("\nОперация завершена!")
    print(f"Response: {operation.response}")

    if not operation.response or not operation.response.generated_videos:
        print("Видео не было сгенерировано. Возможно модель отклонила запрос.")
        exit(1)

    video = operation.response.generated_videos[0]
    client.files.download(file=video.video)
    video.video.save("D:/Emir-Asan tg bot/animated_logo_final2.mp4")

    print("Сохранено: D:/Emir-Asan tg bot/animated_logo_final2.mp4")

except Exception as e:
    print(f"Ошибка: {e}")
    print(f"Тип: {type(e).__name__}")
