import { PrismaAdapter } from "@next-auth/prisma-adapter";
import NextAuth, { AuthOptions } from "next-auth";
import GitHubProvider from "next-auth/providers/github";
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";
import bcryptjs from "bcryptjs";

import prisma from "@/app/libs/prismadb";

export const authOptions: AuthOptions = {
   adapter: PrismaAdapter(prisma),
   providers: [
      GitHubProvider({
         clientId: process.env.GITHUB_ID as string,
         clientSecret: process.env.GITHUB_SECRET as string,
      }),
      GoogleProvider({
         clientId: <string>process.env.GOOGLE_CLIENT_ID,
         clientSecret: <string>process.env.GOOGLE_CLIENT_SECRET,
      }),
      CredentialsProvider({
         name: "credentials",
         credentials: {
            email: { label: "email", type: "text" },
            password: { label: "password", type: "password" },
         },
         async authorize(credentials) {
            if (!credentials?.email || !credentials?.password) {
               throw new Error("Invalid credentials");
            }

            const user = await prisma.user.findUnique({
               where: {
                  email: credentials.email,
               },
            });
            if (!user || !user?.hashedPassword) {
               throw new Error("Invalid credentials");
            }

            const isCorrectPassword = await bcryptjs.compare(
               credentials.password,
               user.hashedPassword
            );

            if (!isCorrectPassword) {
               throw new Error("Invalid credentials");
            }

            return user;
         },
      }),
   ],
   pages: {
      signIn: "/",
   },
   debug: process.env.NODE_ENV === "development",
   session: {
      strategy: "jwt",
   },
   secret: process.env.NEXTAUTH_SECRET,
};

export default NextAuth(authOptions);
