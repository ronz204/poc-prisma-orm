import { Prisma } from "@Prisma/client";
import type { Country } from "@Prisma/client";

export namespace Country {
  export type Entity = Country;
  export type Records = Entity[];
  export type Null = Partial<Entity>;

  export type Select = Prisma.CountrySelect;
  export type Include = Prisma.CountryInclude;
  export type Where = Prisma.CountryWhereInput;
  
  export type Create = Prisma.CountryCreateInput;
  export type Update = Prisma.CountryUpdateInput;
};
