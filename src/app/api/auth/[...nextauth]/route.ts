import NextAuth, { NextAuthOptions } from "next-auth";
import GithubProvider from "next-auth/providers/github";
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials"
import { connectDB } from "@/lib/connectDB";
import User from "@/model/user";
import * as bcrypt from "bcryptjs"

export const authOptions: NextAuthOptions = {
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
        const { email, password } = credentials as {
          email: string,
          password: string,
        };
        if (!email || !password) throw new Error("Please provide email and password")

        await connectDB()

        const userExists = await User.findOne({ email })

        if (userExists) {
          const isMatch = await bcrypt.compare(password, userExists.password)
          if (!isMatch) { throw new Error("Invalid Login Credentials") }
          return userExists
        }

        const newUser = await User.create({ email, password })

        return newUser

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
      return true
    },
    async redirect({ url, baseUrl }) {
      return baseUrl
    },
    async session({ session, user, token }) {
      await connectDB()
      const userInDB = await User.findOne({ email: session.user?.email })
      session.user.id = userInDB._id
      return session
    },
    async jwt({ token, user, account, profile }) {
      return token
    },

  },
  pages: {
    signIn: "/auth",
    error: "/auth/error"
  }
}


const handler = NextAuth(authOptions);

export { handler as GET, handler as POST }
