import { Prisma } from "@Database/Prisma";
import { CreateUserUseCase } from "@UseCases/Users/Create/CreateUserUseCase";

const createUserUseCase = new CreateUserUseCase(Prisma);