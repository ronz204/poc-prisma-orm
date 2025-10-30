import { ServiceFactory } from "@Database/Factories/ServiceFactory";
import { CustomerFactory } from "@Database/Factories/CustomerFactory";
import { ContractFactory } from "@Database/Factories/ContractFactory";

const service = ServiceFactory.build({
  active: true,
  name: "Premium Support",
});

const customer = CustomerFactory.build({
  active: true,
  country: "USA",
  name: "Jane Smith",
  phone: "987-654-3210",
  email: "jane.smith@example.com",
});

const contract = ContractFactory.build({
  customerId: customer.id,
  serviceId: service.id,
  startDate: new Date(),
  active: true,
});

export const RetrieveCustomerFixture = {
  service: service,
  contract: contract,
  customer: {
    id: customer.id,
    name: customer.name,
    email: customer.email,
    phone: customer.phone,
    active: customer.active,
    country: customer.country,
    contracts: [
      {
        id: contract.id,
        service: service,
        active: contract.active,
        startDate: contract.startDate,
      },
    ],
  },
  query: {
    valid: {
      id: customer.id,
    },
    invalid: {
      id: -1,
    },
  },
};
