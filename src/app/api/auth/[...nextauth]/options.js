import GithubProvider from "next-auth/providers/github";
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";
import User from "@/models/user";
import bcrypt from "bcryptjs";

let admins = [
  "tiehisungai@gmail.com",
  "isoskode@gmail.com",
  "codecrusadez@gmail.com",
  "deverpool.cc@gmail.com",
];

export const authOptions = {
  providers: [
    GithubProvider({
      profile(profile) {
        console.log("Github profile", profile);
        let userRole = "Github User";
        if (admins.includes(profile?.email)) {
          userRole = "admin";
        }
        return {
          ...profile,
          role: userRole,
        };
      },
      clientId: process.env.GITHUB_ID,
      clientSecret: process.env.GITHUB_SECRET,
    }),
    GoogleProvider({
      profile(profile) {
        console.log("Google profile", profile);
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
      clientId: process.env.GOOGLE_ID,
      clientSecret: process.env.GOOGLE_SECRET,
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
          const foundUser = await User.findOne({ email: credentials.email })
            .lean()
            .exec();
          if (foundUser) {
            const matched = await bcrypt.compare(
              credentials.password,
              foundUser.password
            );
            //Compare passwords
            if (matched) {
              delete foundUser.password;
              //Assign role
              if (admins.includes(foundUser.email)) {
                foundUser["role"] = "admin";
                return foundUser;
              }

              //Normal user
              foundUser.role = "User";
              return foundUser;
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
    async jwt({ user, token }) {
      if (user) {
        token.role = user.role;
      }
      return token;
    },
    //Available for client
    async session({ session, token }) {
      if (session?.user) session.user.role = token?.role;
      return session;
    },
  },
};
