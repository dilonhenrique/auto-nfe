import { z } from "zod";

export const invoiceUserSchema = z.object({
  name: z.string(),
  cnpj: z.string(),
  password: z.string(),
});
