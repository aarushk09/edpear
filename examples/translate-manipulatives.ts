/**
 * Example: translateManipulatives
 *
 * Analyzes physical educational manipulative blocks or arrangements on a desk
 * (base-10 blocks, fraction tiles, pattern blocks, etc.) and returns a
 * structured digital state for syncing with a digital application.
 *
 * CLI usage:
 *   edpear manipulatives ./blocks-photo.jpg
 */

import { createEdPearClient } from '@edpear/sdk';
import fs from 'fs';

const client = createEdPearClient(process.env.EDPEAR_API_KEY!);
const imageBase64 = 'data:image/jpeg;base64,' + fs.readFileSync('./blocks-photo.jpg').toString('base64');

client.translateManipulatives(imageBase64).then(result => {
  console.log(`🧱 Blocks found: ${result.blocks.length}`);
  console.log(`📐 Arrangement: ${result.arrangement}`);
  console.log(`💡 Interpretation: ${result.interpretation}`);
  if (result.totalValue !== undefined) {
    console.log(`🔢 Total Value: ${result.totalValue}`);
  }

  console.log('\n📋 Block Details:');
  result.blocks.forEach(block => {
    console.log(`  [${block.id}] ${block.type} (value: ${block.value}) at ${block.position}`);
  });

  console.log('\n💻 Digital State:');
  console.log(JSON.stringify(result.digitalState, null, 2));
});
