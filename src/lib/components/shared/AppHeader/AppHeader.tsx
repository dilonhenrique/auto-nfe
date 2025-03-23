"use client";

import { Button, Icon, User } from "@abstrato/hero-ui";
import { signOut, useSession } from "next-auth/react";

export default function AppHeader() {
  const session = useSession();
  const user = session.data?.user;

  return (
    <header className="flex gap-4 items-center px-8 py-4 w-full h-full bg-content2 sticky top-0">
      <h2>Emissor de NFe</h2>

      <div className="flex gap-4 items-center ms-auto">
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
    </header>
  );
}
