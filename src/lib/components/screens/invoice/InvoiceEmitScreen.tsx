"use client";

import { invoiceActions } from "@/server/actions/invoice";
import { invoiceUserSchema } from "@/utils/schemas/invoiceUser";
import {
  addToast,
  cn,
  DatePicker,
  Form,
  Input,
  PasswordInput,
  SubmitButton,
} from "@abstrato/hero-ui";
import { useSession } from "next-auth/react";
import { useState } from "react";
import PageContainer from "../../ui/PageContainer/PageContainer";
import { InvoiceUser } from "@/types/invoice";
import { invoiceDataSchema } from "@/utils/schemas/invoiceData";
import { now, getLocalTimeZone } from "@internationalized/date";

export default function InvoiceEmitScreen() {
  const session = useSession();
  const user = session.data?.user;

  const [loggedUser, setLoggedUser] = useState<InvoiceUser>();

  return (
    <PageContainer>
      <h1>Olá, {user?.name?.split(" ")[0]}!</h1>

      <Form
        className={cn("max-w-xl", loggedUser && "hidden")}
        schema={invoiceUserSchema}
        action={invoiceActions.login}
        onSuccess={(res) => {
          addToast({ title: res.message, color: "success" });
          setLoggedUser(res.data);
        }}
        onError={({ response }) => {
          addToast({ title: response?.message, color: "danger" });
        }}
      >
        <Input
          name="name"
          label="Nome completo"
          defaultValue={user?.name ?? undefined}
        />
        <Input
          name="cnpj"
          label="Seu CNPJ"
          mask={{ mask: "00.000.000/0000-00" }}
          defaultValue={process.env.NEXT_PUBLIC_USER_CNPJ}
        />
        <PasswordInput
          name="password"
          label="Senha da NFe"
          defaultValue={process.env.NEXT_PUBLIC_USER_PASS}
        />

        <SubmitButton color="primary" disabledWhenNotValid>
          Entrar
        </SubmitButton>
      </Form>

      <Form
        className={cn("max-w-xl", !loggedUser && "hidden")}
        schema={invoiceDataSchema}
        action={(payload) => {
          return invoiceActions.emit({ user: loggedUser, invoice: payload });
        }}
        onSuccess={(res) => {
          console.log(res);
          addToast({ title: res.message, color: "success" });
        }}
        onError={({ response }) => {
          console.log(response);
          addToast({ title: response?.message, color: "danger" });
        }}
      >
        <Input
          name="cnpj"
          inputMode="decimal"
          label="CNPJ do tomador"
          mask={{ mask: "00.000.000/0000-00" }}
          defaultValue={process.env.NEXT_PUBLIC_INVOICE_DEFAULT_CNPJ}
        />
        <DatePicker
          name="reference"
          label="Data de referência"
          maxValue={now(getLocalTimeZone())}
        />

        <Input
          name="city"
          label="Cidade"
          defaultValue={process.env.NEXT_PUBLIC_INVOICE_DEFAULT_CITY}
        />
        <Input
          name="tribNac"
          inputMode="decimal"
          label="Tributação Nacional"
          mask={{ mask: "00.00.00" }}
          defaultValue={process.env.NEXT_PUBLIC_INVOICE_DEFAULT_TRIBNAC}
        />
        <Input
          name="nbs"
          inputMode="decimal"
          label="Código NBS"
          mask={{ mask: "000000000" }}
          defaultValue={process.env.NEXT_PUBLIC_INVOICE_DEFAULT_NBS}
        />

        <Input
          name="pix"
          label="Chave PIX"
          defaultValue={process.env.NEXT_PUBLIC_INVOICE_DEFAULT_PIX}
        />
        <Input
          name="value"
          inputMode="decimal"
          label="Valor da Nota"
          defaultValue={process.env.NEXT_PUBLIC_INVOICE_DEFAULT_VALUE}
        />

        <SubmitButton color="primary">Emitir Nota Fiscal</SubmitButton>
      </Form>
    </PageContainer>
  );
}
