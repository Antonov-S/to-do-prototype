import NextAuth from "next-auth";
import { DrizzleAdapter } from "@auth/drizzle-adapter";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcrypt";

import { db } from "./db";
import { passwordToSalt } from "./utils/password-to-salt";
import { getUserFromDb } from "./utils/get-user-from-db";
import { addUserToDb } from "./utils/add-user-to-db";

export const {
  handlers: { GET, POST },
  auth
} = NextAuth({
  adapter: DrizzleAdapter(db),
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        username: { label: "Username", type: "text", placeholder: "jsmith" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials, req) {
        let user = null;
        const username = credentials.username as string;
        const password = credentials.password as string;

        if (!username || !password) {
          return null;
        }

        user = await getUserFromDb(username);

        if (user) {
          if (!user.password) {
            return null;
          }
          const isAuthenticated = await bcrypt.compare(password, user.password);
          if (isAuthenticated) {
            return user;
          } else {
            return null;
          }
        }

        if (!user) {
          const saltedPassword = passwordToSalt(password);
          user = await addUserToDb(username, saltedPassword);
        }

        if (!user) {
          throw new Error("User was not found and could not be created");
        }

        return user;
      }
    })
  ],
  callbacks: {
    async session({ session, user, token }: any) {
      session.user.id = token.sub;
      return session;
    }
  },
  session: {
    strategy: "jwt"
  }
});
