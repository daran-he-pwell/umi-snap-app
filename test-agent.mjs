#!/usr/bin/env node

/**
 * Simple test script for the Agent workflow
 *
 * Usage: node test-agent.mjs "your question here"
 * Example: node test-agent.mjs "I have chicken and rice. Make dinner."
 */

import { config } from 'dotenv';
config();

// Set OpenAI API key from env
if (!process.env.VITE_OPENAI_API_KEY) {
  console.error('❌ Missing VITE_OPENAI_API_KEY in .env file');
  process.exit(1);
}
process.env.OPENAI_API_KEY = process.env.VITE_OPENAI_API_KEY;

// Get user input from command line or use default
const userInput = process.argv[2] || "I have chicken, tomatoes, and garlic. I want to make something quick.";

console.log('🤖 Testing Agent Workflow\n');
console.log(`📝 Input: "${userInput}"\n`);
console.log('⏳ Processing...\n');

// Import and run the workflow
const { runWorkflow } = await import('./src/utils/Agent.ts');

try {
  const startTime = Date.now();

  const result = await runWorkflow({
    input_as_text: userInput
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
