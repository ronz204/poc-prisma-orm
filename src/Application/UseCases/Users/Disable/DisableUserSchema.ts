import * as yup from "yup";

export const DisableUserSchema = yup.object({
  email: yup.string().required().email().max(50),
});

export type DisableUserCommand = yup.InferType<typeof DisableUserSchema>;
