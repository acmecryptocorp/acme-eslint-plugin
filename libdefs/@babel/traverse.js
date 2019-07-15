// @flow

declare module '@babel/traverse' {
  declare type BindingsItemType = {|
    identifier: BabelNodeIdentifier,
    path: Path,
  |};

  declare type BindingsType = {
    [string]: BindingsItemType,
  };

  declare class Path {
    type: string,
    parentPath: Path | null,
    node: BabelNode,
    traverse: VisitorType => void,
    scope: {|
      bindings: BindingsType,
    |},
  }

  declare type PathType = Path;
  declare type VisitorType = {
    [string]: (Path) => void,
  };

  declare module.exports: (BabelNodeFile, VisitorType) => void;
}
