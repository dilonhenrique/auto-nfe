import { InvoiceData, InvoiceUser } from "@/types/invoice";
import { formatDateToMonthYear } from "../parsers/monthYear";

export function createSubject(user: InvoiceUser, data: InvoiceData) {
  // Dilon Henrique Souza da Silva - Remuneração de Fevereiro-2025
  const date = formatDateToMonthYear(data.reference.date).replace("/", "-");

  return `${user.name} - Remuneração de ${date}`;
}
