import * as React from 'react';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box'
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { Typography } from '@mui/material';
import ControlPointIcon from '@mui/icons-material/ControlPoint';
import { useRouter } from 'next/router';
import Spacer from '../components/global/Spacer'


export default function handler() {
    const [list,setList] = React.useState([]);
    
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
            </Box>
        </div>
    )
}