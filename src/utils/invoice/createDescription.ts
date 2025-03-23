import { InvoiceData } from "@/types/invoice";
import { parseCurrency } from "../parsers/currency";
import { formatDateToMonthYear } from "../parsers/monthYear";

export function createDescription(data: Omit<InvoiceData, "email">) {
  const date = formatDateToMonthYear(data.reference);
  const value = parseCurrency(data.value);

  return `Serviços prestados em ${date} | Valor: R$ ${value} | Pix: ${data.pix}`;
}
