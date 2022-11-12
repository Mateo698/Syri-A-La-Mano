import Button from '@mui/material/Button';
import Box from '@mui/material/Box'
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { Typography } from '@mui/material';
import ControlPointIcon from '@mui/icons-material/ControlPoint';
import { useRouter } from 'next/router';

const headerTheme = createTheme({

})

export default function handler() {
    const router = useRouter();
    function navigateTo(to) {
        router.push(to)
    }
    return (
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column', flexGrow: '1' }}>
            <Box sx={{ display: 'flex', flexGrow: '1', flexDirection: 'column', background: '#1760A5', width: `calc(100%)`, alignItems: 'center' }}>
                <Typography variant='h3' sx={{ color: '#FFFFFF' }}>Turnos</Typography>
            </Box>
            <Box>
                <Button variant="contained" onClick={() => navigateTo('/newshift')}>
                    <Typography variant='subtitle1'>Crear nuevo</Typography>
                    <ControlPointIcon></ControlPointIcon>
                </Button>
                Listado aqui
            </Box>


        </div>
    )
}