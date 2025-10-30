import Decimal from "decimal.js";
import { ServiceFactory } from "@Database/Factories/ServiceFactory";

const service = ServiceFactory.build({
  name: "Premium Service",
  price: new Decimal(99.99),
});

export const UpdateServiceFixture = {
  service: service,
  command: {
    valid: {
      id: service.id,
      name: service.name,
      price: service.price.toNumber(),
    },
    invalid: {
      id: -1,
      name: "ab",
      price: -50,
    },
  },
};
