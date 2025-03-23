import { z } from "zod";
import { isValidCNPJ } from "../validators/cnpj";

export const cnpjSchema = z.string().refine(isValidCNPJ, "CNPJ inválido");
