import * as yup from "yup";
import { UpdatePlanSchema } from "./UpdatePlanSchema";
export type UpdatePlanCommand = yup.InferType<typeof UpdatePlanSchema>;
