export class Specification {  
  protected skip: number = 0;
  protected take: number = 10;

  public setPagination(page: number, limit: number): this {
    this.skip = (page - 1) * limit;
    this.take = limit;
    return this;
  };
};
