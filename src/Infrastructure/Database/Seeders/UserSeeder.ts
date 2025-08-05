import { Seeder } from "@Database/Seeder";
import type { PrismaClient } from "generated/prisma";
import { BcryptService } from "@Services/Bcrypt/BcryptService";

export class UserSeeder extends Seeder {
  constructor(prisma: PrismaClient) {
    super(prisma)
  };

  public async seed(): Promise<void> {
    const users = [
      {
        name: "Alice",
        email: "alice@example.com",
        password: "password123",
        biography: "Alice Bio",
        pictureUrl: null,
      },
      {
        name: "Bob",
        email: "bob@example.com",
        password: "password123",
        biography: "Bob Bio",
        pictureUrl: null,
      },
      {
        name: "Charlie",
        email: "charlie@example.com",
        password: "password123",
        biography: "Charlie Bio",
        pictureUrl: null,
      },
      {
        name: "Diana",
        email: "diana@example.com",
        password: "password123",
        biography: "Diana Bio",
        pictureUrl: null,
      },
      {
        name: "Eve",
        email: "eve@example.com",
        password: "password123",
        biography: "Eve Bio",
        pictureUrl: null,
      },
    ];

    const hashes = await Promise.all(users.map(user => {
      return BcryptService.hash(user.password);
    }));

    await Promise.all(users.map((user, idx) => {
      const hashed = hashes[idx]!;

      return this.prisma.user.upsert({
        where: { email: user.email },
        update: {},
        create: {
          name: user.name,
          email: user.email,
          password: hashed,
          biography: user.biography,
          pictureUrl: user.pictureUrl,
        },
      });
    }));
  };
};
