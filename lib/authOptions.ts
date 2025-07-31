import type { NextAuthOptions, RequestInternal, Session } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import authService from "@/services/auth/Service";

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(
        credentials: Record<"email" | "password", string> | undefined,
        req: Pick<RequestInternal, "body" | "query" | "headers" | "method">
      ) {
        if (!credentials) return null;
        const user = await authService.findUserByEmail(credentials?.email);
        if (!user) return null;
        const isValid = await authService.validateUser(user, credentials?.password);
        return isValid ? user : null;
      },
    }),
  ],
  session: { strategy: "jwt" },
  callbacks: {
    async jwt({ token, user }) {
      if (user) token.user = user;
      return token;
    },
    async session({ session, token }) {
      session.user = token.user as typeof session.user;
      return session;
    },
  },
};
