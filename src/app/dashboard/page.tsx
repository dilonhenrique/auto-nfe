"use client";

import { Button } from "@abstrato/hero-ui";
import { signOut, useSession } from "next-auth/react";

export default function Page() {
  const session = useSession();

  return (
    <main className="flex flex-col gap-[32px] row-start-2 items-center sm:items-start">
      <h1>Você adivinhou a senha!</h1>

      <p>{session.data?.user?.name}</p>

      <Button onPress={() => signOut()}>Sair</Button>
    </main>
  );
}
