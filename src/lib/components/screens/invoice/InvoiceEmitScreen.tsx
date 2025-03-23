"use client";

import { invoiceActions } from "@/server/actions/invoice";
import { invoiceUserSchema } from "@/utils/schemas/invoiceUser";
import {
  addToast,
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

export default function InvoiceEmitScreen() {
  const session = useSession();
  const user = session.data?.user;

  const [loggedUser, setLoggedUser] = useState<InvoiceUser>();

  return (
    <PageContainer>
      <h1>Olá, {user?.name?.split(" ")[0]}!</h1>

      {!loggedUser ? (
        <Form
          className="max-w-xl"
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
          <Input name="cnpj" label="Seu CNPJ" />
          <PasswordInput name="password" label="Senha da NFe" />

          <SubmitButton color="primary" disabledWhenNotValid>
            Entrar
          </SubmitButton>
        </Form>
      ) : (
        <Form
          className="max-w-xl"
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
            defaultValue="36.396.246/0001-71"
          />
          <DatePicker name="reference" label="Data de referência" />

          <Input name="city" label="Cidade" />
          <Input
            name="tribNac"
            inputMode="decimal"
            label="Tributação Nacional"
          />
          <Input name="nbs" inputMode="decimal" label="Código NBS" />

          <Input name="pix" label="Chave PIX" />
          <Input name="value" inputMode="decimal" label="Valor da Nota" />

          <SubmitButton color="primary">Emitir Nota Fiscal</SubmitButton>
        </Form>
      )}
    </PageContainer>
  );
}
