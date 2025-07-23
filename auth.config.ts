import { NextAuthConfig } from "next-auth";

export const authConfig = {
  pages: {
    signIn: "/login",
  },
  callbacks: {
    authorized({ auth, request: { nextUrl } }) {
      const isLoggedIn = !!auth?.user;
      const isOnBrowse = nextUrl.pathname.startsWith("/browse");

      if (isOnBrowse) {
        if (isLoggedIn) return true;
        return false;
      } else if (isLoggedIn) {
        return Response.redirect(new URL("/browse", nextUrl));
      }

      return true;
    },
  },
  providers: [],
} satisfies NextAuthConfig;
