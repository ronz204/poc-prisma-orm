import { Prisma } from "@Database/Connector";
import type { Country } from "@Database/Types/Country";

const data: Country.Create[] = [
  { name: "United States", code: "US" },
];

const created = await Prisma.country.createMany({ data });
console.log(created.count);
