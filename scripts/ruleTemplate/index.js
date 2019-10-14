// @flow

import path from 'path';

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
    [ruleName]: '',
  },
  type: '',
  docs: {
    description: '',
    recommended: true,
    // TODO url
  },
  fixable: null,
};

// const doc: DocType = {}; // TODO

const assertions: TestObjectType = getAssertions(ruleName);

const create: * = (context: ContextType): VisitorType => ({});

const ruleObject: RuleObjectType = { meta, create };

export { ruleName, meta, assertions, ruleObject };

export default ({
  ruleName,
  meta,
  // doc,
  assertions,
  ruleObject,
}: RuleBundleType);
