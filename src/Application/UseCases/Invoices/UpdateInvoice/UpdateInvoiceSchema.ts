import * as yup from "yup";

export const UpdateInvoiceSchema = yup.object({
  id: yup.number().positive().required(),
  status: yup.string().oneOf(["paid", "pending"]).required(),
});
