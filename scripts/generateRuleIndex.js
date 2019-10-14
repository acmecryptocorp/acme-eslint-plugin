const fs = require('fs');
const path = require('path');

const getFileNamesFromRulesDirectory = require('./getFileNamesFromRulesDirectory');
const {
  convertKebabCaseToCamelCase,
  pathToRulesDirectory,
} = require('./utils');

const fileNames = getFileNamesFromRulesDirectory(pathToRulesDirectory);

const buildRuleImportDeclaration = (sourceName) =>
  `import ${convertKebabCaseToCamelCase(sourceName)} from './${sourceName}';`;

const importsStr = fileNames
  .map((fileName) => buildRuleImportDeclaration(fileName))
  .join('\n');

const exportArrayItemsStr = fileNames
  .map((fileName) => convertKebabCaseToCamelCase(fileName))
  .join(',\n  ');

const indexFile = `// @flow

import type { RuleBundleType } from '../types/index.flow';

${importsStr}

export default ([
  ${exportArrayItemsStr},
]: $ReadOnlyArray<RuleBundleType>);
`;

const indexFilePath = path.join(pathToRulesDirectory, 'index.js');

fs.writeFileSync(indexFilePath, indexFile);
console.log('Rule index generated.'); // eslint-disable-line no-console
