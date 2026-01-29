import { Prisma } from "@Prisma/client";
import type { Game } from "@Prisma/client";

export namespace Game {
  export type Entity = Game;
  export type Records = Entity[];
  export type Null = Partial<Entity>;

  export type Select = Prisma.GameSelect;
  export type Include = Prisma.GameInclude;
  export type Where = Prisma.GameWhereInput;
  
  export type Create = Prisma.GameCreateInput;
  export type Update = Prisma.GameUpdateInput;
};
