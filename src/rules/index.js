// @flow

import type { RuleBundleType } from '../types/index.flow';

import requireExactObjectType from './require-exact-object-type';
import requireExplicitObjectExactness from './require-explicit-object-exactness';
import requireVariableType from './require-variable-type';
import typeExportFilename from './type-export-filename';

export default ([
  requireExactObjectType,
  requireExplicitObjectExactness,
  requireVariableType,
  typeExportFilename,
]: $ReadOnlyArray<RuleBundleType>);
