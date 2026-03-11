/**
 * Example: gradeVisualRubric
 *
 * Grades a creative or technical drawing against an array of rubric
 * constraint strings. Each constraint is scored 0–2.
 *
 * CLI usage:
 *   edpear grade-rubric ./drawing.jpg "has a clear vanishing point" "uses hatching for shading" "correct proportions"
 */

import { createEdPearClient } from '@edpear/sdk';
import fs from 'fs';

const client = createEdPearClient(process.env.EDPEAR_API_KEY!);
const imageBase64 = 'data:image/jpeg;base64,' + fs.readFileSync('./drawing.jpg').toString('base64');

const rubric = [
  'has a clear vanishing point',
  'uses hatching for shading',
  'objects maintain correct relative proportions',
  'line weight varies to show depth',
];

client.gradeVisualRubric(imageBase64, rubric).then(result => {
  console.log(`\n📊 Score: ${result.totalScore}/${result.maxScore} (${result.percentage.toFixed(0)}%) — ${result.grade}\n`);

  result.breakdown.forEach(item => {
    const icon = item.passed ? '✅' : item.score > 0 ? '🟡' : '❌';
    console.log(`${icon} [${item.score}/${item.maxScore}] ${item.constraint}`);
    console.log(`   ${item.feedback}`);
  });

  console.log('\n📝 Overall:', result.overallFeedback);
});
