const path = require('path');

const capitalize = ([firstLetter, ...restLetters]) =>
  firstLetter.toUpperCase().concat(restLetters.join(''));

const convertKebabCaseToCamelCase = (str) =>
  str
    .split('-')
    .map((item, ind) => (ind === 0 ? item : capitalize(item)))
    .join('');

const pathToRulesDirectory = path.join(__dirname, '../src/rules');

module.exports = {
  convertKebabCaseToCamelCase,
  pathToRulesDirectory,
};
