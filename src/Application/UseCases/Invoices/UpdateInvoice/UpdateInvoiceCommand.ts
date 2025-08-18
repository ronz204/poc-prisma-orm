import * as yup from "yup";
import { UpdateInvoiceSchema } from "./UpdateInvoiceSchema";
export type UpdateInvoiceCommand = yup.InferType<typeof UpdateInvoiceSchema>;
