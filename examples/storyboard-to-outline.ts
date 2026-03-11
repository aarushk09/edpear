/**
 * Example: storyboardToOutline
 *
 * Converts a wall of sticky notes, a drawn mind map, or a hand-sketched
 * storyboard into a structured, hierarchical JSON outline.
 *
 * CLI usage:
 *   edpear storyboard ./sticky-notes.jpg
 *   edpear storyboard ./mind-map.jpg --output outline.json
 */

import { createEdPearClient } from '@edpear/sdk';
import fs from 'fs';

const client = createEdPearClient(process.env.EDPEAR_API_KEY!);
const imageBase64 = 'data:image/jpeg;base64,' + fs.readFileSync('./sticky-notes.jpg').toString('base64');

client.storyboardToOutline(imageBase64).then(result => {
  console.log(`\n📋 ${result.title}`);
  console.log(`🌿 ${result.totalNodes} nodes\n`);

  // Render the tree
  const nodeMap = new Map(result.nodes.map(n => [n.id, n]));

  function renderNode(id: string, indent: number = 0) {
    const node = nodeMap.get(id);
    if (!node) return;
    const prefix = '  '.repeat(indent) + (indent === 0 ? '◆' : '•');
    console.log(`${prefix} ${node.text}`);
    if (node.notes) console.log(`${'  '.repeat(indent + 1)}(${node.notes})`);
    node.children.forEach(childId => renderNode(childId, indent + 1));
  }

  const root = result.nodes.find(n => n.level === 0);
  if (root) renderNode(root.id);

  console.log('\n📝 Summary:', result.linearSummary);

  // Save to file
  fs.writeFileSync('outline.json', JSON.stringify(result, null, 2));
  console.log('\n💾 Saved to outline.json');
});
