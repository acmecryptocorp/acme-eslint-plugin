// @flow

import type { RuleObjectType } from 'eslint';

import ruleBundles from './rules';
import type { RuleBundleType } from './types/index.flow';


type RulesIndexerType = {
  [string]: RuleObjectType,
};

const buildExportedRulesObject = (rules: $ReadOnlyArray<RuleBundleType>): RulesIndexerType =>
  rules.reduce(
    (acc: RulesIndexerType, { ruleName, ruleObject }: RuleBundleType): RulesIndexerType => ({
      ...acc,
      [ruleName]: ruleObject,
    }),
    {},
  );

type ExportType = {|
  rules: RulesIndexerType,
|};

module.exports = ({
  rules: buildExportedRulesObject(ruleBundles),
}: ExportType);
