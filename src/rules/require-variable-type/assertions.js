// @flow

import type { TestObjectType } from 'eslint';

export default (ruleName: string): TestObjectType => ({
  valid: [
    'const x: number = 1',
    "const mod = require('mod')",
    "const mod = require('mod').property",
    'const f = (x, y) => {}',
    'let f = function() {}',
    'let x: number',
  ],
  invalid: [
    {
      code: 'const x = 1',
      errors: [
        {
          messageId: ruleName,
          line: 1,
          column: 7,
          endLine: 1,
          endColumn: 8,
        },
      ],
    },
    {
      code: 'const [a, b] = []',
      errors: [
        {
          messageId: ruleName,
          line: 1,
          column: 7,
          endLine: 1,
          endColumn: 13,
        },
      ],
    },
    {
      code: 'const { a, b } = {}',
      errors: [
        {
          messageId: ruleName,
          line: 1,
          column: 7,
          endLine: 1,
          endColumn: 15,
        },
      ],
    },
    {
      code: 'let x',
      errors: [{ messageId: ruleName }],
    },
    {
      code: "const mod = f(require('mod'))",
      errors: [{ messageId: ruleName }],
    },
    {
      code: "const mod = require('mod')()",
      errors: [{ messageId: ruleName }],
    },
    {
      code: "const mod = require('mod').property()",
      errors: [{ messageId: ruleName }],
    },
    {
      code: "const mod = require('mod').property.a",
      errors: [{ messageId: ruleName }],
    },
  ],
});
