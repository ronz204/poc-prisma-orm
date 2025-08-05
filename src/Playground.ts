import { Prisma } from "@Database/Prisma";
import { CreateUserUseCase } from "@UseCases/Users/Create/CreateUserUseCase";
import { UpdateUserUseCase } from "@UseCases/Users/Update/UpdateUserUseCase";
import { CreatePlanUseCase } from "@UseCases/Plans/Create/CreatePlanUseCase";
import { UpdatePlanUseCase } from "@UseCases/Plans/Update/UpdatePlanUseCase";
import { DisableUserUseCase } from "@UseCases/Users/Disable/DisableUserUseCase";
import { GetActiveSubsUseCase } from "@UseCases/Users/GetActiveSubs/GetActiveSubsUseCase";

const createUserUseCase = new CreateUserUseCase(Prisma);
const updateUserUseCase = new UpdateUserUseCase(Prisma);
const createPlanUseCase = new CreatePlanUseCase(Prisma);
const updatePlanUseCase = new UpdatePlanUseCase(Prisma);
const disableUserUseCase = new DisableUserUseCase(Prisma);
const getActiveSubsUseCase = new GetActiveSubsUseCase(Prisma);
