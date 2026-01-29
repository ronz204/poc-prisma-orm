import { Prisma } from "@Prisma/client";
import type { Moder } from "@Prisma/client";

export namespace Moder {
  export type Entity = Moder;
  export type Records = Entity[];
  export type Null = Partial<Entity>;

  export type Select = Prisma.ModerSelect;
  export type Where = Prisma.ModerWhereInput;

  export type Create = Prisma.ModerCreateInput;
  export type Update = Prisma.ModerUpdateInput;
};
