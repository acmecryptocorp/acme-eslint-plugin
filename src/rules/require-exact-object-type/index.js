// @flow

import path from 'path';

import {
  isObjectTypeAnnotation,
  isDeclareClass,
  isDeclareInterface,
  isInterfaceDeclaration,
  isInterfaceTypeAnnotation,
} from '@babel/types';
import type {
  RuleMetaType,
  RuleObjectType,
  TestObjectType,
  ContextType,
  VisitorType,
  FixerType,
  FixingType,
  RangeType,
} from 'eslint';

import type { RuleBundleType } from '../../types/index.flow';

import getAssertions from './assertions';


const ruleName: string = path.basename(__dirname);
const meta: RuleMetaType = {
  messages: {
    [ruleName]: 'Object type annotations must be exact',
  },
  type: 'problem',
  docs: {
    description: '', // TODO
    recommended: true,
    // TODO url
  },
  fixable: 'code',
};

// const doc: DocType = {}; // TODO
const assertions: TestObjectType = getAssertions(ruleName);

const mustBeExact = (node: BabelNodeObjectTypeAnnotation, parent: BabelNode): boolean =>
  node.properties.length > 0
  && !(
    isDeclareClass(parent)
    || isDeclareInterface(parent)
    || isInterfaceDeclaration(parent)
    || isInterfaceTypeAnnotation(parent)
  );

const create = (context: ContextType): VisitorType => ({
  ObjectTypeAnnotation(node: BabelNode) {
    /* istanbul ignore next */
    if (!isObjectTypeAnnotation(node)) {
      return;
    }

    const nodeIsExact: boolean = node.exact != null && node.exact;
    if (nodeIsExact) {
      return;
    }

    const ancestors: $ReadOnlyArray<BabelNode> = context.getAncestors();
    const parent: BabelNode = ancestors[ancestors.length - 1];

    if (!mustBeExact(node, parent)) {
      return;
    }

    context.report({
      node,
      messageId: ruleName,
      loc: node.loc,
      fix: (fixer: FixerType): $ReadOnlyArray<FixingType> => {
        const rangeAfter: RangeType = [node.range[0], node.range[1] - 1];
        const rangeBefore: RangeType = [node.range[0] + 1, node.range[1]];

        return [
          fixer.insertTextBeforeRange(rangeBefore, '|'),
          fixer.insertTextAfterRange(rangeAfter, '|'),
        ];
      },
    });
  },
});

const ruleObject: RuleObjectType = { meta, create };

export {
  ruleName, meta, assertions, ruleObject,
};

export default ({
  ruleName,
  meta,
  // doc,
  assertions,
  ruleObject,
}: RuleBundleType);
