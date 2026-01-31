import { Prisma } from "@Database/Connector";
import { RetrieveCountriesHandler } from "@Handlers/Country/Exports";

const handler = new RetrieveCountriesHandler(Prisma);
const records = await handler.handle({});
console.log(records[0]?.code);
