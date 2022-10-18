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
        return {
          id: "1234",
          name: "John Doe",
          email: "john@gmail.com",
          role: "admin",
        };
      }
    }),
  ],
  pages: {
    signIn: "/signIn",
    // error: '/auth/error',
    // signOut: '/auth/signout'
  }
};

export default nextAuth(authOptions);


// export default nextAuth({
//   session: {
//     strategy: 'jwt'
//   },
//   providers: [
//     CredentialsProvider({
//       type: "credentials",
//       credentials: { },
//       authorize(credentials, req) {
//         return{
//           username: "Mateo698",
//           email: "mateora",
//           name: "Mateo",
//           last_name: "Rada",
//           user_type: "Admin"
//         }
//       }
//     })
//   ],
//   pages:{
//     signIn : '/signIn'
//   }
// });
