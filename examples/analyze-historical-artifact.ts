/**
 * Example: analyzeHistoricalArtifact
 *
 * Acts as an AR museum docent — identify and analyze a historical artifact,
 * artwork, or primary source document with rich contextual information.
 *
 * CLI usage:
 *   edpear artifact ./painting.jpg
 *   edpear artifact ./ancient-coin.jpg
 */

import { createEdPearClient } from '@edpear/sdk';
import fs from 'fs';

const client = createEdPearClient(process.env.EDPEAR_API_KEY!);
const imageBase64 = 'data:image/jpeg;base64,' + fs.readFileSync('./painting.jpg').toString('base64');

client.analyzeHistoricalArtifact(imageBase64).then(result => {
  console.log(`\n🏛️  ${result.title}`);
  console.log(`📅 Period : ${result.period}`);
  console.log(`🌍 Origin : ${result.origin}`);
  if (result.medium) console.log(`🎨 Medium : ${result.medium}`);

  console.log('\n🖌️  Techniques:');
  result.techniques.forEach(t => console.log(`  • ${t}`));

  console.log('\n📖 Historical Context:');
  console.log(result.historicalContext);

  console.log('\n⭐ Significance:');
  console.log(result.significance);

  if (result.primarySourceNotes) {
    console.log('\n📜 Primary Source Notes:');
    console.log(result.primarySourceNotes);
  }

  console.log('\n🔗 Related Topics:', result.relatedTopics.join(', '));
});
