import { Prisma } from "@Database/Prisma";
import { CreateUserUseCase } from "@UseCases/Users/Create/CreateUserUseCase";
import { UpdateUserUseCase } from "@UseCases/Users/Update/UpdateUserUseCase";

const createUserUseCase = new CreateUserUseCase(Prisma);
const updateUserUseCase = new UpdateUserUseCase(Prisma);
