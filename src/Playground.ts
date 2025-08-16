import { Prisma } from "@Database/Prisma";

import { SubscribeToUseCase } from "@UseCases/Subs/SubscribeTo/SubscribeToUseCase";
const subscribeToUseCase = new SubscribeToUseCase(Prisma);

import { GetPlansUseCase } from "@UseCases/Plans/GetPlans/GetPlansUseCase";
const getPlansUseCase = new GetPlansUseCase(Prisma);

import { CreatePlanUseCase } from "@UseCases/Plans/CreatePlan/CreatePlanUseCase";
const createPlanUseCase = new CreatePlanUseCase(Prisma);

import { UpdatePlanUseCase } from "@UseCases/Plans/UpdatePlan/UpdatePlanUseCase";
const updatePlanUseCase = new UpdatePlanUseCase(Prisma);

import { GetClientUseCase } from "@UseCases/Clients/GetClient/GetClientUseCase";
const getClientUseCase = new GetClientUseCase(Prisma);

import { GetClientsUseCase } from "@UseCases/Clients/GetClients/GetClientsUseCase";
const getClientsUseCase = new GetClientsUseCase(Prisma);

import { CreateClientUseCase } from "@UseCases/Clients/CreateClient/CreateClientUseCase";
const createClientUseCase = new CreateClientUseCase(Prisma);

import { UpdateClientUseCase } from "@UseCases/Clients/UpdateClient/UpdateClientUseCase";
const updateClientUseCase = new UpdateClientUseCase(Prisma);
