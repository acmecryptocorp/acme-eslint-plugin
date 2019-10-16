// @flow

import type { TestObjectType } from 'eslint';

export default (ruleName: string): TestObjectType => ({
  valid: [
    'type ObjectType = {| a: number, b: number |}',
    'type NestedObjectType = {| obj: {| num: number|} |}',
    'type InexactObjectType = { a: number, ... }',
    'type ExactNestedObjectType = {| obj: { num: number, ... } |}',
    'type InexactNestedObjectType = { obj: { num: number, ... }, ... }',
    'const f = (obj: {| str: string |}) => {}',
    'type Objectype = {}',
    'declare class A { prop: number }',
    'interface A { prop: number }',
  ],
  invalid: [
    {
      code: 'type ObjectType = { num: number }',
      errors: [
        {
          messageId: ruleName,
          line: 1,
          column: 19,
          endLine: 1,
          endColumn: 34,
        },
      ],
      output: 'type ObjectType = {| num: number |}',
    },
    {
      code: 'type NestedObjectType = {| obj: { num: number  } |}',
      errors: [
        {
          messageId: ruleName,
          line: 1,
          column: 33,
          endLine: 1,
          endColumn: 49,
        },
      ],
      output: 'type NestedObjectType = {| obj: {| num: number  |} |}',
    },
    {
      code: 'const f = (obj: { num: number  }) => {}',
      errors: [
        {
          messageId: ruleName,
          line: 1,
          column: 17,
          endLine: 1,
          endColumn: 33,
        },
      ],
      output: 'const f = (obj: {| num: number  |}) => {}',
    },
    {
      code: 'type ObjectType = { obj: { num: number }, ... }',
      errors: [
        {
          messageId: ruleName,
          line: 1,
          column: 26,
          endLine: 1,
          endColumn: 41,
        },
      ],
      output: 'type ObjectType = { obj: {| num: number |}, ... }',
    },
  ],
});
