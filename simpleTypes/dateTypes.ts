import { z } from "zod";
export const dateType = z
  .string()
  .regex(
    /^-?([1-9][0-9]{3,}|0[0-9]{3})-(0[1-9]|1[0-2])-(0[1-9]|[12][0-9]|3[01])(Z|(\+|-)((0[0-9]|1[0-3]):[0-5][0-9]|14:00))?$/,
    'Not a valid "date" with optional timezone or offset'
  );
