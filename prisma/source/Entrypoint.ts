import { Prisma } from "@Database/context";
import type { Country } from "@Types/country";

const data: Country.Create[] = [
  { name: "United States", code: "US" },
];

const created = await Prisma.country.createMany({ data });
console.log(created.count);
