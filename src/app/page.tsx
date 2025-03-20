"use client";

import { Form, Input } from "@abstrato/hero-ui";
import { z } from "zod";

export default function Home() {
  return (
    <main className="flex flex-col gap-[32px] row-start-2 items-center sm:items-start">
      <h1>Ola mundo!</h1>

      <Form schema={z.object({ senha: z.string().min(8) })}>
        <Input name="senha" label="Senha" />
      </Form>
    </main>
  );
}
