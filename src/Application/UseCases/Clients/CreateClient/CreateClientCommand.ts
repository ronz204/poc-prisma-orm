import * as yup from "yup";
import { CreateClientSchema } from "./CreateClientSchema";
export type CreateClientCommand = yup.InferType<typeof CreateClientSchema>;
