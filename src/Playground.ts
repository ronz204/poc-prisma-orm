import { Prisma } from "@Database/Prisma";
import { GetClientUseCase } from "@UseCases/Clients/GetClient/GetClientUseCase";
import { GetClientsUseCase } from "@UseCases/Clients/GetClients/GetClientsUseCase";

const getClientUseCase = new GetClientUseCase(Prisma);
const getClientsUseCase = new GetClientsUseCase(Prisma);
