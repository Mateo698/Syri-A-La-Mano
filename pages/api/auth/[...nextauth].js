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
      async authorize(credentials, req) {
        const { email, password, type } = credentials
        //db query here
        let data = await db.query('SELECT * FROM USERS WHERE EMAIL = $1 AND TYPE = $2',[email,type]);
        var user = {
          email: data.rows[0].email,
          name: data.rows[0].username,
          type: data.rows[0].type
        }
        if(password == data.rows[0].password){
          return user;
        }else{
          return null;
        }
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
          token.type = user.type
      }
      return token
    },
    session: ({ session, token }) => {
      if (token) {
        session.name = token.name
        session.email = token.email,
        session.type = token.type

      }
      return session
    }
  }

};

export default nextAuth(authOptions);
