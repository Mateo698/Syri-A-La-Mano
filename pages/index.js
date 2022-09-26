import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'

import { useSession, signIn, signOut } from "next-auth/react"

export default function Component() {
  const { data: session } = useSession()
  if(session) {
    return <>
      Signed in as {session.user.email} <br/>
      <button onClick={() => signOut()}>Sign out</button>
    </>
  }
  return(
  <div className={styles.main}>
    <h1 className={styles.title}>Syri A La Mano</h1>
    <label>Usuario:</label>
    <input type="text"></input>
    <label>Contraseña:</label>
    <input type="password"></input>
    <button>Sign in</button>
  </div>
  )
}