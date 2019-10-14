// @flow

import path from 'path';

import minimatch from 'minimatch';
import { isExportNamedDeclaration } from '@babel/types';
import type {
  RuleMetaType,
  RuleObjectType,
  TestObjectType,
  ContextType,
  VisitorType,
} from 'eslint';

import type { RuleBundleType } from '../../types/index.flow';

import getAssertions from './assertions';

const ruleName: string = path.basename(__dirname);
const meta: RuleMetaType = {
  messages: {
    [ruleName]:
      "Unexpected type export in '{{ filename }}'. Type exports only allowed in files that match following globs: {{ globs }}.", // TODO
  },
  schema: [{ type: 'array', items: { type: 'string' } }],
  type: 'problem',
  docs: {
    description: '', // TODO
    recommended: true,
    // TODO url
  },
  fixable: null,
};

// const doc: DocType = {}; // TODO

const assertions: TestObjectType = getAssertions(ruleName);

const exportIsAllowed = (
  filename: string,
  globs: $ReadOnlyArray<string>,
): boolean =>
  globs.some((glob: string): boolean =>
    minimatch(filename, glob, { matchBase: true }),
  );

const create = (context: ContextType): VisitorType => ({
  ExportNamedDeclaration(node: BabelNode) {
    if (isExportNamedDeclaration(node) && node.exportKind === 'type') {
      const defaultGlobs: [string, string] = [
        '**/types/**/*.types.js',
        '**/types/**/*.flow.js',
      ];

      const filename: string = context.getFilename();
      const globs: $ReadOnlyArray<string> = context.options[0] || defaultGlobs;

      if (!exportIsAllowed(filename, globs)) {
        context.report({
          node,
          loc: node.loc,
          messageId: ruleName,
          data: {
            filename,
            globs: globs.map((glob: string): string => `'${glob}'`).join(', '),
          },
        });
      }
    }
  },
});

const ruleObject: RuleObjectType = { meta, create };

export { ruleName, meta, assertions, ruleObject };

export default ({
  ruleName,
  meta,
  // doc,
  assertions,
  ruleObject,
}: RuleBundleType);
