// eslint-disable-next-line @typescript-eslint/no-unused-vars
import NextAuth from "next-auth";
import { SessionUser } from "./session";

declare module "next-auth" {
  interface Session {
    user: SessionUser;
  }
}
