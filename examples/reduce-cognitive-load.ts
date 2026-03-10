/**
 * Example: reduceCognitiveLoad
 *
 * Extracts dense textbook or whiteboard text from an image and reformats it
 * into high-contrast, bulleted, dyslexia-friendly markdown.
 *
 * CLI usage:
 *   edpear simplify ./textbook-page.jpg
 *   edpear simplify ./notes.jpg --output simplified.md
 */

import { createEdPearClient } from '@edpear/sdk';
import fs from 'fs';

const client = createEdPearClient(process.env.EDPEAR_API_KEY!);
const imageBase64 = 'data:image/jpeg;base64,' + fs.readFileSync('./textbook-page.jpg').toString('base64');

client.reduceCognitiveLoad(imageBase64).then(result => {
  console.log('📄 Accessible Markdown:\n');
  console.log(result.markdown);
  console.log('\n🔑 Key Terms:', result.keyTerms.join(', '));
  console.log('📝 Summary:', result.summary);
  console.log('📚 Reading Level:', result.readingLevel);

  // Optionally save the markdown to a file
  fs.writeFileSync('simplified.md', result.markdown);
  console.log('\n💾 Saved to simplified.md');
});
