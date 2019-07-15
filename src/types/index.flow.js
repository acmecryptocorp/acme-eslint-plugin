// @flow

import type { RuleMetaType, TestObjectType, RuleObjectType } from 'eslint';


export type DocType = {|
  description?: string,
  // shortDescription?: string,
  rationale?: string,
|};

export type RuleBundleType = {|
  ruleName: string,
  meta: RuleMetaType,
  doc?: DocType,
  assertions: TestObjectType,
  ruleObject: RuleObjectType,
|};
