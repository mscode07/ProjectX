import db from "@repo/db/client";
import bcrypt from "bcrypt";
import { JWT } from "next-auth/jwt";

import CredentialsProvider from "next-auth/providers/credentials";
import GithubProvider from "next-auth/providers/github";
import GoogleProvider from "next-auth/providers/google";
import z from "zod";

interface credentialsTypes {
  username: string;
  password: string;
  email: string;
  name: string;
}

const userInput = z.object({
  username: z.string(),
  name: z.string(),
  email: z.string().email(),
  password: z.string(),
});

export const authOptions = {
  providers: [
    GithubProvider({
      clientId: process.env.GITHUB_ID || "",
      clientSecret: process.env.GITHUB_SECRET || "",
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID || "",
      clientSecret: process.env.GOOGLE_CLIENT_SECRET || "",
    }),

    CredentialsProvider({
      name: "Credentials",
      credentials: {
        username: { label: "Username", type: "text", placeholder: "" },
        name: { label: "Name", type: "text", placeholder: "" },
        email: { label: "Email", type: "text", placeholder: "" },
        password: { label: "Password", type: "password", placeholder: "" },
      },

      async authorize(credentials) {
        if (!credentials) return null;
        const { username, email, password, name } = credentials;

        const validatedUserInput = (creds: credentialsTypes) => {
          return userInput.safeParse({
            username: creds.username,
            email: creds.email,
            password: creds.password,
            name: creds.name,
          });
        };

        console.log(credentials, "User credentilas");

        if (!validatedUserInput) return null;

        const hashedPassword = await bcrypt.hash(credentials.password, 10);
        console.log(hashedPassword);

        const existingUser = await db.user.findFirst({
          where: {
            username: credentials.username,
            email: credentials.email,
          },
        });

        if (existingUser) {
          try {
            const passwordValidation = await bcrypt.compare(
              credentials.password,
              existingUser.password
            );
            if (passwordValidation) {
              return {
                id: existingUser?.id.toString(),
                usernname: existingUser.username,
                email: existingUser.email,
                name: existingUser.name,
              };
            }
          } catch (error) {
            console.log(error, "Error while LogIn");
          }
          return null;
        }

        try {
          const user = await db.user.create({
            data: {
              username: credentials.username,
              email: credentials.email,
              name: credentials.name,
              password: hashedPassword,
            },
          });
          return {
            id: user.id.toString(),
            name: user.name,
            username: user.username,
            email: user.email,
          };
        } catch (error) {
          console.log(error, "Not able to Create new user");
        }

        return null;
      },
    }),
  ],
  Secret: process.env.NEXTAUTH_SECRET || "secr3t",

  callbacks: {
    async jwt({ token }: { token: JWT }) {
      console.log(token, "this is the userToken");

      return token;
    },

    async session({ session, token }: any) {
      const user = await db.user.findUnique({
        where: { id: token.sub },
      });
      console.log(user, "Thsi is the user");

      if (token) {
        session.accessToken = token.accessToken;
        console.log(session.accessToken, " This is from the sesson function 1");
        session.userid = token.sub;
        console.log(session.userid, " This is from the sesson function 2");
      }
      return session;
    },
  },
  pages: {
    signIn: "/",
  },
};
