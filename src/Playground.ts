import { Prisma } from "@Database/Prisma";
import { GetClientUseCase } from "@UseCases/Clients/GetClient/GetClientUseCase";
import { GetClientsUseCase } from "@UseCases/Clients/GetClients/GetClientsUseCase";
import { CreateClientUseCase } from "@UseCases/Clients/CreateClient/CreateClientUseCase";
import { UpdateClientUseCase } from "@UseCases/Clients/UpdateClient/UpdateClientUseCase";

const getClientUseCase = new GetClientUseCase(Prisma);
const getClientsUseCase = new GetClientsUseCase(Prisma);
const createClientUseCase = new CreateClientUseCase(Prisma);
const updateClientUseCase = new UpdateClientUseCase(Prisma);
