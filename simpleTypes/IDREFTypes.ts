import { z } from "zod";
export const referenceType = z.string().uuid({ message: "invalid IDREF" });
