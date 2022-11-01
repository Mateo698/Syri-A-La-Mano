import Head from 'next/head'
import Image from 'next/image'
import { useEffect, useRef } from 'react'
import styles from '../styles/Home.module.css'
import { useSession, signIn, signOut, getSession } from "next-auth/react"
import { useRouter } from 'next/router'
import SyriCard from '../components/global/SyriCard'
import { Typography } from '@mui/material'


function Component(props) {
  const { data: session, status } = useSession()
  const router = useRouter();
  console.log(props)


  useEffect(() => {
    if (status === "unauthenticated") router.push('/signIn');
  }, [status]);


  if (session) {
    if (session.type == "monit") {
      if (props.data.turnoId != "") {
        return (
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column', border: '5px solid red', flexGrow: '1' }}>
            <Typography variant="h4">
              Turno actual:
            </Typography>
            <Typography variant='h3' sx={{ color: '#1760A5' }}>{props.data.edificios}</Typography>
            <Typography variant='h4' >
              Aperturas/Cierres restantes:
            </Typography>
            <Typography variant='h3' sx={{ color: '#1760A5' }}>
              X
            </Typography>
          </div>
        )
      } else {
        return (
          <div>

          </div>
        )
      }

    } else if (session.type == "admin") {
      <div>
        Admin vieww
      </div>
    } else {
      return (
        <div>
          <button onClick={() => { window.location.href = '/signIn' }}>Go</button>
        </div>
      )
    }
  } else {
    return (
      <div>
        Cargando...
      </div>
    )
  }
}

export async function getServerSideProps(context) {
  const session = await getSession(context);
  if (session) {
    let userData = { name: session.name, type: session.type };
    let config = {
      method: 'POST',
      body: JSON.stringify({ userData })
    }
    const response = await fetch("http://localhost:3000/api/home", config);
    const aux = await response.json();
    const data = aux.data;
    return {
      props: { data }
    }
  } else {
    return {
      props: { none: "" }
    }
  }

}



export default Component;
