/**
 * Example: generateSpatialFlashcards
 *
 * Generates image-occlusion style flashcards from any complex educational
 * diagram — cell biology diagrams, circuit schematics, geometry proofs, etc.
 *
 * CLI usage:
 *   edpear flashcards ./cell-diagram.png
 *   edpear flashcards ./circuit.jpg --output flashcards.json
 */

import { createEdPearClient } from '@edpear/sdk';
import fs from 'fs';

const client = createEdPearClient(process.env.EDPEAR_API_KEY!);
const imageBase64 = 'data:image/png;base64,' + fs.readFileSync('./cell-diagram.png').toString('base64');

client.generateSpatialFlashcards(imageBase64).then(result => {
  console.log(`📚 Diagram type: ${result.diagramType}`);
  console.log(`🃏 Generated ${result.totalCards} flashcard(s)\n`);

  result.flashcards.forEach((card, i) => {
    console.log(`--- Card ${i + 1} [${card.difficulty}] ---`);
    console.log(`Region : ${card.region}`);
    console.log(`Front  : ${card.front}`);
    console.log(`Back   : ${card.back}`);
    console.log(`Tags   : ${card.tags.join(', ')}\n`);
  });
});
