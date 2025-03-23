import { z } from "zod";
import { isValidDecimal } from "../validators/decimal";
import { parseDecimal } from "../parsers/decimal";
import { isTribNac } from "../validators/tribNac";
import { isValidNbs } from "../validators/nbs";
import { cnpjSchema } from "./cnpj";

export const invoiceDataSchema = z.object({
  reference: z.coerce.date({ message: "Data inválida" }).max(new Date()),
  value: z
    .string()
    .min(1, "Obrigatório")
    .refine(isValidDecimal, "Valor inválido")
    .transform(parseDecimal),
  pix: z
    .string({
      required_error: "Obrigatório",
      invalid_type_error: "Chave Pix inválida",
    })
    .min(1, "Obrigatório"),
  cnpj: cnpjSchema,
  tribNac: z
    .string()
    .min(8, "Deve ter pelo menos 6 dígitos")
    .max(8)
    .refine(isTribNac, "Código inválido"),
  nbs: z
    .string()
    .min(9, "Deve ter pelo menos 9 dígitos")
    .max(9)
    .refine(isValidNbs, "Código inválido"),
  city: z
    .string({
      required_error: "Obrigatório",
      invalid_type_error: "Cidade inválida",
    })
    .min(1, "Obrigatório"),
});
