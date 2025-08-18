import * as yup from "yup";

export const GetInvoicesSchema = yup.object({
  page: yup.number().integer().min(1).default(1),
  client: yup.number().integer().positive().required(),
  limit: yup.number().integer().min(1).max(15).default(10),
});
