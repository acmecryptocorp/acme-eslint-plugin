/* eslint-disable no-console */

const fs = require('fs');
const path = require('path');

const { pathToRulesDirectory } = require('./utils');


const ruleName = process.argv[2];

if (ruleName === undefined) {
  console.error('Error: Rule name is required. Aborting.');
  process.exit(1);
}

const ruleDirectoryPath = path.join(pathToRulesDirectory, ruleName);

const projectPath = path.join(__dirname, '..');
const ruleDirectoryRelativePath = path.relative(projectPath, ruleDirectoryPath);

if (!fs.existsSync(ruleDirectoryPath)) {
  fs.mkdirSync(ruleDirectoryPath);
  console.info(`Rule directory created at '${ruleDirectoryRelativePath}'.\n`);
} else {
  console.info(`Directory '${ruleDirectoryRelativePath}' exists. Skipping creation.\n`);
}

const ruleTemplatePath = path.join(__dirname, 'ruleTemplate');

fs.readdirSync(ruleTemplatePath).forEach((filePath) => {
  const sourcePath = path.join(ruleTemplatePath, filePath);
  const targetPath = path.join(ruleDirectoryPath, filePath);
  const relativeTargetPath = path.relative(projectPath, targetPath);

  if (fs.existsSync(targetPath)) {
    console.log(`'${relativeTargetPath}' exitst. Skipping.`);
  } else {
    fs.copyFileSync(sourcePath, targetPath);
    console.info(`'${filePath}' copied to '${relativeTargetPath}'.`);
  }
});

console.log(`\nRule '${ruleName}' has been created.\n`);
