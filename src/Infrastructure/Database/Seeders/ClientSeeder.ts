import { Seeder } from "@Database/Seeder";
import type { PrismaClient } from "generated/prisma";
import { ClientFactory } from "@Database/Factories/ClientFactory";

export class ClientSeeder extends Seeder {
  constructor(prisma: PrismaClient) {
    super(prisma, "client-seeder");
  };

  public async seed(): Promise<void> {
    const clients = await ClientFactory.bulk(15, {});
    await this.prisma.client.createMany({ data: clients });
  };
};
