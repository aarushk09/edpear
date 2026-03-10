/**
 * Example: verifyRealWorldConcept
 *
 * Validates whether a student's photo correctly demonstrates a specific
 * physics or geometry concept.
 *
 * CLI usage:
 *   edpear verify-concept ./angle-photo.jpg "acute angle"
 *   edpear verify-concept ./pendulum.jpg "tension"
 */

import { createEdPearClient } from '@edpear/sdk';
import fs from 'fs';

const client = createEdPearClient(process.env.EDPEAR_API_KEY!);
const imageBase64 = 'data:image/jpeg;base64,' + fs.readFileSync('./angle-photo.jpg').toString('base64');

client.verifyRealWorldConcept(imageBase64, 'acute angle').then(result => {
  const icon = result.matches ? '✅' : '❌';
  console.log(`${icon} Matches "${result.concept}": ${result.matches}`);
  console.log(`Confidence: ${(result.confidence * 100).toFixed(0)}%`);
  console.log('Explanation:', result.explanation);
  if (!result.matches && result.suggestedCorrection) {
    console.log('Suggestion:', result.suggestedCorrection);
  }
});
