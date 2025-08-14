import * as yup from "yup";

export const UpdatePlanSchema = yup.object({
  id: yup.number().required().positive(),
  price: yup.number().optional().positive(),
  name: yup.string().optional().min(4).max(50),
  period: yup.number().optional().oneOf([7, 30, 365])
});
