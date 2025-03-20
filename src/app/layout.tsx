import "./globals.css";
import type { Metadata } from "next";
import { Providers } from "@/lib/providers/Providers";

export const metadata: Metadata = {
  title: "Regente",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  return (
    <html lang="pt-BR" suppressHydrationWarning>
      <body className="bg-background text-foreground">
        <Providers>
          {children}
        </Providers>
      </body>
    </html>
  );
}
