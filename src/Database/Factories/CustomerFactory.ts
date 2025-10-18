import { faker } from "@faker-js/faker";
import type { Customer } from "@Models/Customer";

export class CustomerFactory {
  public static build(customer: Customer.Optional = {}): Customer.Entity {
    return {
      id: customer.id ?? faker.number.int({ min: 1, max: 1000 }),
      phone: customer.phone ?? faker.phone.number(),
      name: customer.name ?? faker.person.fullName(),
      email: customer.email ?? faker.internet.email(),
      active: customer.active ?? faker.datatype.boolean(),
      country: customer.country ?? faker.location.country(),
    };
  };
};
