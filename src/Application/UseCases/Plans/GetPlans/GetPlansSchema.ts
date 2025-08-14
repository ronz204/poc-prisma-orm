import * as yup from "yup";

export const GetPlansSchema = yup.object({
  page: yup.number().integer().min(1).default(1),
  limit: yup.number().integer().min(1).max(10).default(5),
  order: yup.string().oneOf(["asc", "desc"]).default("asc"),
});
