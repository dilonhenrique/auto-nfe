import { z } from "zod";
import { cnpjSchema } from "./cnpj";

export const invoiceUserSchema = z.object({
  name: z
    .string({
      required_error: "Obrigatório",
      invalid_type_error: "Nome inválido",
    })
    .min(1, "Obrigatório"),
  cnpj: cnpjSchema,
  password: z
    .string({
      required_error: "Obrigatório",
      invalid_type_error: "Senha inválido",
    })
    .min(1, "Obrigatório"),
});
