import db from "@repo/db/client";
import bcrypt from "bcrypt";
import CredentialsProvider from "next-auth/providers/credentials";
import GithubProvider from "next-auth/providers/github";
import GoogleProvider from "next-auth/providers/google";
import { Session } from "next-auth";
import z from "zod";
import type { Account, Profile, User } from "next-auth";
declare module "next-auth" {
  interface Session {
    user: {
      id: string;
      name?: string | null;
      email?: string | null;
      image?: string | null;
      username?: string | null;
    };
  }
}

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
      profile(profile) {
        return {
          id: profile.id.toString(),
          name: profile.name || profile.login,
          email: profile.email,
          username: profile.login,
          image: profile.avatar_url,
        };
      },
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID || "",
      clientSecret: process.env.GOOGLE_CLIENT_SECRET || "",
      profile(profile) {
        return {
          id: profile.sub,
          name: profile.name,
          email: profile.email,
          username: profile.email.split("@")[0],
          image: profile.picture,
        };
      },
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
                id: existingUser.id.toString(),
                username: existingUser.username,
                email: existingUser.email,
                name: existingUser.name,
              };
            } else {
              console.log("Invalid password for existing user");
            }
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
            email: user.email,
          };
        } catch (error) {
          console.log(error, "Not able to Create new user");
        }

        return null;
      },
    }),
  ],
  secret: process.env.NEXTAUTH_SECRET || "secr3t",

  callbacks: {
    async jwt({ token, user, account }: any) {
      //console.log("JWT Callback - User:", user);
      //console.log("JWT Callback - Account:", account);

      if (user) {
        token.id = user.id;
        token.username = user.username;
        token.email = user.email;
      }
      return token;
    },
    async session({ session, token }: any) {
      // console.log("Session Callback - Token:", token);
      // console.log("Session Callback - Initial Session:", session);

      if (token && session.user) {
        session.user.id = token.id as string;
        session.user.username = token.username || null;
        session.user.email = token.email || null;
      }

      //console.log("Session Callback - Updated Session:", session);
      return session;
    },

    async signIn({ user, profile, account }: any) {
      try {
        const existingUser = await db.user.findFirst({
          where: {
            OR: [{ email: user.email }, { username: user.username }],
          },
        });

        if (!existingUser) {
          const newUser = await db.user.create({
            data: {
              username:
                user.username ||
                (account.provider === "github"
                  ? profile.login
                  : profile.email.split("@")[0]),
              email: user.email || `${user.id}@${account.provider}.user`,
              name: user.name,
              password: "",
              // image: user.image,
            },
          });
          user.id = newUser.id.toString();
          // console.log({
          //   id: user.id.toString(),
          //   name: user.name,
          //   username: user.username,
          // });
        } else {
          user.id = existingUser.id.toString();
        }
        return true;
      } catch (error) {
        console.error("SignIn Error ", error);
        return false;
      }
    },
  },
  pages: {
    signIn: "/signin",
    error: "/error",
    signOut: "/signin",
  },
};
