import NextAuth from "next-auth";

declare module "next-auth" {
  interface Session {
    accessToken: string | unknown;
    user: {
      id: string | unknown;
    } & DefaultSession["user"];
  }
}
