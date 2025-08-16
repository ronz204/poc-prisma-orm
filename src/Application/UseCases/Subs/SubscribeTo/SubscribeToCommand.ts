import * as yup from "yup";
import { SubscribeToSchema } from "./SubscribeToSchema";
export type SubscribeToCommand = yup.InferType<typeof SubscribeToSchema>;
