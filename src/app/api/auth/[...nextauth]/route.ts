import NextAuth, { NextAuthOptions } from "next-auth";
import GithubProvider from "next-auth/providers/github";
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials"
import { connectDB } from "@/lib/connectDB";
import User from "@/model/user";
export const authOptions: NextAuthOptions = {
  // Configure one or more authentication providers
  session: {
    strategy: 'jwt',
  },
  secret: process.env.AUTH_SECRET,
  providers: [
    GithubProvider({
      clientId: process.env.GITHUB_ID as string,
      clientSecret: process.env.GITHUB_SECRET as string,
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
    }),
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Username", type: "text", placeholder: "jsmith" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials, req) {
        console.log("credentials from credential", credentials);

        // Add logic here to look up the user from the credentials supplied
        const user = { id: "1", name: "J Smith", email: "jsmith@example.com" }

        if (user) {
          // Any object returned will be saved in `user` property of the JWT
          return user
        } else {
          // If you return null then an error will be displayed advising the user to check their details.
          return null

          // You can also Reject this callback with an Error thus the user will be sent to the error page with the error message as a query parameter
        }

      }
    })
  ],
  callbacks: {
    async signIn({ user, account, profile, email, credentials }) {
      await connectDB()
      try {
        if (account && user) {
          const userExists = await User.findOne({ email: user.email })
          if (!userExists) {
            const newUser = await User.create({ email: user?.email, name: user?.name, image: user?.image })
          }
        }
      } catch (error) {
        console.log("signIn error", error);

      }

      console.log("user", user);
      console.log("account", account);
      console.log("profile", profile);
      console.log("email", email);
      console.log("crecredentials", credentials);

      return true
    },
    // async redirect({ url, baseUrl }) {
    //   return baseUrl
    // },
    async session({ session, user, token }) {
      // console.log("session from route", session);

      return session
    },
    async jwt({ token, user, account, profile, isNewUser }) {
      return token
    },

  },
}


const handler = NextAuth(authOptions);

export { handler as GET, handler as POST }
