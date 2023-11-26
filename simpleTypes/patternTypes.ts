import { z } from "zod";
export const abnPattern = z.string().regex(new RegExp('"d{11}"'));
export const arbnPattern = z.string().regex(new RegExp('"d{9}"'));
export const aubicPattern = z.string().regex(new RegExp('"d{5}"'));
export const auPostCodePattern = z.string().regex(new RegExp('"d{4}"'));
export const bsbPattern = z.string().regex(new RegExp('"d{6}"'));
export const dayOfMonthPattern = z
  .string()
  .regex(new RegExp('"0?[1-9]|[12][0-9]|3[01]"'));
export const acnPattern = z.string().regex(new RegExp('"d{9}"'));
export const ipv4addressPattern = z
  .string()
  .regex(new RegExp('"d{1,3}.d{1,3}.d{1,3}.d{1,3}"'));
export const ipv6addressPattern = z
  .string()
  .regex(new RegExp('"([A-Fa-f0-9]{0,4}:){1,7}[A-Fa-f0-9]{0,4}"'));
export const irdNumberPattern = z.string().regex(new RegExp('"d{8,9}"'));
export const nzbicPattern = z.string().regex(new RegExp('"[A-z]d{6}"'));
export const nzbnPattern = z.string().regex(new RegExp('"d{13}"'));
export const mediaTypePattern = z
  .string()
  .regex(new RegExp('"[A-z]*/[0-9A-z.-+]*"'));
export const nzPostCodePattern = z.string().regex(new RegExp('"d{4}"'));
export const urlPattern = z.string().regex(new RegExp('".+..+"'));
export const gicsCodePattern = z
  .string()
  .regex(new RegExp('"d{2}(d{2})?(d{2})?(d{2})?"'));
export const emailPattern = z.string().regex(new RegExp('".+@.+..+"'));
export const visaSubclassCodePattern = z
  .string()
  .regex(new RegExp('"d{3}[A-z]?"'));
export const arsnPattern = z.string().regex(new RegExp('"d{9}"'));
