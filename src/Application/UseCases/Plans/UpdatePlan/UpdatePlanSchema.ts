import * as yup from "yup";

export const UpdatePlanSchema = yup.object({
  id: yup.number().required(),
  name: yup.string().min(3).max(30),
  price: yup.number().min(0),
  period: yup.number().min(1),
  isActive: yup.boolean().default(true),
});

export type UpdatePlanCommand = yup.InferType<typeof UpdatePlanSchema>;
