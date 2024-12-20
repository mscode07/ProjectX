import CredentialsProvider from "next-auth/providers/credentials";
import GithubProvider from "next-auth/providers/github";
import GoogleProvider from "next-auth/providers/google";

interface credentialsTypes {
  name: string;
  password: string;
  email: string;
}




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
        username: { label: "username", type: "text", placeholder: "" },
        email: { label: "email", type: "text", placeholder: "" },
        password: { label: "Password", type: "password", placeholder: "" },
      },

      async authorize(credentials, req) {
        if (!credentials) return null;
        const { username, email, password } = credentials;
        return {
          id: "user",
        };
      },
    }),
  ],
  Secret: process.env.NEXTAUTH_SECRET || "secr3t",
  page: {
    signIn: "/auth",
  },
};
