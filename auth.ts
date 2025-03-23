import { AuthOptions } from "next-auth";
import AzureADProvider from "next-auth/providers/azure-ad";

export const authOptions: AuthOptions = {
  callbacks: {
    session({ session }) {
      return {
        ...session,
        user: session.user
          ? {
              name: session.user?.name ?? undefined,
              email: session.user?.email ?? undefined,
              image: session.user?.image ?? undefined,
            }
          : undefined,
      };
    },
  },
  providers: [
    AzureADProvider({
      clientId: process.env.AZURE_AD_CLIENT_ID!,
      clientSecret: process.env.AZURE_AD_CLIENT_SECRET!,
      tenantId: process.env.AZURE_AD_TENANT_ID!,
      authorization: {
        params: {
          scope: "openid profile email User.Read",
        },
      },
    }),
  ],
};
