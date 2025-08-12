import { Prisma } from "./Prisma";
import { PlanSeeder } from "./Seeders/PlanSeeder";
import { ClientSeeder } from "./Seeders/ClientSeeder";

const seeders = [
  new PlanSeeder(Prisma),
  new ClientSeeder(Prisma),
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
