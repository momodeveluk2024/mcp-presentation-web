import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const dir = path.join(__dirname, 'src');

const files = fs.readdirSync(dir).filter(f => f.startsWith('Poster') && f.endsWith('.tsx'));
let changedCount = 0;
files.forEach(f => {
  let content = fs.readFileSync(path.join(dir, f), 'utf8');
  let newContent = content.replace(/\{\/\* University Logo Placeholder \*\/\}[\s\S]*?University<br \/>Logo<\/span>\s*<\/div>\n*/g, '');
  if (content !== newContent) {
    fs.writeFileSync(path.join(dir, f), newContent);
    changedCount++;
  }
});
console.log('Removed placeholders from', changedCount, 'files');
