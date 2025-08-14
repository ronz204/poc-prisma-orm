import * as yup from "yup";

export const CreatePlanSchema = yup.object({
  price: yup.number().required().positive(),
  name: yup.string().required().min(4).max(50),
  period: yup.number().required().oneOf([7, 30, 365])
});
