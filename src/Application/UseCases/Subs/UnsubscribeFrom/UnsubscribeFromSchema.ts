import * as yup from "yup";

export const UnsubscribeFromSchema = yup.object({
  sub: yup.number().required().positive(),
  client: yup.number().required().positive(),
});
