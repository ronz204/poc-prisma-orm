import { Prisma } from "@Database/Prisma";
import { ListPlansUseCase } from "@UseCases/Plans/List/ListPlansUseCase";
import { UpdateUserUseCase } from "@UseCases/Users/Update/UpdateUserUseCase";
import { CreatePlanUseCase } from "@UseCases/Plans/Create/CreatePlanUseCase";
import { UpdatePlanUseCase } from "@UseCases/Plans/Update/UpdatePlanUseCase";
import { DisableUserUseCase } from "@UseCases/Users/Disable/DisableUserUseCase";
import { RegisterUserUseCase } from "@UseCases/Users/RegisterUser/RegisterUserUseCase";
import { GetActiveSubsUseCase } from "@UseCases/Users/GetActiveSubs/GetActiveSubsUseCase";

const listPlansUseCase = new ListPlansUseCase(Prisma);
const updateUserUseCase = new UpdateUserUseCase(Prisma);
const createPlanUseCase = new CreatePlanUseCase(Prisma);
const updatePlanUseCase = new UpdatePlanUseCase(Prisma);
const disableUserUseCase = new DisableUserUseCase(Prisma);
const registerUserUseCase = new RegisterUserUseCase(Prisma);
const getActiveSubsUseCase = new GetActiveSubsUseCase(Prisma);
