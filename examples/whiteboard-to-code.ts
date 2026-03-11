/**
 * Example: whiteboardToCode
 *
 * Translates whiteboard equations to LaTeX, or flowcharts/logic diagrams to
 * Python pseudocode (or any other target format).
 *
 * CLI usage:
 *   edpear whiteboard-to-code ./equations.jpg               # defaults to LaTeX
 *   edpear whiteboard-to-code ./flowchart.jpg --format python
 *   edpear whiteboard-to-code ./diagram.jpg --format pseudocode
 */

import { createEdPearClient } from '@edpear/sdk';
import fs from 'fs';

const client = createEdPearClient(process.env.EDPEAR_API_KEY!);
const imageBase64 = 'data:image/jpeg;base64,' + fs.readFileSync('./equations.jpg').toString('base64');

// Convert whiteboard equations to LaTeX
client.whiteboardToCode(imageBase64, 'latex').then(result => {
  console.log(`📝 Format: ${result.format}\n`);
  console.log('Output:\n', result.output);
  console.log('\nExplanation:', result.explanation);
  if (result.variables && Object.keys(result.variables).length > 0) {
    console.log('\nVariables:');
    Object.entries(result.variables).forEach(([k, v]) => console.log(`  ${k}: ${v}`));
  }
});
