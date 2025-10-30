import { CustomerFactory } from "@Database/Factories/CustomerFactory";

const customer = CustomerFactory.build({
  country: "USA",
  name: "John Doe",
  phone: "123-456-7890",
  email: "john.doe@example.com",
  active: false,
});

export const SuspendCustomerFixture = {
  customer: customer,
  command: {
    valid: {
      id: customer.id,
      reason: "Violation of terms",
    },
    invalid: {
      id: 100,
      reason: "Bad",
    },
  },
};
