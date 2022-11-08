import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import Button from '@mui/material/Button';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import MenuIcon from '@mui/icons-material/Menu';
import AccountCircle from '@mui/icons-material/AccountCircle';
import Switch from '@mui/material/Switch';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormGroup from '@mui/material/FormGroup';
import MenuItem from '@mui/material/MenuItem';
import Menu from '@mui/material/Menu';
import { useSession, signOut} from "next-auth/react"
import Stack from '@mui/material/Stack';
import { useRouter } from 'next/router';



const theme = createTheme({
    status: {
        danger: '#e53e3e',
    },
    palette: {
        primary: {
            main: '#4287f5',
            darker: '#4287f5',
        },
        neutral: {
            main: '#ffffff',
            contrastText: '#000000',
        },
    },
});

export default function MenuAppBar() {
    const [auth, setAuth] = React.useState(true);
    const [anchorEl, setAnchorEl] = React.useState(null);
    const { data: session } = useSession();
    const router = useRouter()
    function navigateTo(to){
        router.push(to)
    }

    const handleHome = (event) => {

    }

    const handleLogOut = (event) => {
        
    }

    const handleChange = (event) => {
        setAuth(event.target.checked);
    };

    const handleMenu = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    return (
        <Box sx={{ flexGrow: 1 }}>

            <AppBar position="fixed" sx={{ top: 'auto', bottom: 0 }}>
                <Toolbar>
                    <ThemeProvider theme={theme}>
                        <Stack direction="row" flexGrow={2} >
                            <Box flexGrow={1} sx={{ display: 'flex', justifyContent: 'center' }}>
                                <Button color="neutral" variant="contained" sx={{width:'90%'}} onClick={() => navigateTo('/aperturas')}>
                                    Aperturas
                                </Button></Box>

                            <Box flexGrow={1} sx={{ display: 'flex', justifyContent: 'center' }} onClick={() => navigateTo('/solicitudes')}>
                                <Button color="neutral" variant="contained" sx={{width:'90%'}}>
                                    Solicitudes
                                </Button></Box>

                        </Stack>
                    </ThemeProvider>

                    {auth && (
                        <div>
                            <IconButton
                                size="large"
                                aria-label="account of current user"
                                aria-controls="menu-appbar"
                                aria-haspopup="true"
                                onClick={handleMenu}
                                color="inherit"
                            >
                                <AccountCircle />
                            </IconButton>
                            <Menu
                                id="menu-appbar"
                                anchorEl={anchorEl}
                                anchorOrigin={{
                                    vertical: 'top',
                                    horizontal: 'right',
                                }}
                                keepMounted
                                transformOrigin={{
                                    vertical: 'top',
                                    horizontal: 'right',
                                }}
                                open={Boolean(anchorEl)}
                                onClose={handleClose}
                            >
                                <MenuItem onClick={() => navigateTo('/')}>Profile</MenuItem>
                                <MenuItem onClick={() => signOut({callbackUrl:'/'})}>Salir</MenuItem>
                            </Menu>
                        </div>
                    )}
                </Toolbar>
            </AppBar>
        </Box>
    );
}

