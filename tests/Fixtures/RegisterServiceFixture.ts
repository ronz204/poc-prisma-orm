import Decimal from "decimal.js";
import { ServiceFactory } from "@Database/Factories/ServiceFactory";

const service = ServiceFactory.build({
  name: "Premium Service",
  price: new Decimal(99.99),
});

export const RegisterServiceFixture = {
  service: service,
  command: {
    valid: {
      name: service.name,
      price: service.price.toNumber(),
    },
    invalid: {
      name: "ab",
      price: -50,
    },
  },
};
