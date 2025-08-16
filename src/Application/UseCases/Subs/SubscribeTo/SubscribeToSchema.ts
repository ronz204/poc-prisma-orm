import * as yup from "yup";

export const SubscribeToSchema = yup.object({
  autoRenew: yup.boolean().required(),
  plan: yup.number().required().positive(),
  client: yup.number().required().positive(),
});
