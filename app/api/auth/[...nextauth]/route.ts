import authService from "@/services/auth/Service";
import NextAuth, { User } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { User } from "@/model/User";

export const authOptions = {
  providers: [
    CredentialsProvider({
      name: "credentials",
      credentials: {
        email: { label: "Email", type: "email", placeholder: "jsmith@gmail.com" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials: { email: string; password: string }): Promise<User | null> {
        try {
          console.log("Credentials:", credentials);
          const user = await authService.findUserByEmail(credentials?.email);
          if (!user) {
            throw new Error("No user found with the provided email");
          }
          const isValid = await authService.validateUser(user, credentials?.password);
          if (!isValid) {
            throw new Error("Invalid password");
          }
          return user;
        } catch (error) {
          return null; // if login fails
        }
      },
    }),
  ],
  session: {
    strategy: "jwt",
  },
  pages: {
    signIn: "/login",
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) token.user = user;
      return token;
    },
    async session({ session, token }) {
      session.user = token.user;
      return session;
    },
  },
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
