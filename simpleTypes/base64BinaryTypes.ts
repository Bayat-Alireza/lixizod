import { z } from "zod";
import { Base64 } from "js-base64";
export const base64BinaryType = z.string().refine(Base64.isValid);
