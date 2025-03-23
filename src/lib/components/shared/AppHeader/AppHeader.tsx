"use client";

import { Button, Icon, Tooltip, User } from "@abstrato/hero-ui";
import { signOut, useSession } from "next-auth/react";

export default function AppHeader() {
  const session = useSession();
  const user = session.data?.user;

  return (
    <header className="flex gap-4 items-center px-4 sm:px-8 py-4 w-full h-full bg-content2 sticky top-0">
      <h2 className="text-title-lg sm:text-title-2xl !font-bold">
        Emissor de NFe
      </h2>

      <div className="flex gap-2 sm:gap-4 items-center ms-auto">
        <User
          classNames={{ wrapper: "hidden sm:inline-flex" }}
          avatarProps={{
            src: user?.image ?? undefined,
            name: user?.name ?? undefined,
          }}
          name={user?.name}
          description={user?.email}
        />

        <Tooltip
          content="Sair"
          color="danger"
          classNames={{ base: "pointer-events-none" }}
        >
          <Button
            variant="light"
            color="danger"
            onPress={() => signOut()}
            startContent={<Icon icon="log-out" size="sm" />}
            isIconOnly
            className="-me-2"
          />
        </Tooltip>
      </div>
    </header>
  );
}
