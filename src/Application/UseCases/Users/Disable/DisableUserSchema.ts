import * as yup from "yup";

export const DisableUserSchema = yup.object({
  id: yup.number().required(),
});

export type DisableUserCommand = yup.InferType<typeof DisableUserSchema>;
