import { Prisma } from "@Database/Prisma";
import { GetPlansUseCase } from "@UseCases/Plans/GetPlans/GetPlansUseCase";
import { GetClientUseCase } from "@UseCases/Clients/GetClient/GetClientUseCase";
import { CreatePlanUseCase } from "@UseCases/Plans/CreatePlan/CreatePlanUseCase";
import { GetClientsUseCase } from "@UseCases/Clients/GetClients/GetClientsUseCase";
import { CreateClientUseCase } from "@UseCases/Clients/CreateClient/CreateClientUseCase";
import { UpdateClientUseCase } from "@UseCases/Clients/UpdateClient/UpdateClientUseCase";

const getPlansUseCase = new GetPlansUseCase(Prisma);
const getClientUseCase = new GetClientUseCase(Prisma);
const getClientsUseCase = new GetClientsUseCase(Prisma);
const createPlanUseCase = new CreatePlanUseCase(Prisma);
const createClientUseCase = new CreateClientUseCase(Prisma);
const updateClientUseCase = new UpdateClientUseCase(Prisma);
