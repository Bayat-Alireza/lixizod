import {z} from 'zod'
export const gYearType = z.string().regex(/^-?([1-9][0-9]{3,}|0[0-9]{3})(Z|(\+|-)((0[0-9]|1[0-3]):[0-5][0-9]|14:00))?$/, 'Not a valid "gYear" with optional timezone or offset')
          