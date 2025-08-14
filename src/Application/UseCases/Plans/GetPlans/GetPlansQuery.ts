import * as yup from "yup";
import { GetPlansSchema } from "./GetPlansSchema";
export type GetPlansQuery = yup.InferType<typeof GetPlansSchema>;
