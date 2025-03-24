import { z } from "zod";
import { isValidDecimal } from "../validators/decimal";
import { isTribNac } from "../validators/tribNac";
import { isValidNbs } from "../validators/nbs";
import { cnpjSchema } from "./cnpj";

export const invoiceDataSchema = z.object({
  reference: z.coerce.date({ message: "Data inválida" }).max(new Date()),
  value: z
    .string()
    .min(1, "Obrigatório")
    .refine(isValidDecimal, "Valor inválido"),
  pix: z
    .string({
      required_error: "Obrigatório",
      invalid_type_error: "Chave Pix inválida",
    })
    .min(1, "Obrigatório"),
  cnpj: cnpjSchema,
  tribNac: z.object({
    id: z
      .string({
        required_error: "Obrigatório",
        invalid_type_error: "Código inválido",
      })
      .min(8, "Deve ter pelo menos 6 dígitos")
      .max(8)
      .refine(isTribNac, "Código inválido"),
    // name: z.string(),
  }),
  nbs: z
    .string()
    .min(9, "Deve ter pelo menos 9 dígitos")
    .max(9)
    .refine(isValidNbs, "Código inválido"),
  city: z.object({
    // id: z
    //   .string({
    //     required_error: "Obrigatório",
    //     invalid_type_error: "Cidade inválida",
    //   })
    //   .min(1, "Obrigatório"),
    name: z
      .string({
        required_error: "Obrigatório",
        invalid_type_error: "Cidade inválida",
      })
      .min(1, "Obrigatório"),
  }),
});
