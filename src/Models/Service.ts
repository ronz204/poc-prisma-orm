import { Prisma } from "generated/prisma";
import type { Service as Model } from "generated/prisma";

export namespace Service {
  export type Entity = Model;
  export type Records = Model[];
  export type Optional = Partial<Model>;

  export type Include = Prisma.ServiceInclude;
  export type Where = Prisma.ServiceWhereInput;
  export type Unique = Prisma.ServiceWhereUniqueInput;

  export type Create = Prisma.ServiceCreateInput;
  export type Update = Prisma.ServiceUpdateInput;
};
