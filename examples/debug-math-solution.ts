/**
 * Example: debugMathSolution
 *
 * Analyzes a photo of handwritten multi-step math and pinpoints the exact
 * line where an error was made, returning the corrected formula and hints.
 *
 * CLI usage:
 *   edpear math-debug ./photo.jpg
 *
 * SDK usage (shown below):
 */

import { createEdPearClient } from '@edpear/sdk';
import fs from 'fs';

const client = createEdPearClient(process.env.EDPEAR_API_KEY!);

const imageBase64 = 'data:image/jpeg;base64,' + fs.readFileSync('./math-photo.jpg').toString('base64');

client.debugMathSolution(imageBase64).then(result => {
  if (result.errorAtLine === 0) {
    console.log('✅ No errors found in the solution!');
  } else {
    console.log(`❌ Error at line ${result.errorAtLine}: ${result.incorrectStep}`);
    console.log(`✔️  Correct: ${result.correctFormula}`);
    console.log(`💡 Explanation: ${result.explanation}`);
    console.log('Hints:', result.hints);
  }
});
