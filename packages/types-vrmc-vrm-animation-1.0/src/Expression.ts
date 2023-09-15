/**
 * Represents a single expression.
 */
export interface Expression {
  /**
   * Represents a single glTF node mapped to this expression.
   */
  node: number;

  extensions?: { [name: string]: any };
  extras?: any;
}
