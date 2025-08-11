import { Prisma } from "./Prisma";
import { UserSeeder } from "./Seeders/UserSeeder";
import { PlanSeeder } from "./Seeders/PlanSeeder";
import { SubsSeeder } from "./Seeders/SubsSeeder";
import { InvoSeeder } from "./Seeders/InvoSeeder";
import { PaymentSeeder } from "./Seeders/PaymentSeeder";

export class Runner {
  public static async execute(): Promise<void> {
    await new UserSeeder(Prisma).seed();
    await new PlanSeeder(Prisma).seed();
    await new SubsSeeder(Prisma).seed();
    await new InvoSeeder(Prisma).seed();
    await new PaymentSeeder(Prisma).seed();
  };
};

await Runner.execute();
