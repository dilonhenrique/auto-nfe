import "./globals.css";
import type { Metadata } from "next";
import { Providers } from "@/lib/providers/Providers";
import { getServerSession } from "next-auth";
import { authOptions } from "../../auth";

export const metadata: Metadata = {
  title: "Auto NFe",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await getServerSession(authOptions);

  return (
    <html lang="pt-BR" suppressHydrationWarning>
      <body className="bg-background text-foreground">
        <Providers session={session}>{children}</Providers>
      </body>
    </html>
  );
}
