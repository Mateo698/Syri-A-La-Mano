// This is an example of how to read a JSON Web Token from an API route
import { getToken } from "next-auth/jwt"

export default async (req, res) => {
  // If you don't have NEXTAUTH_SECRET set, you will have to pass your secret as `secret` to `getToken`
  const token = await getToken({ req })
  console.log(token)
  if (token) {
    // Signed in
    console.log("JSON Web Token", JSON.stringify(token, null, 2))
  } else {
    // Not Signed in
    console.log("no")
  }
  res.status(200).json({hey:'hey'})
}