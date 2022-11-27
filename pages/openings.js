import * as React from 'react';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box'
import { Typography } from '@mui/material';
import styles from '../styles/Home.module.css'
import { useSession, signIn, signOut, getSession } from "next-auth/react"
import { useRouter } from 'next/router'
import ControlPointIcon from '@mui/icons-material/ControlPoint';
import SyriCard from '../components/global/SyriCard'
import Spacer from '../components/global/Spacer'

export default function Open(props) {
  const { data: session } = useSession();
  const [list, setList] = React.useState([])
  const router = useRouter();
  function navigateTo(to) {
    router.push(to)
  }
  if (session) {
    if (session.type == "admin") {
      return (
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column', flexGrow: '1'}}>
          <Box sx={{ display: 'flex', flexGrow: '1', flexDirection: 'column', background: '#1760A5', width: `calc(100%)`, alignItems: 'center' }}>
            <Typography variant='h3' sx={{ color: '#FFFFFF' }}>Aperturas</Typography>
          </Box>
          <Spacer />
          <Box>
            <Button variant="contained" onClick={() => navigateTo('/newopening')}>
              <Typography variant='subtitle1'>Crear nuevo</Typography>
              <ControlPointIcon></ControlPointIcon>
            </Button>
          </Box>

            <Spacer />
            <Box sx={{
              display: 'flex',
              flexGrow: '1',
              flexDirection: 'column',
              alignItems: 'center',
              borderRadius: '6px',
              background: 'white',
              border: 1,
              borderColor: '#C8C8C8',
              width: `calc(70%)`
            }}>
              {list.length == 0 ? "Aun no se ha creado ningún turno" : ""}

          </Box>
        </div>)
    } else if (session.type == "monit") {
      return (
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column' }}>
          <SyriCard salon="201E" apertura="A" cierre="B" />
          <SyriCard salon="201L" apertura="A" cierre="B" />
          <SyriCard salon="201H" apertura="A" cierre="B" />
          <SyriCard salon="201F" apertura="A" cierre="B" />
          <SyriCard salon="201G" apertura="A" cierre="B" />
          <div style={{ height: '50px' }}>hide</div>
        </div>
      )
    } else {
      <div>
        Usted no tiene permisos para acceder a esta pagina
        <button type="button" onClick={() => { window.location.href = '/signIn' }}>Iniciar sesion</button>
      </div>
    }
  } else {
    return (
      <div>
        Usted no tiene permisos para acceder a esta pagina
        <button type="button" onClick={() => { window.location.href = '/signIn' }}>Iniciar sesion</button>
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
    const response = await fetch("http://localhost:3000/api/openings", config);
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