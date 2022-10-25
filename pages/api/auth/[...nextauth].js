import nextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import db from "../../../util/database";

const authOptions = {
  session: {
    strategy: "jwt",
  },
  providers: [
    CredentialsProvider({
      type: "credentials",
      credentials: {},
      authorize(credentials, req) {
        const { email, password, type } = credentials
        //db query here
        var user = {
          email: email,
          name: "test",
          other: "testing",
          type: type
        }
        return user;
      }
    }),
  ],
  pages: {
    signIn: "/signIn",
  },
  callbacks: {
    jwt: async ({ token, user }) => {
      if (user) {
        token.name = user.name,
          token.email = user.email,
          token.other = user.other,
          token.type = user.type
      }
      return token
    },
    session: ({ session, token }) => {
      if (token) {
        session.name = token.name
        session.email = token.email,
          session.other = token.other,
          session.type = token.type

      }
      return session
    }
  }

};

export default nextAuth(authOptions);
