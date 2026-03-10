/**
 * Example: checkLabSetup
 *
 * Verifies a photo of lab equipment or circuit wiring for safety and
 * correctness against a specified experiment type.
 *
 * CLI usage:
 *   edpear lab-check ./circuit.jpg "series circuit"
 *   edpear lab-check ./titration.jpg "acid-base titration"
 */

import { createEdPearClient } from '@edpear/sdk';
import fs from 'fs';

const client = createEdPearClient(process.env.EDPEAR_API_KEY!);
const imageBase64 = 'data:image/jpeg;base64,' + fs.readFileSync('./circuit.jpg').toString('base64');

client.checkLabSetup(imageBase64, 'series circuit').then(result => {
  console.log(`Overall Correct: ${result.overallCorrect ? '✅' : '❌'}`);
  console.log(`Risk Level: ${result.riskLevel.toUpperCase()}`);

  if (result.safetyIssues.length > 0) {
    console.log('\n⚠️  Safety Issues:');
    result.safetyIssues.forEach(issue => console.log(`  - ${issue}`));
  }
  if (result.correctnessIssues.length > 0) {
    console.log('\n🔧 Correctness Issues:');
    result.correctnessIssues.forEach(issue => console.log(`  - ${issue}`));
  }
  if (result.recommendations.length > 0) {
    console.log('\n💡 Recommendations:');
    result.recommendations.forEach(rec => console.log(`  - ${rec}`));
  }
});
