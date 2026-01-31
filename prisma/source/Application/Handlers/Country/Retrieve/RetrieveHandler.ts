import type { Handler } from "@Handlers/Handler";
import type { RetrieveCountriesQuery as Query } from "./RetrieveQuery";
import type { RetrieveCountriesResponse as Response } from "./RetrieveResponse";

import { PrismaClient } from "@Prisma/client";
import { RetrieveCountriesSpec } from "./RetrieveSpec";
import { RetrieveCountriesSchema } from "./RetrieveSchema";

export class RetrieveCountriesHandler implements Handler<Query, Response> {
  constructor(private prisma: PrismaClient) {};

  public async handle(input: Query): Promise<Response> {
    const validated = RetrieveCountriesSchema.parse(input);

    const query = new RetrieveCountriesSpec(validated).toQuery();
    const records = await this.prisma.country.findMany(query);

    return records.map(record => ({
      id: record.id,
      name: record.name,
      code: record.code,
    }));
  };
};
