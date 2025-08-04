import { Prisma } from "./Prisma";
import { UserSeeder } from "./Seeders/UserSeeder";

export class Runner {
  public static async execute(): Promise<void> {
    await new UserSeeder(Prisma).seed();
  };
};

await Runner.execute();
