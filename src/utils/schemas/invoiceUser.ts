import { z } from "zod";
import { cnpjSchema } from "./cnpj";

export const invoiceUserSchema = z.object({
  name: z.string(),
  cnpj: cnpjSchema,
  password: z.string(),
});
