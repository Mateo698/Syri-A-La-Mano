import { Home } from "@mui/icons-material";
import { Container } from "@mui/material"
import { signIn } from "next-auth/react"
import { useRef } from "react";
import styles from '../styles/SignIn.module.css';

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
        email: nameRef.current.value,
        password: passRef.current.value,
        type: typeUser,
        redirect: true,
        callbackUrl: '/'
      });
      console.log(res)
    }

  }

  return (
    <Container>
      <div className={styles.flexcolumn}>
          <h1 className={styles.h1}>Iniciar Sesion</h1>
          <div className={styles.flex}>
          <div className={styles.flexcolumn}>
          <label for="email" className={styles.label}>Email</label>
          <input id="email" ref={nameRef} className={styles.input} name="email" type="email" placeholder="email@example.com" />
          <label for="password" className={styles.label} >Password</label>
          <input id="password"ref={passRef} className={styles.input} name="password" type="password" placeholder="********" />
          </div>
          <div className={styles.flexcolumn}>
          <h3>Iniciar sesion como: </h3> 
          <div className={styles.flex}>
          <input className={styles.radio} onClick={onChange} value="admin" name="type" type="radio" id="admin"></input><label for="admin">Administrador</label>
          <input className={styles.radio} onClick={onChange} value="monit" name="type" type="radio" id="monit"></input><label for="monit">Monitor</label>
          </div>
          </div>
        </div>
        <button className={styles.button} onClick={handleSubmit}>Sign in</button>
      </div >
    </Container>

  )
}

