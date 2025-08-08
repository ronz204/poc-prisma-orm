import * as yup from "yup";

export const SubscribeToPlanSchema = yup.object({
  userId: yup.number().required(),
  planId: yup.number().required(),
  autoRenew: yup.boolean().default(true),
});

export type SubscribeToPlanCommand = yup.InferType<typeof SubscribeToPlanSchema>;
