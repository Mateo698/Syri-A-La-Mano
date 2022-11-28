import Box from '@mui/material/Box';
import * as React from 'react';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Spacer from '../components/global/Spacer';
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

    const edifRef = useRef()
    const salonRef = useRef()
    const initRef = useRef()
    const endRef = useRef()


    const handleSave = async e => {
        if (edifRef.current.value == "" || salonRef.current.value == "" || initRef.current.value == "" || endRef.current.value == "") {
            alert("Por favor ingrese todos los campos")
        } else {
            let room =salonRef.current.value + edifRef.current.value;
            let newOp = {
                edificio: edifRef.current.value,
                salon: room,
                hora_inicio: initRef.current.value + ":00",
                hora_fin: endRef.current.value + ":00"
            }
            const response = await fetch('http://localhost:3000/api/newopening', {
                method: 'POST',
                body: JSON.stringify({ newOp }),
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                }
            })
            const aux = await response.json();
            const data = aux.data;
            if(data==1){
                alert('La apertura se ha creado exitosamente')
                window.location.href = '/openings' 
                console.log("gud")
            }else{
                alert('Ya existe una apertura con estas caracteristicas')
                console.log("no gud")
            }
        }

    }

    return (
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column', flexGrow: '1' }}>
            <Box sx={{ display: 'flex', flexGrow: '1', flexDirection: 'column', background: '#1760A5', width: `calc(100%)`, alignItems: 'center' }}>
                <Typography variant='h3' sx={{ color: '#FFFFFF' }}>Nueva apertura</Typography>
            </Box>
            <Spacer />
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column', flexGrow: '1', width: `calc(100%)` }}>
                <TextField
                    required
                    id="outlined-required"
                    label="Edificio"
                    inputRef={edifRef}
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
                    margin="dense"
                    id="name"
                    label="Apertura"
                    type="time"
                    defaultValue="00:00"
                    fullWidth
                    variant="outlined"
                    inputRef={initRef}
                    sx={{ width: `calc(70%)`, maxWidth: 800 }}
                />
                <Spacer />
                <TextField
                    margin="dense"
                    id="name"
                    label="Cierre"
                    type="time"
                    defaultValue="00:00"
                    fullWidth
                    variant="outlined"
                    inputRef={endRef}
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
                        <ColorButton onClick={()=>{window.location.href = '/openings'}}>Cancelar</ColorButton>
                    </Box>


                </Box>
                <Spacer />

            </div>
        </div>
    )
}

