import { CustomerSpecification } from "@Specs/Bases/CustomerSpecification";

interface Args {
  id?: number;
  email?: string;
};

export class VerifyCustomerExistSpec extends CustomerSpecification {
  constructor(private readonly args: Args) {
    super();
    this.setWhere({
      OR: [{
        id: args.id,
        email: args.email
      }]
    });
  };

  public toQuery() {
    return {
      where: this.where,
    } as const;
  };
};
