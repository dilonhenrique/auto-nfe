import { z } from "zod";
import { isValidDecimal } from "../validators/decimal";
import { parseDecimal } from "../parsers/decimal";
import { isTribNac } from "../validators/tribNac";
import { isValidNbs } from "../validators/nbs";
import { cnpjSchema } from "./cnpj";

export const invoiceDataSchema = z.object({
  reference: z.coerce.date().max(new Date()),
  value: z.string().refine(isValidDecimal).transform(parseDecimal),
  pix: z.string(),
  cnpj: cnpjSchema,
  tribNac: z.string().min(8).max(8).refine(isTribNac),
  nbs: z.string().min(9).max(9).refine(isValidNbs),
  city: z.string(),
});
