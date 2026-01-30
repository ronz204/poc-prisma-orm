import { Prisma } from "@Database/Connector";
import { RetrieveCountriesSpec } from "@Handlers/Country/Retrieve/RetrieveCountriesSpec";

const spec = new RetrieveCountriesSpec({ limit: 10, offset: 0 });
const records = await Prisma.country.findMany(spec.toQuery());

