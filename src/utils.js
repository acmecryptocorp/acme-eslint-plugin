// @flow

import {
  isCallExpression,
  isArrowFunctionExpression,
  isFunctionExpression,
  isFunctionDeclaration,
  isMemberExpression,
} from '@babel/types';
import type { ContextType } from 'eslint';

const isFunction = (node: ?BabelNode): boolean %checks =>
  isArrowFunctionExpression(node) ||
  isFunctionExpression(node) ||
  isFunctionDeclaration(node);

const isRequireCall = (node: ?BabelNode): boolean %checks =>
  isCallExpression(node) && node.callee.name === 'require';

const isRequireMemberExpression = (node: ?BabelNode): boolean %checks =>
  isMemberExpression(node) && isRequireCall(node.object);

const isFlowComment = (comment: BabelNodeComment): boolean =>
  comment.value
    .split(/[\s*/\\]/)
    .some((commentPart: string) => commentPart === '@flow');

const isFlowFile = (context: ContextType): boolean => {
  const comments: $ReadOnlyArray<BabelNodeComment> = context.getAllComments();

  return comments.some(isFlowComment);
};

const isObject = (x: mixed): boolean %checks => x instanceof Object;

const shouldSkipCheck = (context: ContextType): boolean => {
  if (!isObject(context.settings.flowtype)) {
    return false;
  }

  const flowtype: { [string]: mixed } = context.settings.flowtype;

  if (flowtype.onlyFilesWithFlowAnnotation !== true) {
    return false;
  }

  return isFlowFile(context);
};

export {
  isFunction,
  isRequireCall,
  isRequireMemberExpression,
  isFlowComment,
  isFlowFile,
  shouldSkipCheck,
};
