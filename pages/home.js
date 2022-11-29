import Box from '@mui/material/Box';
import * as React from 'react';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Spacer from '../components/global/Spacer';
import TextareaAutosize from '@mui/base/TextareaAutosize';
import Button from '@mui/material/Button';
import {IconButton} from '@mui/material';
import { useRef } from 'react';
import { styled } from '@mui/material/styles';
import { red } from '@mui/material/colors';
import { Height } from '@mui/icons-material';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { color, margin } from '@mui/system';
import { useRouter } from 'next/router'


const ColorButton = styled(Button)(({ theme }) => ({
    color: theme.palette.getContrastText(red[500]),
    backgroundColor: red[500],
    '&:hover': {
        backgroundColor: red[700],
    },
}));

export default function handler() {

    const edificiofRef = useRef()
    const salonRef = useRef()
    const commentRef = useRef()
    const endRef = useRef()
    const router = useRouter();

    function navigateTo(to) {
        router.push(to)
    }


    const handleSave = async e => {
        if (edificiofRef.current.value == "" || salonRef.current.value == "" || commentRef.current.value == "") {
            alert("Por favor ingrese todos los campos")
        } else {
            let newSolicitud = {
                edificio: edificiofRef.current.value,
                salon: salonRef.current.value,
                comentario: commentRef.current.value
            }
            const response = await fetch('http://localhost:3000/api/newSolicitud', {
                method: 'POST',
                body: JSON.stringify({ newSolicitud }),
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                }
            })
            const aux = await response.json();
            const data = aux.data;
            if(data==1){
                alert('La solicitud se ha enviado exitosamente')
                window.location.href = '/home' 
                console.log("gud")
            }else{
                alert('Ya existe una solicitud con estas caracteristicas')
                console.log("no gud")
            }
        }

    }

    return (
        <div>
            <Box style={{ width:'100%',display: 'flex', justifyContent:'center', flexDirection: 'row', background: '#1760A5', width: `calc(100%)`, alignItems: 'center' }}>
                <Typography variant='h3' sx={{color: '#FFFFFF', textAlign:'center' }}>Nueva Solicitud</Typography>
                <IconButton sx={{justifySelf:'flex-end', color: "#fff"}} onClick={() => navigateTo('/signIn')}>
                <AccountCircleIcon/>
            </IconButton>
            </Box>
            <Spacer />
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column', flexGrow: '1', width: `calc(100%)` }}>
                <TextField
                    required
                    id="outlined-required"
                    label="Edificio"
                    inputRef={edificiofRef}
                    sx={{ width: `calc(70%)`, maxWidth: 800 }}
                />
                <Spacer />
                <TextField
                    required
                    id="outlined-required"
                    label="Salon"
                    inputRef={salonRef}
                    sx={{ width: `calc(70%)`, maxWidth: 800 }}
                />
                
                <Spacer />
                <TextField
                id="outlined-multiline-static"
                label="Comentarios"
                multiline
                rows={4}
                sx={{ width: `calc(70%)`, maxWidth: 800 }}
                required
                inputRef={commentRef}
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
                        <Button variant='contained' onClick={handleSave}>Enviar Solicitud</Button>
                    </Box>
                </Box>
                <Spacer />

            </div>
        </div>
    )
}

