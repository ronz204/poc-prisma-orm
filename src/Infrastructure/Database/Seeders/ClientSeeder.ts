import { Seeder } from "@Database/Seeder";
import type { PrismaClient } from "generated/prisma";
import { ClientFactory } from "@Database/Factories/ClientFactory";

export class ClientSeeder extends Seeder {
  constructor(prisma: PrismaClient) {
    super(prisma, "client-seeder");
  };

  public async seed(): Promise<void> {
    await Promise.all(Array.from({ length: 15 }).map(async () => {
      const client = await ClientFactory.build({});
      await this.prisma.client.create({ data: client });
    }));
  };
};
