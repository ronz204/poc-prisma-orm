import * as yup from "yup";

export const GetClientSchema = yup.object({
  id: yup.number().integer().required(),
});
