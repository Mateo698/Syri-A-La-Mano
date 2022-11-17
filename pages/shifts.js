import * as React from 'react';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box'
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { Typography } from '@mui/material';
import ControlPointIcon from '@mui/icons-material/ControlPoint';
import { useRouter } from 'next/router';
import Spacer from '../components/global/Spacer'
import { getSession } from 'next-auth/react';
import ShiftCard from '../components/global/ShiftCard'


export default function handler(props) {
    const [list,setList] = React.useState(props.data);
    
    const router = useRouter();
    function navigateTo(to) {
        router.push(to)
    }
    return (
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column', flexGrow: '1' }}>
            <Box sx={{ display: 'flex', flexGrow: '1', flexDirection: 'column', background: '#1760A5', width: `calc(100%)`, alignItems: 'center' }}>
                <Typography variant='h3' sx={{ color: '#FFFFFF' }}>Turnos</Typography>
            </Box>
            <Spacer />
            <Box>
                <Button variant="contained" onClick={() => navigateTo('/newshift')}>
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
                    width:`calc(70%)`
                }}>
                {list.length == 0 ? "Aun no se ha creado ningún turno" : ""}
                {list.map((item) => (
                    <ShiftCard key={item.id} dia = {item.dia} build = {item.edificio} init = {item.hora_inicio} end={item.hora_fin} />
                ))}
            </Box>
        </div>
    )
}

export async function getServerSideProps(context) {
    const session = getSession()
    if(session){
        let userData = { name: session.name, type: session.type };
      let config = {
        method: 'POST',
        body: JSON.stringify({ userData })
      }
      const response = await fetch("http://localhost:3000/api/shifts", config);
      const aux = await response.json();
      const data = aux.data;
      return {
        props: { data }
      }
    }else{
        return{
            props: {none : ""}
          }
    }
}