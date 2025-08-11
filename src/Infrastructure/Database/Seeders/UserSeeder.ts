import { Seeder } from "@Database/Seeder";
import type { PrismaClient } from "generated/prisma";
import { UserFactory } from "@Database/Factories/UserFactory";
import { BcryptService } from "@Services/Bcrypt/BcryptService";

export class UserSeeder extends Seeder {
  constructor(prisma: PrismaClient) {
    super(prisma)
  };

  public async seed(): Promise<void> {
    const users = await UserFactory.bulk(15, {});

    await Promise.all(users.map(async (user) => {
      const hashed = await BcryptService.hash(user.password);

      await this.prisma.user.create({
        data: {
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
