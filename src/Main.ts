import { Prisma } from "@Database/Prisma";
import { CreateUserHandler } from "@Handlers/Users/Create/CreateUserHandler";

const handler = new CreateUserHandler(Prisma);

const created = await handler.handle({
  country: "USA",
  name: "tester",
  email: "tester@example.com",
  phone: "1234567890"
});

console.log(created);
