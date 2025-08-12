import { faker } from "@faker-js/faker";
import type { Client } from "generated/prisma";

export class ClientFactory {
  public static async build(client: Partial<Client>): Promise<Client> {
    return {
      id: client.id ?? faker.number.int({ min: 1, max: 100 }),
      name: client.name ?? faker.person.fullName(),
      email: client.email ?? faker.internet.email(),
      isActive: client.isActive ?? faker.datatype.boolean(),
      createdAt: client.createdAt ?? faker.date.past(),
      updatedAt: client.updatedAt ?? faker.date.recent(),
    };
  };
};
