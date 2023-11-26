import { z } from "zod";
export const dateTimeType = z.string().datetime({ offset: true });
