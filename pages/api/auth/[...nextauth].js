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
        const{email,password} = credentials
        //db query here
        var user = {type: "FUCK"}
        return user;
      }
    }),
  ],
  pages: {
    signIn: "/signIn",
  },
  callbacks:{
    session: async ({session}) => {
      session.username = "ITWORKS"
      session.type = "monit"
      return session
    }
  }

};

export default nextAuth(authOptions);
