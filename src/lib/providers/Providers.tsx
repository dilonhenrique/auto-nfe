"use client";

import { ThemeProvider } from "next-themes";
import Toaster from "./Toaster";
import UIProvider from "./UIProvider";
import ProgressBar from "./ProgressBar";
import { WithChildren } from "@abstrato/hero-ui";
import { SessionProvider } from "next-auth/react";
import { Session } from "next-auth";

type Props = WithChildren & {
  session: Session | null;
};

export function Providers({ children, session }: Props) {
  return (
    <SessionProvider session={session}>
      <ThemeProvider defaultTheme="light" attribute="class">
        <UIProvider locale="pt-BR">
          {children}
          <Toaster />
          <ProgressBar />
        </UIProvider>
      </ThemeProvider>
    </SessionProvider>
  );
}
