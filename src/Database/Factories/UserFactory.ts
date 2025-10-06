import { faker } from "@faker-js/faker";
import type { User } from "@Models/User";

export class UserFactory {
  public static async build(user: User.Optional = {}): Promise<User.Entity> {
    return {
      id: user.id ?? faker.number.int({ min: 1, max: 1000 }),
      phone: user.phone ?? faker.phone.number(),
      name: user.name ?? faker.person.fullName(),
      email: user.email ?? faker.internet.email(),
      active: user.active ?? faker.datatype.boolean(),
      country: user.country ?? faker.location.country(),
    };
  };
};
