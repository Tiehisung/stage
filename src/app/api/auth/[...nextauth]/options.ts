import GithubProvider from "next-auth/providers/github";
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";
import UserModel from "@/models/user";
import { IUser } from "@/types/user";

const admins = [
  "tiehisungai@gmail.com",
  "isoskode@gmail.com",
  "codecrusadez@gmail.com",
  "deverpool.cc@gmail.com",
];

export const authOptions = {
  providers: [
    GithubProvider({
      profile(profile) {
        let userRole = "Github User";
        if (admins.includes(profile?.email!)) {
          userRole = "admin";
        }
        return {
          ...profile,
          id: profile.id.toString(),
          role: userRole,
        };
      },
      clientId: process.env.GITHUB_ID!,
      clientSecret: process.env.GITHUB_SECRET!,
    }),
    GoogleProvider({
      profile(profile) {
        let userRole = "Github User";
        if (admins.includes(profile?.email)) {
          userRole = "admin";
        }
        return {
          ...profile,
          id: profile.sub,
          role: userRole,
        };
      },
      clientId: process.env.GOOGLE_ID!,
      clientSecret: process.env.GOOGLE_SECRET!,
    }),

    //Credentials
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: {
          label: "Email",
          type: "email",
          placeholder: "Enter valid email",
        },
        password: {
          label: "Password",
          type: "password",
          placeholder: "Enter your password",
        },
      },
      async authorize(credentials) {
        try {
          const foundUser = (await UserModel.findOne({
            email: credentials?.email,
          })
            .lean()
            .exec()) as IUser | null;
          if (foundUser) {
            const matched = await bcrypt.compare(
              credentials?.password!,
              foundUser.password!
            );
            //Compare passwords
            if (matched) {
              //Assign role
              const { password, ...rest } = foundUser;
              const userWithId = { ...rest, id: foundUser._id.toString() };
              if (admins.includes(foundUser.email)) {
                return { ...userWithId, role: "admin" };
              }

              //Normal user
              return { ...userWithId, role: "guest" };
            }
          }
        } catch (error) {
          console.log("Credentials error:", error);
        }
        return null;
      },
    }),
  ],

  callbacks: {
    //To be used at server
    async jwt({ user, token }: { user?: IUser; token: { role?: string } }) {
      if (user) {
        token.role = user.role;
      }
      return token;
    },
    //Available for client
    async session({
      session,
      token,
    }: {
      session: { user: IUser };
      token: { role?: string };
    }) {
      if (session?.user) session.user.role = token?.role as IUser["role"];
      return session;
    },
  },
};
