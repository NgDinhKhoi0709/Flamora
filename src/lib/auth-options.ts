import { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { UserRole } from "@/types";

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email", placeholder: "admin@flamora.vn" },
        password: { label: "Mật khẩu", type: "password" }
      },
      async authorize(credentials) {
        // Mock authentication logic
        if (credentials?.email === "admin@flamora.vn" && credentials?.password === "Admin123!") {
          return {
            id: "1",
            name: "Flamora Admin",
            email: "admin@flamora.vn",
            role: "admin" as UserRole,
          };
        }
        
        if (credentials?.email === "user@gmail.com" && credentials?.password === "User123!") {
          return {
            id: "2",
            name: "Gia Bảo",
            email: "user@gmail.com",
            role: "user" as UserRole,
          };
        }

        return null;
      }
    })
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.role = (user as any).role;
        token.id = user.id;
      }
      return token;
    },
    async session({ session, token }) {
      if (session.user) {
        (session.user as any).role = token.role;
        (session.user as any).id = token.id;
      }
      return session;
    },
  },
  pages: {
    signIn: "/login",
  },
  session: {
    strategy: "jwt",
  },
  secret: process.env.NEXTAUTH_SECRET || "flamora_secret_key_1234567890",
};


