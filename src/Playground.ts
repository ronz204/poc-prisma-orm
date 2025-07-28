import { Prisma } from "@Database/Prisma";
import { CreateUserUseCase } from "@UseCases/Users/Create/CreateUserUseCase";

const createUserUseCase = new CreateUserUseCase(Prisma);
/* const response = await createUserUseCase.execute({
  name: "John Doe",
  email: "john.doe@example.com",
  password: "securepassword",
  biography: "Hello, I'm John!",
  pictureUrl: "http://example.com/john.jpg"
}); */
