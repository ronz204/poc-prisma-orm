import * as yup from "yup";
import { CreatePlanSchema } from "./CreatePlanSchema";
export type CreatePlanCommand = yup.InferType<typeof CreatePlanSchema>;
