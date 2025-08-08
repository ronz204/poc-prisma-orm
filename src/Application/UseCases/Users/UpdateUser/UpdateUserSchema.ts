import * as yup from "yup";

export const UpdateUserSchema = yup.object({
  id: yup.number().required(),
  name: yup.string().optional().min(3).max(30),
  email: yup.string().optional().email().max(50),
  password: yup.string().optional().min(8).max(20),
  biography: yup.string().optional().max(200),
  pictureUrl: yup.string().optional().url().max(100),
});

export type UpdateUserCommand = yup.InferType<typeof UpdateUserSchema>;
