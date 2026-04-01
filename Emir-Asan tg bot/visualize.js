const { GoogleGenerativeAI } = require('@google/generative-ai');
const fs = require('fs');
const path = require('path');

const GEMINI_API_KEY = 'AIzaSyBOljPaf90H6_NouVkJAspADV18L6VazVc';
const INPUT_IMAGE = 'D:\\screenshot.png';
const OUTPUT_IMAGE = path.join(__dirname, 'result.png');

async function visualize() {
  const genAI = new GoogleGenerativeAI(GEMINI_API_KEY);

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

  const imageBuffer = fs.readFileSync(INPUT_IMAGE);
  const imageBase64 = imageBuffer.toString('base64');
  const mimeType = 'image/png';

  const prompt = `
You are a professional architectural visualization assistant (ArchViz Pro).

Your role:
- Transform this unfinished architectural image into a realistic, real-life visualization.
- Work as an architect, architectural visualizer, and interior/exterior realism specialist.

PROJECT DESCRIPTION:
This is a 3D model of a multi-story institutional/administrative building. Create a photorealistic exterior visualization.

Core rules (VERY IMPORTANT):
1. DO NOT change geometry.
   - Walls, openings, proportions, ceiling height, floor plan, windows, doors, volumes MUST remain exactly as in the source image.
   - No creative remodeling, no added elements that are not logically implied.

2. DO NOT invent viewpoints.
   - Use ONLY the camera angle provided by the input image.

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

Exterior-specific rules:
- Correct sky lighting
- Realistic environment context
- No exaggerated greenery
- Realistic weather and sun angle

Output: Produce a realistic visualization that looks like a real photo of a finished building.

IMPORTANT: Generate ONLY the image, NO TEXT in the response.
`;

  console.log('Sending image to Gemini API...');

  const result = await model.generateContent([
    prompt,
    {
      inlineData: {
        mimeType,
        data: imageBase64
      }
    }
  ]);

  const response = await result.response;
  const candidates = response.candidates;

  if (!candidates || candidates.length === 0) {
    console.error('No candidates in response');
    console.log('promptFeedback:', JSON.stringify(response.promptFeedback));
    return;
  }

  const parts = candidates[0].content.parts;
  for (const part of parts) {
    if (part.inlineData) {
      const imgData = Buffer.from(part.inlineData.data, 'base64');
      fs.writeFileSync(OUTPUT_IMAGE, imgData);
      console.log(`Visualization saved to: ${OUTPUT_IMAGE}`);
      console.log(`Size: ${(imgData.length / 1024 / 1024).toFixed(2)} MB`);
      return;
    }
  }

  console.error('No image in response. Parts:', parts.map(p => p.text ? 'text' : 'other'));
}

visualize().catch(err => {
  console.error('Error:', err.message);
  if (err.response) console.error('Response:', JSON.stringify(err.response.data));
});
