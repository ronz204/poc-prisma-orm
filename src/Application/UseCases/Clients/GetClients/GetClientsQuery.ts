import * as yup from "yup";
import { GetClientsSchema } from "./GetClientsSchema";
export type GetClientsQuery = yup.InferType<typeof GetClientsSchema>;
