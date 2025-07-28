import * as yup from "yup";
import { CreateUserSchema } from "./CreateUserSchema";
export type CreateUserCommand = yup.InferType<typeof CreateUserSchema>;
