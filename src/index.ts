import fs from 'fs';
import { parseArgs } from 'node:util';

import { extractTextNodes } from './extractTextNodes';
import { parseList } from './parseList';

const { values } = parseArgs({
  allowPositionals: true,
  args: process.argv,
  options: {
    path: {
      type: 'string',
      short: 'p',
    },
  },
});

async function main(path?: string) {
  if (!path) {
    throw new Error('No file provided!');
  }
  const buffer = fs.readFileSync(path);
  const content = await extractTextNodes(buffer);
  // console.log(content);
  const parsed = parseList(content);
  console.log(parsed);
}

main(values.path);
