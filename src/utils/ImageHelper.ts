/**
 * ImageHelper - Unified utility functions for image and base64 conversion
 * Works in both Node.js and Browser environments
 */

/**
 * Check if we're running in Node.js environment
 */
function isNodeEnvironment(): boolean {
  return typeof process !== 'undefined' &&
         process.versions != null &&
         process.versions.node != null;
}

/**
 * Convert a Blob to base64 data URL (Browser only)
 */
function blobToBase64(blob: Blob): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onloadend = () => {
      if (typeof reader.result === 'string') {
        resolve(reader.result);
      } else {
        reject(new Error('Failed to convert blob to base64'));
      }
    };
    reader.onerror = reject;
    reader.readAsDataURL(blob);
  });
}

/**
 * Convert image to base64 data URL
 * Universal function that works in both Node.js and Browser
 *
 * Supports:
 * - Data URLs (returns as-is)
 * - Remote URLs (http/https)
 * - Local file paths (Node.js only)
 * - Relative paths (Browser only)
 */
export async function imageToBase64(input: string): Promise<string> {
  // If already a data URL, return as-is
  if (input.startsWith('data:')) {
    return input;
  }

  // Node.js environment - check if it's a local file path
  if (isNodeEnvironment() && !input.startsWith('http://') && !input.startsWith('https://')) {
    const fs = await import('fs');
    const imageBuffer = fs.readFileSync(input);
    const imageBase64 = imageBuffer.toString('base64');

    // Determine MIME type from extension
    const mimeType = input.endsWith('.png') ? 'image/png'
                 : input.endsWith('.webp') ? 'image/webp'
                 : 'image/jpeg';

    return `data:${mimeType};base64,${imageBase64}`;
  }

  // Browser or remote URL - use fetch
  const response = await fetch(input);
  const blob = await response.blob();
  return blobToBase64(blob);
}

/**
 * Convert multiple images to base64 data URLs
 */
export async function imagesToBase64(inputs: string[]): Promise<string[]> {
  return Promise.all(inputs.map(input => imageToBase64(input)));
}
