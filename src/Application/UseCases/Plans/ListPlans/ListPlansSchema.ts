import * as yup from "yup";

export const ListPlansSchema = yup.object({
  page: yup.number().integer().min(1).default(1),
  limit: yup.number().integer().min(1).max(15).default(10),
  order: yup.string().oneOf(["asc", "desc"]).default("asc"),
});

export type ListPlansQuery = yup.InferType<typeof ListPlansSchema>;
