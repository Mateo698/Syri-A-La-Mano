import Box from '@mui/material/Box';
import * as React from 'react';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Spacer from '../components/global/Spacer';
import DaysComboBox from '../components/global/DaysComboBox';
import Button from '@mui/material/Button';
import { useRef } from 'react';
import { styled } from '@mui/material/styles';
import { red } from '@mui/material/colors';

const ColorButton = styled(Button)(({ theme }) => ({
    color: theme.palette.getContrastText(red[500]),
    backgroundColor: red[500],
    '&:hover': {
        backgroundColor: red[700],
    },
}));

export default function handler() {

    const nameRef = useRef()
    const usernameRef = useRef()
    const pwRef = useRef()
    const emailRef = useRef()

    const handleSave = async e => {
        if (nameRef.current.value == "" || usernameRef.current.value == "" || pwRef.current.value == "" || emailRef.current.value == "") {
            alert("Por favor ingrese todos los campos")
        } else {
            let newMonitor = {
                nombre: nameRef.current.value,
                username: usernameRef.current.value,
                password: pwRef.current.value,
                email: emailRef.current.value
            }
            const response = await fetch('http://localhost:3000/api/newMonitor', {
                method: 'POST',
                body: JSON.stringify({ newMonitor }),
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                }
            })
            const aux = await response.json();
            const data = aux.data;
            if(data==1){
                alert('El Monitor se ha creado exitosamente')
                window.location.href = '/' 
                console.log("gud")
            }else{
                alert('Ya existe un Monitor con el mismo username')
                console.log("no gud")
            }
        }

    }

    return (
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column', flexGrow: '1' }}>
            <Box sx={{ display: 'flex', flexGrow: '1', flexDirection: 'column', background: '#1760A5', width: `calc(100%)`, alignItems: 'center' }}>
                <Typography variant='h3' sx={{ color: '#FFFFFF' }}>Nuevo Monitor</Typography>
            </Box>
            <Spacer />
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column', flexGrow: '1', width: `calc(100%)` }}>
                <TextField
                    margin="dense"
                    id="nombre"
                    label="Nombre"
                    type="text"
                    variant="outlined"
                    inputRef={nameRef}
                    required
                    sx={{ width: `calc(70%)`, maxWidth: 800 }}
                />
                <Spacer/>
                <TextField
                    required
                    id="outlined-required"
                    label="Username"
                    inputRef={usernameRef}
                    sx={{ width: `calc(70%)`, maxWidth: 800 }}
                />
                <Spacer />
                <TextField
                    margin="dense"
                    id="password"
                    label="Password"
                    type="password"
                    variant="outlined"
                    inputRef={pwRef}
                    required
                    sx={{ width: `calc(70%)`, maxWidth: 800 }}
                />
                <Spacer />
                <TextField
                    margin="dense"
                    id="email"
                    label="Email"
                    type="email"
                    variant="outlined"
                    inputRef={emailRef}
                    required
                    sx={{ width: `calc(70%)`, maxWidth: 800 }}
                />
                <Spacer />
                <Box sx={{
                    display: 'flex',
                    flexDirection: 'row',
                    alignItems: 'center',
                    borderRadius: '6px',
                    background: 'white',
                    minHeight: 30,

                    width: `calc(70%)`,
                    maxWidth: 800

                }}>
                    <Box sx={{ display: 'flex', flexGrow: '1', justifyContent: 'center' }}>
                        <Button variant='contained' onClick={handleSave}>Agregar</Button>
                    </Box>
                    <Box sx={{ display: 'flex', flexGrow: '1', justifyContent: 'center', color: '#FF0000' }}>
                        <ColorButton>Cancelar</ColorButton>
                    </Box>
                </Box>
                <Spacer />

            </div>
        </div>
    )
}

