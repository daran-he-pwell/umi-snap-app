#!/usr/bin/env node

/**
 * Test script for Agent workflow WITH IMAGES
 *
 * Usage: node test-agent-with-images.mjs "your question" "image1.jpg" "image2.jpg"
 * Example: node test-agent-with-images.mjs "What can I cook?" "./src/assets/real-images/inside-fridge.jpg"
 */

import { config } from 'dotenv';
import fs from 'fs';
config();

// Set OpenAI API key from env
if (!process.env.VITE_OPENAI_API_KEY) {
  console.error('❌ Missing VITE_OPENAI_API_KEY in .env file');
  process.exit(1);
}
process.env.OPENAI_API_KEY = process.env.VITE_OPENAI_API_KEY;

// Get user input and image paths from command line
const userInput = process.argv[2] || "I have these ingredients. What can I make?";
const imagePaths = process.argv.slice(3);

console.log('🤖 Testing Agent Workflow WITH IMAGES\n');
console.log(`📝 Input: "${userInput}"`);
console.log(`🖼️  Images: ${imagePaths.length > 0 ? imagePaths.join(', ') : 'None'}\n`);

// Convert image files to base64 if provided
const imageBase64Array = [];
if (imagePaths.length > 0) {
  for (const imagePath of imagePaths) {
    try {
      const imageBuffer = fs.readFileSync(imagePath);
      const imageBase64 = imageBuffer.toString('base64');
      const mimeType = imagePath.endsWith('.png') ? 'image/png'
                     : imagePath.endsWith('.webp') ? 'image/webp'
                     : 'image/jpeg';
      // Format as data URL
      imageBase64Array.push(`data:${mimeType};base64,${imageBase64}`);
      console.log(`✅ Loaded image: ${imagePath}`);
    } catch (err) {
      console.error(`❌ Failed to load image ${imagePath}:`, err.message);
      process.exit(1);
    }
  }
  console.log();
}

console.log('⏳ Processing...\n');

// Import and run the workflow
const { runWorkflow } = await import('./src/utils/Agent.ts');

try {
  const startTime = Date.now();

  const result = await runWorkflow({
    input_as_text: userInput,
    images: imageBase64Array.length > 0 ? imageBase64Array : undefined
  });

  const duration = ((Date.now() - startTime) / 1000).toFixed(2);

  console.log('✅ Success! (' + duration + 's)\n');
  console.log('📊 Result:');
  console.log(JSON.stringify(result, null, 2));

} catch (error) {
  console.error('❌ Error:', error.message);
  console.error('\n' + error.stack);
  process.exit(1);
}
