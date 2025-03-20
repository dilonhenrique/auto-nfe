"use client";

import { ThemeProvider } from "next-themes";
import Toaster from "./Toaster";
import UIProvider from "./UIProvider";
import ProgressBar from "./ProgressBar";
import { WithChildren } from "@abstrato/hero-ui";

export function Providers({ children, }: WithChildren) {

  return (
    <ThemeProvider
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
