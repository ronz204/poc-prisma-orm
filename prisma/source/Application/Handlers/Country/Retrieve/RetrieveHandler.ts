import type { Handler } from "@Handlers/Handler";
import type { RetrieveCountriesQuery as Query } from "./RetrieveQuery";
import type { RetrieveCountriesResponse as Response } from "./RetrieveResponse";

import { Prisma } from "@Database/Connector";
import { RetrieveCountriesSpec } from "./RetrieveSpec";
import { RetrieveCountriesSchema } from "./RetrieveSchema";

export class RetrieveCountriesHandler implements Handler<Query, Response> {

  public async handle(input: Query): Promise<Response> {
    const validated = RetrieveCountriesSchema.parse(input);

    const spec = new RetrieveCountriesSpec(validated);
    const records = await Prisma.country.findMany(spec.toQuery());

    return records.map(record => ({
      id: record.id,
      name: record.name,
      code: record.code,
    }));
  };
};
