import { Prisma } from "@Database/Prisma";
import { GetClientsUseCase } from "@UseCases/Clients/GetClients/GetClientsUseCase";

const getClientUseCase = new GetClientsUseCase(Prisma);

const records = await getClientUseCase.execute({
  limit: 10, page: 2, order: "asc"
});

console.log(records);