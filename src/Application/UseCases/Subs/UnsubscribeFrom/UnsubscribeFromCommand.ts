import * as yup from "yup";
import { UnsubscribeFromSchema } from "./UnsubscribeFromSchema";
export type UnsubscribeFromCommand = yup.InferType<typeof UnsubscribeFromSchema>;
