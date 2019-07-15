// @flow

import type { RuleBundleType } from '../types/index.flow';

import requireExactObjectType from './require-exact-object-type';
import requireVariableType from './require-variable-type';
import typeExportFilename from './type-export-filename';


export default ([
  requireExactObjectType,
  requireVariableType,
  typeExportFilename,
]: $ReadOnlyArray<RuleBundleType>);
