import type { User } from "@Prisma/client";

const user: User = {
  id: 1,
  name: "Jhon Doe",
  email: "",
  password: "",
  createdAt: new Date(),
  updatedAt: new Date(),
};

console.log(user);
