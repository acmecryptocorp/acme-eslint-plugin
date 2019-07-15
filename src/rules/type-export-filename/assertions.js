// @flow

import type { TestObjectType } from 'eslint';


export default (ruleName: string): TestObjectType => ({
  valid: [
    { code: 'export type A = {}', filename: 'types/index.flow.js' },
    { code: 'export interface A {}', filename: 'types/index.types.js' },
    { code: 'export interface A {}', filename: 'index.js', options: [['*']] },
    { code: 'export const a = 1' },
    { code: 'export type A = {}', filename: '/code/project/index.js', options: [['index.js']] },
  ],
  invalid: [
    {
      code: 'export type A = {}',
      filename: 'index.js',
      errors: [
        {
          messageId: ruleName,
          line: 1,
          column: 1,
          endLine: 1,
          endColumn: 19,
        },
      ],
    },
    {
      code: 'export type A = {}',
      filename: 'types/index.flow.js',
      options: [['**.types.js']],
      errors: [
        {
          messageId: ruleName,
          line: 1,
          column: 1,
          endLine: 1,
          endColumn: 19,
        },
      ],
    },
  ],
});
