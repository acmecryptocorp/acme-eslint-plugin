// @flow

import { RuleTester } from 'eslint';

import type { RuleBundleType } from '../src/types/index.flow';
import rules from '../src/rules';

const ruleTester: RuleTester = new RuleTester({ parser: 'babel-eslint' });

rules.forEach(({ ruleName, ruleObject, assertions }: RuleBundleType) => {
  ruleTester.run(ruleName, ruleObject, assertions);
});
