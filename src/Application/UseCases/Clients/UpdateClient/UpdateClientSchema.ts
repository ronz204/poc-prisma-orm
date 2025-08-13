import * as yup from "yup";

export const UpdateClientSchema = yup.object({
  id: yup.number().integer().required(),
  name: yup.string().optional().min(4).max(50),
  email: yup.string().optional().email().max(100),
});
