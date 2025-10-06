import { UserFactory } from "@Database/Factories/UserFactory";

const user = await UserFactory.build({
  country: "USA",
  name: "tester",
  phone: "1234567890",
  email: "tester@example.com",
});

export const CreateUserHandlerFixture = {
  user: user,
  command: {
    valid: {
      name: user.name,
      phone: user.phone,
      email: user.email,
      country: user.country,
    },
    invalid: {
      country: "U",
      name: "te",
      phone: "123",
      email: "testerexample.com",
    },
  },
};
