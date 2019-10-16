// @flow

import type { RuleObjectType, ContextType, VisitorType } from 'eslint';

import ruleBundles from './rules';
import { shouldSkipCheck } from './utils';
import type { RuleBundleType } from './types/index.flow';

type RulesIndexerType = {
  +[string]: RuleObjectType,
};

const addSkipCheck = (ruleObject: RuleObjectType): RuleObjectType => ({
  ...ruleObject,
  create: (context: ContextType): VisitorType =>
    shouldSkipCheck(context) ? {} : ruleObject.create(context),
});

const buildExportedRulesObject = (
  rules: $ReadOnlyArray<RuleBundleType>,
): RulesIndexerType =>
  rules.reduce(
    (
      acc: RulesIndexerType,
      { ruleName, ruleObject }: RuleBundleType,
    ): RulesIndexerType => ({ ...acc, [ruleName]: addSkipCheck(ruleObject) }),
    {},
  );

type ExportType = {|
  rules: RulesIndexerType,
|};

module.exports = ({
  rules: buildExportedRulesObject(ruleBundles),
}: ExportType);
