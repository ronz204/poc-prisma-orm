import type { Handler } from "@Handlers/Handler";
import type { RetrieveSponsorsQuery as Query } from "./RetrieveQuery";
import type { RetrieveSponsorsResponse as Response } from "./RetrieveResponse";

import { PrismaClient } from "@Prisma/client";
import { RetrieveSponsorsSpec } from "./RetrieveSpec";
import { RetrieveSponsorsMapper } from "./RetrieveMapper";
import { RetrieveSponsorsSchema } from "./RetrieveSchema";

export class RetrieveSponsorsHandler implements Handler<Query, Response> {
  constructor(private prisma: PrismaClient) {};

  public async handle(input: Query): Promise<Response> {
    const validated = RetrieveSponsorsSchema.parse(input);

    const query = new RetrieveSponsorsSpec(validated).toQuery();
    const records = await this.prisma.sponsor.findMany(query);

    return RetrieveSponsorsMapper.toResponse(records);
  };
};
