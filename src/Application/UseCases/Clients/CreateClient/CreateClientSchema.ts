import * as yup from "yup";

export const CreateClientSchema = yup.object({
  name: yup.string().required().min(4).max(50),
  email: yup.string().email().required().max(100),
});
