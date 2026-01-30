import { Prisma } from "@Prisma/client";
import type { Sponsor } from "@Prisma/client";

export namespace Sponsor {
  export type Entity = Sponsor;
  export type Records = Entity[];
  export type Null = Partial<Entity>;

  export type Select = Prisma.SponsorSelect;
  export type Where = Prisma.SponsorWhereInput;

  export type Create = Prisma.SponsorCreateInput;
  export type Update = Prisma.SponsorUpdateInput;
};

