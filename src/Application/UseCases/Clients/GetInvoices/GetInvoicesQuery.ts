import * as yup from "yup";
import { GetInvoicesSchema } from "./GetInvoicesSchema";
export type GetInvoicesQuery = yup.InferType<typeof GetInvoicesSchema>;
