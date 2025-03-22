"use client";

import { invoiceActions } from "@/server/actions/invoice";
import { invoiceUserSchema } from "@/utils/schemas/invoiceUser";
import {
  Button,
  Form,
  Icon,
  Input,
  PasswordInput,
  SubmitButton,
  User,
} from "@abstrato/hero-ui";
import { signOut, useSession } from "next-auth/react";

export default function Page() {
  const session = useSession();

  const user = session.data?.user;

  return (
    <main className="flex flex-col gap-[32px] row-start-2 items-center sm:items-start">
      <h1>Ola, {user?.name}!</h1>

      <User
        avatarProps={{
          src: user?.image ?? undefined,
          name: user?.name ?? undefined,
        }}
        name={user?.name}
        description={user?.email}
      />

      <Button
        onPress={() => signOut()}
        startContent={<Icon icon="log-out" size="sm" />}
      >
        Sair
      </Button>

      <Form schema={invoiceUserSchema} action={invoiceActions.login}>
        <Input name="name" label="Nome completo" />
        <Input name="cnpj" label="Seu CNPJ" />
        <PasswordInput name="password" label="Senha da NFe" />

        <SubmitButton color="primary" disabledWhenNotValid>
          Entrar
        </SubmitButton>
      </Form>
    </main>
  );
}
