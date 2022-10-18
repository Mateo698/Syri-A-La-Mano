import { Container } from "@mui/material"
import { signIn } from "next-auth/react"


export default function SignIn() {

  async function handleSubmit(e){
    e.preventDefault();
    const res = await signIn("credentials",{
      email : "test",
      password : "123",
      redirect : true,
      callbackUrl :'/'
    });
    console.log(res)
  }


  return (
    <div >
      <div >
        <h1 className="signin-h1">Iniciar Sesion</h1>
        <span>¿No tienes una cuenta? <a className="sign-a" href="/register">Registrarse</a> </span>

        <input className="sign-in-input" name="email" type="email" placeholder="Email" />


        <input className="sign-in-input" name="password" type="password" placeholder="Password" />

        <hr />
        <button className="sign-in-button" onClick={handleSubmit}>Sign in</button>
    </div>
       </div > 
  )
}

