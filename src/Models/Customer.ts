import { Prisma } from "generated/prisma";
import type { Customer as Model } from "generated/prisma";

export namespace Customer {
  export type Entity = Model;
  export type Records = Model[];
  export type Optional = Partial<Model>;

  export type Include = Prisma.CustomerInclude;
  export type Where = Prisma.CustomerWhereInput;
  export type Unique = Prisma.CustomerWhereUniqueInput;

  export type Create = Prisma.CustomerCreateInput;
  export type Update = Prisma.CustomerUpdateInput;
};
