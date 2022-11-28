import * as React from 'react';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box'
import { Typography } from '@mui/material';
import AdminOpening from '../../components/global/AdminOpening'
import { useSession, signIn, signOut, getSession } from "next-auth/react"
import { useRouter } from 'next/router'
import ControlPointIcon from '@mui/icons-material/ControlPoint';
import SyriCard from '../../components/global/SyriCard'
import Spacer from '../../components/global/Spacer'
import '@fontsource/roboto/400.css';

export default function Open(props) {
  const { data: session } = useSession();
  const [list, setList] = React.useState(props.data)
  const router = useRouter();
  console.log(props)
  function navigateTo(to) {
    router.push(to)
  }

  function onEdit(id) {
    window.location.href = '/openings/' + id
  }

  const deleteItem = async (id) => {
    const obj = { userData: session, id: id, operation: 'delete' }
    console.log(obj)
    let config = {
      method: 'POST',
      body: JSON.stringify(obj)
    }
    const response = await fetch("http://localhost:3000/api/openings", config);
    const aux = await response.json();
    const data = aux.message;
    console.log(data)
    const newList = list.filter((item) => item.id != id)
    setList(newList)
  }

  if (session) {
    if (session.type == "admin") {
      return (
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column', flexGrow: '1' }}>
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
            {list.map((item) => (
              <AdminOpening
                key={item.id}
                salon={item.salon}
                dia={item.dia}
                build={item.edificio}
                init={item.apertura}
                end={item.cierre}
                onEdit={() => onEdit(item.id)}
                onDelete={() => deleteItem(item.id)}
              />
            ))}

          </Box>
        </div>)
    } else if (session.type == "monit") {
      return (
        <div style={{display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column', flexGrow: '1' }}>
          {list.length == 0 ? <Typography>Parece que aun no estas en ningun turno.</Typography> : ""}
          {list.map((item)=>(<SyriCard salon={item.salon} hora={item.hora} estado={item.estado} tipo={item.tipo} />))}
          <Spacer/>
          <Spacer/>
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
    let userData = { username: session.username, type: session.type };
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