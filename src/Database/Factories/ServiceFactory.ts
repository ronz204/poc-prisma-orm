import Decimal from "decimal.js";
import { faker } from "@faker-js/faker";
import type { Service } from "@Models/Service";

export class ServiceFactory {
  public static build(service: Service.Optional = {}): Service.Entity {
    return {
      id: service.id ?? faker.number.int({ min: 1, max: 1000 }),
      name: service.name ?? faker.company.name(),
      price: service.price ?? new Decimal(faker.commerce.price({ min: 10, max: 1000, dec: 2 })),
      active: service.active ?? faker.datatype.boolean(),
    };
  };
};
