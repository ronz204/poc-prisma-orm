export class Specification {
  protected where = {};
  
  protected skip: number = 0;
  protected take: number = 10;

  public setSkip(value: number): this {
    this.skip = value; return this
  };

  public setTake(value: number): this {
    this.take = value; return this
  };
};
