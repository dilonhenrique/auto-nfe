"use client";

import { Button, Icon, Tooltip, User } from "@abstrato/hero-ui";
import { signOut, useSession } from "next-auth/react";

export default function AppHeader() {
  const session = useSession();
  const user = session.data?.user;

  return (
    <header className="flex gap-4 items-center px-4 sm:px-8 py-4 w-full h-full bg-primary text-primary-foreground sticky top-0 z-20">
      <h2 className="text-title-lg sm:text-title-2xl !font-bold">
        Emissor de NFe
      </h2>

      <div className="flex gap-2 sm:gap-4 items-center ms-auto">
        <User
          classNames={{
            wrapper: "hidden sm:inline-flex",
            description: "text-current opacity-70",
          }}
          avatarProps={{
            src: user?.image,
            name: user?.name,
          }}
          name={user?.name}
          description={user?.email}
        />

        <Tooltip content="Sair" classNames={{ base: "pointer-events-none" }}>
          <Button
            variant="light"
            onPress={() => signOut()}
            startContent={<Icon icon="log-out" size="sm" />}
            isIconOnly
            className="-me-2 text-current"
          />
        </Tooltip>
      </div>
    </header>
  );
}
