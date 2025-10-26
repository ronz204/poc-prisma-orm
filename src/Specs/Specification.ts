export class Specification {  
  private skip: number = 0;
  private take: number = 10;

  protected setPagination(page: number, limit: number): this {
    this.skip = (page - 1) * limit;
    this.take = limit;
    return this;
  };

  protected getSkip(): number {
    return this.skip;
  };

  protected getTake(): number {
    return this.take;
  };
};
