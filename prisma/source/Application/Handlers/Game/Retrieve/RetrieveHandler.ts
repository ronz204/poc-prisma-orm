import type { Handler } from "@Handlers/Handler";
import type { RetrieveGamesQuery as Query } from "./RetrieveQuery";
import type { RetrieveGamesResponse as Response } from "./RetrieveResponse";

import { PrismaClient } from "@Prisma/client";
import { RetrieveGamesSpec } from "./RetrieveSpec";
import { RetrieveGamesMapper } from "./RetrieveMapper";
import { RetrieveGamesSchema } from "./RetrieveSchema";

export class RetrieveGamesHandler implements Handler<Query, Response> {
  constructor(private prisma: PrismaClient) {};

  public async handle(input: Query): Promise<Response> {
    const validated = RetrieveGamesSchema.parse(input);

    const query = new RetrieveGamesSpec(validated).toQuery();
    const records = await this.prisma.game.findMany(query);

    return RetrieveGamesMapper.toResponse(records);
  };
};
