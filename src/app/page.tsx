"use client";

import { Form, Input, Spinner } from "@abstrato/hero-ui";
import { useSession } from "next-auth/react";
import { z } from "zod";

export default function Page() {
  const session = useSession();

  return (
    <main className="flex flex-col gap-[32px] row-start-2 items-center sm:items-start">
      <h1>Ola mundo!</h1>

      {session.status === "loading" && <Spinner />}
      {session.data?.user?.name ?? "Não logado"}

      <Form schema={z.object({ senha: z.string().min(8) })}>
        <Input name="senha" label="Senha" />
      </Form>
    </main>
  );
}
