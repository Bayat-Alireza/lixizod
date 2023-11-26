import { z } from "zod";
export const uniqueIDType = z.string().uuid({ message: "invalid ID" });
