"use client";

import { invoiceActions } from "@/server/actions/invoice";
import { invoiceUserSchema } from "@/utils/schemas/invoiceUser";
import {
  addToast,
  Form,
  Input,
  PasswordInput,
  SubmitButton,
} from "@abstrato/hero-ui";
import { useSession } from "next-auth/react";
import { useState } from "react";
import PageContainer from "../../ui/PageContainer/PageContainer";

export default function InvoiceEmitScreen() {
  const session = useSession();
  const user = session.data?.user;

  const [invoiceLogged, setInvoiceLogged] = useState(false);

  return (
    <PageContainer>
      <h1>Olá, {user?.name?.split(" ")[0]}!</h1>

      {!invoiceLogged ? (
        <Form
          className="max-w-xl"
          schema={invoiceUserSchema}
          action={invoiceActions.login}
          onSuccess={(res) => {
            addToast({ title: res.message, color: "success" });
            setInvoiceLogged(true);
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
        <Form className="max-w-xl">
          <Input
            name="invoice.cnpj"
            label="CNPJ do tomador"
            defaultValue="36.396.246/0001-71"
          />
        </Form>
      )}
    </PageContainer>
  );
}
