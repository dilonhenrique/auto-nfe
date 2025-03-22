"use server";

import { InvoiceEmitter } from "@/server/clients/InvoiceEmitter/InvoiceEmitter";
import { InvoiceUser } from "@/types/invoice";

export default async function login(user: InvoiceUser) {
  const emitter = await new InvoiceEmitter().init();
  const success = await emitter.login(user);

  return { success };
}
