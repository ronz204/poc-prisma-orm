import { Prisma } from "@Database/Prisma";
import { ListPlansUseCase } from "@UseCases/Plans/ListPlans/ListPlansUseCase";
import { UpdatePlanUseCase } from "@UseCases/Plans/UpdatePlan/UpdatePlanUseCase";
import { CreatePlanUseCase } from "@UseCases/Plans/CreatePlan/CreatePlanUseCase";
import { UpdateUserUseCase } from "@UseCases/Users/UpdateUser/UpdateUserUseCase";
import { DisableUserUseCase } from "@UseCases/Users/DisableUser/DisableUserUseCase";
import { RegisterUserUseCase } from "@UseCases/Users/RegisterUser/RegisterUserUseCase";
import { GetActiveSubsUseCase } from "@UseCases/Users/GetActiveSubs/GetActiveSubsUseCase";
import { SubscribeToPlanUseCase } from "@UseCases/Users/SubscribeToPlan/SubscribeToPlanUseCase";

const listPlansUseCase = new ListPlansUseCase(Prisma);
const updateUserUseCase = new UpdateUserUseCase(Prisma);
const createPlanUseCase = new CreatePlanUseCase(Prisma);
const updatePlanUseCase = new UpdatePlanUseCase(Prisma);
const disableUserUseCase = new DisableUserUseCase(Prisma);
const registerUserUseCase = new RegisterUserUseCase(Prisma);
const getActiveSubsUseCase = new GetActiveSubsUseCase(Prisma);
const subscribeToPlanUseCase = new SubscribeToPlanUseCase(Prisma);