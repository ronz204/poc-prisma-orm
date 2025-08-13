import * as yup from "yup";
import { UpdateClientSchema } from "./UpdateClientSchema";
export type UpdateClientCommand = yup.InferType<typeof UpdateClientSchema>;