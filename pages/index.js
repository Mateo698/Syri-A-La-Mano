import { styled } from '@mui/material/styles';
import { red } from '@mui/material/colors';
import { useEffect, useRef } from 'react'
import Spacer from '../components/global/Spacer'
import { useSession, signIn, signOut, getSession } from "next-auth/react"
import { useRouter } from 'next/router'
import { Box, Button, TextField, Typography } from '@mui/material'
import '@fontsource/roboto/400.css';
import AdminShift from '../components/global/AdminShift'


const ColorButton = styled(Button)(({ theme }) => ({
  color: theme.palette.getContrastText(red[500]),
  backgroundColor: red[500],
  '&:hover': {
    backgroundColor: red[700],
  },
}));


function Component(props) {
 
 
  const idRef = useRef()
  const { data: session, status } = useSession()
  const router = useRouter();
  console.log(props)
  useEffect(() => {
    if (status === "unauthenticated") router.push('/signIn');
  }, [status]);

  const handleCheck = async e => {
    if (idRef.current.value == "") {
      alert("Por favor ingresa el id de un turno disponible, consultalo con el monitor de servicios o un coordinador")
    } else {
      let userData = { username: session.username, type: session.type, operation: "check", turnoId: idRef.current.value };
      const response = await fetch('http://localhost:3000/api/home', {
        method: 'POST',
        body: JSON.stringify({ userData })
      })
      const aux = await response.json();
      const message = aux.message;
      if (message == "succesfull") {
        router.reload()
      } else if (message == "notfound") {
        alert("Este turno no existe")
      } else {
        alert("Este turno ya está tomado por otro monitor")
      }
    }
  }

  const handleOut = async e => {
    let userData = { username: session.username, type: session.type, operation: "out" };
    const response = await fetch('http://localhost:3000/api/home', {
      method: 'POST',
      body: JSON.stringify({ userData })
    })
    router.reload()
  }


  if (session) {
    if (session.type == "monit") {
      return (
        <div style={{ display: 'flex', height: 450, alignItems: 'center', justifyContent: 'center', flexDirection: 'column', flexGrow: '1' }}>
          {props.data == "none" ?
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column', flexGrow: '1' }}>
              <Typography variant="h4">Hola {session.name}</Typography>
              <Spacer />
              <Typography variant="h6" align='center'>Parece que aun no estas en ningun turno</Typography>
              <Spacer />
              <TextField margin="dense"
                required
                id="outlined-required"
                label="Id"
                inputRef={idRef}
                sx={{ width: `calc(70%)`, maxWidth: 800 }} >

              </TextField>
              <Spacer />
              <Button variant='contained' onClick={handleCheck}>Check-in</Button>
            </div>
            :
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column', flexGrow: '1' }}>
              <Typography variant="h4">
                Turno actual:
              </Typography>
              <Typography variant='h3' sx={{ color: '#1760A5' }}>{props.data.edificios}</Typography>
              <Spacer />
              <Typography variant='h6' >
                Inicio: {props.data.inicio}
              </Typography>
              <Spacer />
              <Typography variant='h6' >
                Fin: {props.data.fin}
              </Typography>
              <Spacer />
              <ColorButton variant='contained' onClick={handleOut}>Check-out</ColorButton>
            </div>
          }
        </div>
      )
    } else if (session.type == "admin") {
      return (
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column', flexGrow: '1' }}>
          <Spacer/>
          <Typography variant='h4'>Turnos disponible</Typography>
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
            {props.data.length == 0 ? "No hay turnos creados para este momento." : ""}
            {props.data.map((item)=>(<AdminShift edificios={item.edificios} estado={item.estado} id={item.id}  /> ))}
          </Box>
          
        </div>
      )
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
    let userData = { username: session.username, type: session.type };
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
