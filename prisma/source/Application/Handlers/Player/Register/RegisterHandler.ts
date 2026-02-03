import type { Handler } from "@Handlers/Handler";
import type { RegisterPlayerCommand as Command } from "./RegisterCommand";
import type { RegisterPlayerResponse as Response } from "./RegisterResponse";

import { PrismaClient } from "@Prisma/client";
import { RegisterPlayerSpec } from "./RegisterSpec";
import { RegisterPlayerMapper } from "./RegisterMapper";
import { RegisterPlayerSchema } from "./RegisterSchema";

import { CheckPlayerExistsSpec } from "@Specs/Player/CheckPlayerExistsSpec";
import { CheckCountryExistsSpec } from "@Specs/Country/CheckCountryExistsSpec";

export class RegisterPlayerHandler implements Handler<Command, Response> {
  constructor(private prisma: PrismaClient) {};

  public async handle(input: Command): Promise<Response> {
    const validated = RegisterPlayerSchema.parse(input);

    const countryExists = new CheckCountryExistsSpec({ id: validated.country });
    const countryCount = await this.prisma.country.count(countryExists.toQuery());
    if (countryCount === 0) throw new Error("Country does not exist");

    const playerExists = new CheckPlayerExistsSpec({ name: validated.name, email: validated.email });
    const playerCount = await this.prisma.player.count(playerExists.toQuery());
    if (playerCount > 0) throw new Error("Player already exists");

    const query = new RegisterPlayerSpec(validated).toQuery();
    const record = await this.prisma.player.create(query);

    return RegisterPlayerMapper.toResponse(record);
  };
};
