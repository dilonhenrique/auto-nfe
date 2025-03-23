"use server";

import { ErrorCode } from "@/exceptions/errorCode";
import { InvoiceEmitter } from "@/server/clients/InvoiceEmitter/InvoiceEmitter";
import { InvoiceData, InvoiceUser } from "@/types/invoice";
import { createDescription } from "@/utils/invoice/createDescription";
import { parseCurrency } from "@/utils/parsers/currency";

type Payload = {
  user: InvoiceUser;
  invoice: Omit<InvoiceData, "email">;
};

export default async function emit({ user, invoice }: Payload) {
  const emitter = await new InvoiceEmitter().init();
  const success = await emitter.login(user);

  if (!success) return { success, error: { code: ErrorCode.UNAUTHORIZED } };

  const resume = await emitter.generate({
    people: {
      reference: invoice.reference,
      cnpj: invoice.cnpj,
    },
    service: {
      city: invoice.city,
      description: createDescription(invoice),
      tribNac: invoice.tribNac,
      nbs: invoice.nbs,
    },
    value: parseCurrency(invoice.value),
  });

  const url = await emitter.downloadLastInvoice();

  return { success: true, data: { url, resume } };
}
