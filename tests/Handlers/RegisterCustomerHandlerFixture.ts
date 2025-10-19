import { CustomerFactory } from "@Database/Factories/CustomerFactory";

const customer = CustomerFactory.build({
  country: "USA",
  name: "John Doe",
  phone: "123-456-7890",
  email: "john.doe@example.com",
});

export const RegisterCustomerHandlerFixture = {
  customer: customer,
  command: {
    valid: {
      name: customer.name,
      email: customer.email,
      phone: customer.phone,
      country: customer.country,
    },
    invalid: {
      name: "tst",
      email: "invalid-email",
      phone: "123",
      country: "U",
    },
  },
};
