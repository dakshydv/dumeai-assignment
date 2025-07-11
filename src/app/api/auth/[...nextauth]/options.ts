import { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcrypt";
import { DbConnect } from "@/lib/utils";
import { UserModel } from "@/models/model";
import { AuthUser, UserCredentials } from "@/lib/utils";

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      id: "credentials",
      name: "Credentials",
      credentials: {
        username: { label: "Username", type: "text", placeholder: "mark" },
        password: { label: "Password", type: "password" },
      },
      async authorize(
        credentials: UserCredentials | undefined
      ): Promise<AuthUser | null> {
        await DbConnect();
        try {
          if (!credentials?.username || !credentials.password) {
            throw new Error("please fill all the fields");
          }
          const user = await UserModel.findOne({
            username: credentials?.username,
          });
          if (!user) {
            throw new Error("no user found with this username");
          }

          const isPasswordCorrect = await bcrypt.compare(
            credentials?.password,
            user.password
          );

          if (!isPasswordCorrect) {
            throw new Error("password is incorrect");
          }

          return user;
        } catch (error) {
          const err = error as Error;
          throw new Error(err.message);
        }
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.email = user.email;
        token.name = user.name;
      }
      return token;
    },
    async session({ session, token }) {
      if (token) {
        session.user.id = token.id;
        session.user.email = token.email;
        session.user.name = token.name;
      }
      return session;
    },
    async redirect({baseUrl}) {
        return `${baseUrl}/dashboard`
    },
  },
  session: {
    strategy: "jwt",
    maxAge: 24 * 60 * 60,
    updateAge: 60 * 60,
  },
  jwt: {
    maxAge: 24 * 60 * 60,
  },
  secret: process.env.NEXTAUTH_SECRET,
};
