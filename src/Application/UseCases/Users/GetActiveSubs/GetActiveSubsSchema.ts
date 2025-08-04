import * as yup from "yup";

export const GetActiveSubsSchema = yup.object({
  email: yup.string().required().email().max(50),
});

export type GetActiveSubsQuery = yup.InferType<typeof GetActiveSubsSchema>;
