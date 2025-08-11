import { Prisma } from "./Prisma";
import { UserSeeder } from "./Seeders/UserSeeder";
import { PlanSeeder } from "./Seeders/PlanSeeder";
import { SubsSeeder } from "./Seeders/SubsSeeder";
import { InvoiceSeeder } from "./Seeders/InvoiceSeeder";
import { PaymentSeeder } from "./Seeders/PaymentSeeder";

const seeders = [
  new UserSeeder(Prisma),
  new PlanSeeder(Prisma),
  new SubsSeeder(Prisma),
  new InvoiceSeeder(Prisma),
  new PaymentSeeder(Prisma),
];

export class Runner {
  public static async execute(): Promise<void> {
    for (const seeder of seeders) {
      const runned = await Prisma.seeder.findUnique({
        where: { name: seeder.name }
      });

      if (runned) return;
      await seeder.seed();
      await Prisma.seeder.create({ data: { name: seeder.name } });
    };
  };
};

await Runner.execute();
