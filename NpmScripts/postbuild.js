// @ts-nocheck
const fs = require('fs');

const INPUT_DIR = 'public/';
const OUTPUT_DIR = '/opt/homebrew/var/www/blogs/';

// function copyRecursive(src, dest) {
//   const entries = fs.readdirSync(src, { withFileTypes: true });
//   if (!fs.existsSync(dest)) {
//     fs.mkdirSync(dest, { recursive: true });
//   }

//   for (let entry of entries) {
//     const srcPath = path.join(src, entry.name);
//     const destPath = path.join(dest, entry.name);
//     if (entry.isDirectory()) {
//       copyRecursive(srcPath, destPath);
//     } else {
//       fs.copyFileSync(srcPath, destPath);
//     }
//   }
// }

// function clearDirectoryContents(dest) {
//   fs.rmSync(dest, { recursive: true, force: true });
//   fs.mkdirSync(dest, { recursive: true });
// }

// clearDirectoryContents(OUTPUT_DIR);
// copyRecursive(INPUT_DIR, OUTPUT_DIR);

try {
  // since Node.js 16.7.0
  // we can use mordern fs methods to simplify the code
  fs.rmSync(OUTPUT_DIR, { recursive: true, force: true });
  fs.mkdirSync(OUTPUT_DIR, { recursive: true });
  fs.cpSync(INPUT_DIR, OUTPUT_DIR, { recursive: true });
} catch (err) {
  console.error('Error during post-build file operations:', err);
  process.exit(1);
}

console.log('Post-build process completed: Files copied to', OUTPUT_DIR);
