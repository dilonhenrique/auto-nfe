import { z } from "zod";

// const peopleSchema = z.object({
//   reference: z.coerce.date(),
//   cnpj: z.string(),
// });

// const serviceSchema = z.object({
//   city: z.string(),
//   tribNac: z.string(),
//   nbs: z.string(),
// });

export const invoiceDataSchema = z.object({
  reference: z.coerce.date(),
  value: z.coerce.number(),
  pix: z.string(),
  cnpj: z.string(),
  tribNac: z.string(),
  nbs: z.string(),
  city: z.string(),
});
