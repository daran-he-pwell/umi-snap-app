#!/usr/bin/env node

/**
 * Test script for Agent workflow WITH IMAGES
 *
 * Usage: node test-agent-with-images.mjs "your question" "image1.jpg" "image2.jpg"
 * Example: node test-agent-with-images.mjs "What can I cook?" "./src/assets/real-images/inside-fridge.jpg"
 */

import { config } from 'dotenv';
import { runWorkflow } from './src/utils/Agent.ts';

config();

if (!process.env.VITE_OPENAI_API_KEY) {
  console.error('❌ Missing VITE_OPENAI_API_KEY in .env file');
  process.exit(1);
}
process.env.OPENAI_API_KEY = process.env.VITE_OPENAI_API_KEY;

const userInput = process.argv[2] || "I have these ingredients. What can I make?";
const imagePaths = process.argv.slice(3);

console.log('🤖 Testing Agent Workflow WITH IMAGES\n');
console.log(`📝 Input: "${userInput}"`);
console.log(`🖼️  Images: ${imagePaths.length ? imagePaths.join(', ') : 'None'}\n`);
console.log('⏳ Processing...\n');

const startTime = Date.now();

const result = await runWorkflow({
  input_as_text: userInput,
  images: imagePaths.length ? imagePaths : undefined
});

const duration = ((Date.now() - startTime) / 1000).toFixed(2);

console.log(`✅ Success! (${duration}s)\n`);
console.log('📊 Result:');
console.log(JSON.stringify(result, null, 2));
