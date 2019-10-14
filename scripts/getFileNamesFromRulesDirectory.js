const fs = require('fs');
const path = require('path');

const stripJsExtension = (filePath) => path.basename(filePath, '.js');

const isJsFileOrDirectory = (filePath) =>
  path.extname(filePath) != null || path.extname(filePath) === '.js';

module.exports = (rulesDirectory) =>
  fs
    .readdirSync(rulesDirectory)
    .filter(
      (filePath) => filePath !== 'index.js' && isJsFileOrDirectory(filePath),
    )
    .map((filePath) => stripJsExtension(filePath));
