import { Prisma } from "./Prisma";
import { UserSeeder } from "./Seeders/UserSeeder";
import { PlanSeeder } from "./Seeders/PlanSeeder";
import { SubsSeeder } from "./Seeders/SubsSeeder";

export class Runner {
  public static async execute(): Promise<void> {
    await new UserSeeder(Prisma).seed();
    await new PlanSeeder(Prisma).seed();
    await new SubsSeeder(Prisma).seed();
  };
};

await Runner.execute();
