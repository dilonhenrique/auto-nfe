"use client";

import { invoiceActions } from "@/server/actions/invoice";
import { invoiceUserSchema } from "@/utils/schemas/invoiceUser";
import {
  addToast,
  Button,
  Form,
  Icon,
  Input,
  PasswordInput,
  SubmitButton,
  User,
} from "@abstrato/hero-ui";
import { signOut, useSession } from "next-auth/react";
import { useState } from "react";

export default function Page() {
  const session = useSession();
  const user = session.data?.user;

  const [invoiceLogged, setInvoiceLogged] = useState(false);

  return (
    <main className="flex flex-col gap-8 items-start p-8">
      <h1>Ola, {user?.name?.split(" ")[0]}!</h1>

      <div className="flex gap-4 items-center">
        <User
          avatarProps={{
            src: user?.image ?? undefined,
            name: user?.name ?? undefined,
          }}
          name={user?.name}
          description={user?.email}
        />

        <Button
          size="sm"
          variant="light"
          color="danger"
          onPress={() => signOut()}
          startContent={<Icon icon="log-out" size="sm" />}
        >
          Sair
        </Button>
      </div>

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
    </main>
  );
}
