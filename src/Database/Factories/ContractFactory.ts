import { faker } from "@faker-js/faker";
import type { Contract } from "@Models/Contract";

export class ContractFactory {
  public static build(contract: Contract.Optional = {}): Contract.Entity {
    const startDate = contract.startDate ?? faker.date.past();

    return {
      id: contract.id ?? faker.number.int({ min: 1, max: 1000 }),
      customerId: contract.customerId ?? faker.number.int({ min: 1, max: 100 }),
      serviceId: contract.serviceId ?? faker.number.int({ min: 1, max: 50 }),
      active: contract.active ?? faker.datatype.boolean(),
      startDate: startDate,
      endDate: contract.endDate ?? (faker.datatype.boolean() ? faker.date.future({ refDate: startDate }) : null),
    };
  };
};
