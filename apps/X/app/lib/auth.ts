import db from "@repo/db/client";
import bcrypt from "bcrypt";
import { JWT } from "next-auth/jwt";
import CredentialsProvider from "next-auth/providers/credentials";
import GithubProvider from "next-auth/providers/github";
import GoogleProvider from "next-auth/providers/google";
import { signOut } from "next-auth/react";
import z from "zod";

interface credentialsTypes {
  username: string;
  password: string;
  email: string;
  name: string;
}

const userInput = z.object({
  username: z.string(),
  name: z.string().optional(),
  email: z.string().email().optional(),
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
        const validationResult = validatedUserInput(credentials);
        if (!validationResult.success) {
          console.log("Validation failed", validationResult.error);
          return null;
        }
        if (!validatedUserInput) return null;

        const hashedPassword = await bcrypt.hash(credentials.password, 10);

        const existingUser = await db.user.findFirst({
          where: {
            username: credentials.username,
            // email: credentials.email,
          },
        });

        if (existingUser) {
          try {
            const passwordValidation = await bcrypt.compare(
              credentials.password,
              existingUser.password
            );
            if (passwordValidation) {
              console.log("This is userEmail", existingUser.email);
              console.log("This is username", existingUser.username);
              return {
                id: existingUser?.id.toString(),
                usernname: existingUser.username,
                email: existingUser.email,
                name: existingUser.name,
              };
            } else {
              console.log("Invalid password for existing user");
            }
            console.log("This is name", existingUser.name);
          } catch (error) {
            console.log("Error while LogIn", error);
          }
          return null;
        }

        try {
          console.log("Creating New User....");

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
    async jwt({ token, user }: any) {
      if (user) {
        token.id = user.id;
        token.username = user.username;
        token.email = user.email;
      }
      return token;
    },
    async session({ session, token }: any) {
      // const user = await db.user.findUnique({
      //   where: { id: token.sub },
      // });

      if (token && session.user) {
        session.user.id = token.id || null;
        session.user.username = token.username || null;
        session.user.email = token.email || null;
      }
      return session;
    },
  },
  pages: {
    signIn: "/signin",
    error: "/error",
    signOut: "/signin",
  },
};
