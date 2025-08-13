import * as yup from "yup";
import { GetClientSchema } from "./GetClientSchema";
export type GetClientQuery = yup.InferType<typeof GetClientSchema>;
