import { Prisma } from "./Prisma";
import { SubsSeeder } from "./Seeders/SubsSeeder";
import { PlanSeeder } from "./Seeders/PlanSeeder";
import { ClientSeeder } from "./Seeders/ClientSeeder";
import { InvoiceSeeder } from "./Seeders/InvoiceSeeder";
import { PaymentSeeder } from "./Seeders/PaymentSeeder";

const seeders = [
  new PlanSeeder(Prisma),
  new ClientSeeder(Prisma),
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

      if (runned) continue;
      await seeder.seed();
      await Prisma.seeder.create({ data: { name: seeder.name } });
    };
  };
};

await Runner.execute();
