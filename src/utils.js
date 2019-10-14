// @flow

import {
  isCallExpression,
  isArrowFunctionExpression,
  isFunctionExpression,
  isFunctionDeclaration,
  isMemberExpression,
} from '@babel/types';

const isFunction = (node: ?BabelNode): boolean %checks =>
  isArrowFunctionExpression(node) ||
  isFunctionExpression(node) ||
  isFunctionDeclaration(node);

const isRequireCall = (node: ?BabelNode): boolean %checks =>
  isCallExpression(node) && node.callee.name === 'require';

const isRequireMemberExpression = (node: ?BabelNode): boolean %checks =>
  isMemberExpression(node) && isRequireCall(node.object);

export { isFunction, isRequireCall, isRequireMemberExpression };
