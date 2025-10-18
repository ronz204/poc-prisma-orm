import { Prisma } from "generated/prisma";
import type { Contract as Model } from "generated/prisma";

export namespace Contract {
  export type Entity = Model;
  export type Records = Model[];
  export type Optional = Partial<Model>;

  export type Include = Prisma.ContractInclude;
  export type Where = Prisma.ContractWhereInput;
  export type Unique = Prisma.ContractWhereUniqueInput;

  export type Create = Prisma.ContractCreateInput;
  export type Update = Prisma.ContractUpdateInput;
};
