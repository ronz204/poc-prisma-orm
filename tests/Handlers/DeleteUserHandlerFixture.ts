import { UserFactory } from "@Database/Factories/UserFactory";

const deleted = await UserFactory.build({
  id: 1,
  country: "USA",
  name: "user to delete",
  phone: "1234567890",
  email: "delete@example.com",
});

export const DeleteUserHandlerFixture = {
  deleted: deleted,
  command: {
    valid: {
      id: 1,
    },
    invalid: {
      id: -1,
    },
  },
};
