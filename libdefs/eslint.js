declare module 'eslint' {
  declare export type ContextType = {|
    options: $ReadOnlyArray<any>, // eslint-disable-line flowtype/no-weak-types
    getFilename: () => string,
    getAncestors: () => $ReadOnlyArray<BabelNode>,
    report: ({|
      node: BabelNode,
      messageId?: string,
      data?: { [string]: string },
      message?: string,
      loc: ?BabelNodeSourceLocation,
      fix?: FixFunctionType,
    |}) => void,
  |};

  declare export type VisitorType = {
    [string]: (BabelNode) => void,
  };
  declare export type OptionsSchemaType = $ReadOnlyArray<{}>;

  declare export type RuleMetaType = {|
    type: 'problem' | 'suggestion' | 'layout',
    docs: {|
      description: string,
      category?: string,
      recommended: boolean,
      url?: string,
    |},
    fixable: null | 'code' | 'whitespace',
    schema?: OptionsSchemaType,
    messages?: { [string]: string },
    deprecated?: boolean,
    replacedBy?: $ReadOnlyArray<string>,
  |};

  declare export opaque type FixingType;
  declare export type RangeType = [number, number];
  declare export type FixerType = {|
    insertTextAfter: (BabelNode, string) => FixingType,
    insertTextAfterRange: (RangeType, string) => FixingType,
    insertTextBefore: (BabelNode, string) => FixingType,
    insertTextBeforeRange: (RangeType, string) => FixingType,
    remove: BabelNode => FixingType,
    removeRange: RangeType => FixingType,
    replaceText: (BabelNode, string) => FixingType,
    replaceTextRange: (RangeType, string) => FixingType,
  |};

  declare export type FixFunctionType = FixerType => FixingType | $ReadOnlyArray<FixingType>;

  declare export type CreateFunctionType = ContextType => VisitorType;

  declare export type RuleObjectType = {|
    meta: RuleMetaType,
    create: CreateFunctionType,
    fix?: FixFunctionType,
  |};

  declare type TestCaseType = {|
    code: string,
    options?: $ReadOnlyArray<mixed>,
    filename?: string,
  |};

  declare type ValidTestCaseType = TestCaseType | string;

  declare type ErrorAssertionType = {|
    message?: string | RegExp,
    messageId?: string,
    type?: string,
    line?: number,
    column?: number,
    endLine?: number,
    endColumn?: number,
  |};

  declare type InvalidTestCaseType = {|
    ...TestCaseType,
    errors: number | $ReadOnlyArray<ErrorAssertionType>,
    output?: string,
  |};

  declare export type TestObjectType = {|
    valid: $ReadOnlyArray<ValidTestCaseType>,
    invalid: $ReadOnlyArray<InvalidTestCaseType>,
  |};

  declare export class RuleTester {
    constructor(opts?: {}): void, // TODO

    run(ruleName: string, ruleObject: RuleObjectType, testCasesObject: TestObjectType): void,
  }
}
