import * as yup from "yup";

export const SubscribePlanSchema = yup.object({
  userId: yup.number().required(),
  planId: yup.number().required(),
  autoRenew: yup.boolean().default(true),
});

export type SubscribePlanCommand = yup.InferType<typeof SubscribePlanSchema>;
