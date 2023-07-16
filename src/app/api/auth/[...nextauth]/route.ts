import NextAuth, { NextAuthOptions } from "next-auth";
import GithubProvider from "next-auth/providers/github";
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";
import { connectDB } from "@/lib/connectDB";
import User from "@/model/user";
import * as bcrypt from "bcryptjs";
import mongoose from "mongoose";

export const authOptions: NextAuthOptions = {
  session: {
    strategy: "jwt",
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
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials, req) {
        const { email, password } = credentials as {
          email: string;
          password: string;
        };
        if (!email || !password)
          throw new Error("Please provide email and password");

        await connectDB();

        const userExists = await User.findOne({ email });

        if (userExists) {
          const isMatch = await bcrypt.compare(password, userExists.password);
          if (!isMatch) {
            throw new Error("Invalid Login Credentials");
          }
          return userExists;
        }
        try {
          const newUser = await User.create({ email, password });

          return newUser;
        } catch (error: any) {
          console.log(error.type);
          console.log(error.stack);
          console.log(error.message);
          if (error.name === "ValidationError") {
            const msg = Object.values(error.errors)
              .map((item: any) => item.message)
              .join(",");

            throw new Error(msg);
          }
          if (error.code && error.code === 11000) {
            const msg = `Duplicate value entered for ${Object.keys(
              error.keyValue
            )} field, please choose another value`;
            throw new Error(msg);
          }
          if (error.name === "CastError") {
            const msg = `No item found with id : ${error.value}`;
            throw new Error(msg);
          }

          throw new Error("something went wrong");
        }
      },
    }),
  ],
  callbacks: {
    async signIn({ user, account, profile, email, credentials }) {
      await connectDB();
      console.log("called");

      try {
        if (account && user) {
          const userExists = await User.findOne({ email: user.email });
          if (!userExists) {
            console.log("called in acct");
            console.log(user);

            const newUser = await User.create({
              email: user?.email,
              name: user?.name,
              image: user?.image,
            });
          }
        }
      } catch (error: any) {
        if (error instanceof mongoose.Error.ValidationError) {
          const errorMessages = Object.values(error.errors).map(
            (err:any) => err.message
          );
          console.log(errorMessages);
        } else {
          console.log("signIn error", error);
          throw new Error(error.message);
        }
      }
      return true;
    },
    async redirect({ url, baseUrl }) {
      return baseUrl;
    },
    async session({ session, user, token }) {
      await connectDB();
      const userInDB = await User.findOne({ email: session.user?.email });
      session.user.id = userInDB._id;
      return session;
    },
    async jwt({ token, user, account, profile }) {
      return token;
    },
  },
  pages: {
    signIn: "/auth",
    error: "/auth/error",
  },
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
