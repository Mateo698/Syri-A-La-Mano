import { Container } from "@mui/material"
import { signIn } from "next-auth/react"
import { useRef } from "react";


export default function SignIn() {
  const nameRef = useRef();
  const passRef = useRef();
  var typeUser = "";


  function onChange(e) {
    typeUser = e.target.value;
    console.log(typeUser)
  }

  async function handleSubmit(e) {
    e.preventDefault();
    if (nameRef.current.value == "" || passRef.current.value == "" || typeUser == "") {
      alert("Por favor llene todo los campos");
    } else {
      const res = await signIn("credentials", {
        email: "Asd",
        password: "Asd",
        redirect: true,
        callbackUrl: '/'
      });
      console.log(res)
    }

  }

  return (
    <Container>
      <div >
        <div >
          <h1 className="signin-h1">Iniciar Sesion</h1>
          <input ref={nameRef} className="sign-in-input" name="email" type="email" placeholder="Email" />
          <input ref={passRef} className="sign-in-input" name="password" type="password" placeholder="Password" /><hr></hr>
          <input onClick={onChange} value="admin" name="type" type="radio"></input><label for="">Administrador</label>
          <input onClick={onChange} value="monitor" name="type" type="radio"></input><label for="">Monitor</label>
          <hr />
          <button className="sign-in-button" onClick={handleSubmit}>Sign in</button>
        </div>
      </div >
    </Container>

  )
}

