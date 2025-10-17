import { UserFactory } from "@Database/Factories/UserFactory";

const updated = await UserFactory.build({
  id: 1,
  country: "Canada",
  name: "updated tester",
  phone: "0987654321",
  email: "tester@example.com",
});

export const UpdateUserHandlerFixture = {
  updated: updated,
  command: {
    valid: {
      id: 1,
      name: updated.name,
      phone: updated.phone,
      country: updated.country,
    },
    invalid: {
      id: -1,
      name: "te",
      phone: "123",
      country: "U",
    },
  },
};
