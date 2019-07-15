// @flow

import path from 'path';

import plugin from '../src';
import getFileNamesFromRulesDirectory from '../scripts/getFileNamesFromRulesDirectory';


const pathToRulesDirectory: string = path.join(__dirname, '../src/rules');

test('Rules index', () => {
  const directoryFileNames: $ReadOnlyArray<string> = getFileNamesFromRulesDirectory(
    pathToRulesDirectory,
  );

  expect(Object.keys(plugin.rules)).toEqual(directoryFileNames);
});
