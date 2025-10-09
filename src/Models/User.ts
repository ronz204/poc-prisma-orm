import { Prisma } from "generated/prisma";
import type { User as Model } from "generated/prisma";

export namespace User {
  export type Entity = Model;
  export type Records = Model[];
  export type Optional = Partial<Model>;

  export type Include = Prisma.UserInclude;
  export type Where = Prisma.UserWhereInput;
  export type Unique = Prisma.UserWhereUniqueInput;

  export type Create = Prisma.UserCreateInput;
  export type Update = Prisma.UserUpdateInput;
};
