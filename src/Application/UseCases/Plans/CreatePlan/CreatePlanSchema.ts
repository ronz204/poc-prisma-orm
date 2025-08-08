import * as yup from "yup";

export const CreatePlanSchema = yup.object({
  name: yup.string().required().min(3).max(30),
  price: yup.number().required().min(0),
  period: yup.number().required().min(1),
  isActive: yup.boolean().default(true),
});

export type CreatePlanCommand = yup.InferType<typeof CreatePlanSchema>;
