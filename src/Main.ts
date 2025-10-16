import { Prisma } from "@Database/Prisma";
import { CreateUserHandler } from "@Handlers/Users/Create/CreateUserHandler";
import { UpdateUserHandler } from "@Handlers/Users/Update/UpdateUserHandler";
import { DeleteUserHandler } from "@Handlers/Users/Delete/DeleteUserHandler";

const handler = new CreateUserHandler(Prisma);

const created = await handler.handle({
  country: "USA",
  name: "tester",
  email: "tester@example.com",
  phone: "1234567890"
});

console.log(created);
