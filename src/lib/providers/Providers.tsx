"use client";

import { ThemeProvider } from "next-themes";
import { getLocalTimeZone } from "@internationalized/date";

import Toaster from "./Toaster";
import UIProvider from "./UIProvider";
import ProgressBar from "./ProgressBar";
import { WithChildren } from "@abstrato/hero-ui";

export function Providers({ children, }: WithChildren) {
  const timezone = getLocalTimeZone();

  return (
    <ThemeProvider
      storageKey="topfans-theme"
      defaultTheme="light"
      attribute="class"
    >
      <UIProvider locale="pt-BR">
        {children}
        <Toaster />
        <ProgressBar />
      </UIProvider>
    </ThemeProvider>
  );
}
