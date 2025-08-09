import { Seeder } from "@Database/Seeder";
import type { PrismaClient } from "generated/prisma";
import { UserFactory } from "@Database/Factories/UserFactory";
import { BcryptService } from "@Services/Bcrypt/BcryptService";

export class UserSeeder extends Seeder {
  constructor(prisma: PrismaClient) {
    super(prisma)
  };

  public async seed(): Promise<void> {
    await this.prisma.user.deleteMany();

    const users = await Promise.all(
      Array.from({ length: 15 }).map(() => UserFactory.build({})));

    await Promise.all(users.map(async (user) => {
      const hashed = await BcryptService.hash(user.password);

      return this.prisma.user.create({
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
