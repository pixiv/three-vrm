export class Xorshift {
  public seed: number;

  public constructor(seed?: number) {
    this.seed = seed || 1;
  }

  public gen(seed?: number): number {
    if (seed) {
      this.seed = seed;
    }

    this.seed = this.seed ^ (this.seed << 13);
    this.seed = this.seed ^ (this.seed >>> 17);
    this.seed = this.seed ^ (this.seed << 5);
    return this.seed / Math.pow(2, 32) + 0.5;
  }

  public set(seed?: number): void {
    this.seed = seed || this.seed || 1;
  }
}
