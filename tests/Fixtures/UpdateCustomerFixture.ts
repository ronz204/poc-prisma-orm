import { CustomerFactory } from "@Database/Factories/CustomerFactory";

const customer = CustomerFactory.build({
  country: "USA",
  name: "John Doe",
  phone: "123-456-7890",
  email: "john.doe@example.com",
});

export const UpdateCustomerFixture = {
  customer: customer,
  command: {
    valid: {
      id: customer.id,
      name: customer.name,
      email: customer.email,
      phone: customer.phone,
      country: customer.country,
    },
    invalid: {
      id: 100,
      name: "tst",
      email: "invalid-email",
      phone: "123",
      country: "U",
    },
  },
};
