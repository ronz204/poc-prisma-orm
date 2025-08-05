import * as yup from "yup";

export const GetActiveSubsSchema = yup.object({
  id: yup.number().required(),
});

export type GetActiveSubsQuery = yup.InferType<typeof GetActiveSubsSchema>;
