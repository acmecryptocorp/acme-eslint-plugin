// @flow

import path from 'path';

import { isVariableDeclarator } from '@babel/types';
import type {
  RuleMetaType,
  RuleObjectType,
  TestObjectType,
  ContextType,
  VisitorType,
} from 'eslint';

import { isFunction, isRequireCall, isRequireMemberExpression } from '../../utils';
import type { RuleBundleType } from '../../types/index.flow';

import getAssertions from './assertions';


const ruleName: string = path.basename(__dirname);
const meta: RuleMetaType = {
  messages: {
    [ruleName]: 'Missing variable type annotation.',
  },
  type: 'suggestion',
  docs: {
    description:
      'Requires that all variable declarators (except `require` calls and function declarations assignments) have type annotations',
    recommended: true,
    // TODO url
  },
  fixable: null,
};

// const doc: DocType = {}; // TODO

const assertions: TestObjectType = getAssertions(ruleName);

const typeAnnotationIsNotRequired = (init: ?BabelNodeExpression): boolean =>
  isRequireCall(init) || isRequireMemberExpression(init) || isFunction(init);

const create = (context: ContextType): VisitorType => ({
  VariableDeclarator(node: BabelNode) {
    /* istanbul ignore next */
    if (!isVariableDeclarator(node)) {
      return;
    }

    if (node.id.typeAnnotation != null) {
      return;
    }

    if (typeAnnotationIsNotRequired(node.init)) {
      return;
    }

    context.report({
      node,
      messageId: ruleName,
      loc: node.id.loc,
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
