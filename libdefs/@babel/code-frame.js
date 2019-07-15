declare module '@babel/code-frame' {
  declare export function codeFrameColumns(
    string,
    BabelNodeSourceLocation,
    {|
      highlightCode?: boolean,
      linesAbove?: number,
      linesBelow?: number,
      forceColor?: boolean,
      message?: string,
    |},
  ): string;
}
