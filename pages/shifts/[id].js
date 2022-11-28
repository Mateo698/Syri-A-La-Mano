import Box from '@mui/material/Box';
import * as React from 'react';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Spacer from '../../components/global/Spacer';
import DaysComboBox from '../../components/global/DaysComboBox';
import Button from '@mui/material/Button';
import { useRef } from 'react';
import { styled } from '@mui/material/styles';
import { red } from '@mui/material/colors';
import { useSession } from 'next-auth/react';

const ColorButton = styled(Button)(({ theme }) => ({
    color: theme.palette.getContrastText(red[500]),
    backgroundColor: red[500],
    '&:hover': {
        backgroundColor: red[700],
    },
}));

export default function hanlder(props) {
    const edifRef = useRef()
    const diaRef = useRef()
    const initRef = useRef()
    const endRef = useRef()


    const handleSave = async e => {
        if (edifRef.current.value == "" || diaRef.current.value == "" || initRef.current.value == "" || endRef.current.value == "") {
            alert("Por favor ingrese todos los campos")
        } else {
            let newShift = {
                edificios: edifRef.current.value,
                dia: diaRef.current.value,
                hora_inicio: initRef.current.value.slice(0,5) ,
                hora_fin: endRef.current.value.slice(0,5) ,
                id:props.data.id
            }
            console.log(newShift)
            
            const response = await fetch('http://localhost:3000/api/editshift', {
                method: 'POST',
                body: JSON.stringify({shift:newShift})
            })
            const aux = await response.json();
            const data = aux.data;
            console.log(data)
            if (data == 1) {
                alert('El turno se ha actualizado exitosamente')
                window.location.href = '/shifts'
                console.log("gud")
            } else {
                alert('Ya existe un turno con estas caracteristicas')
                console.log("no gud")
            }
        }
    }



    const { data: session } = useSession()
    if (session) {
        if (session.type == "admin") {
            return (
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column', flexGrow: '1' }}>
                    <Box sx={{ display: 'flex', flexGrow: '1', flexDirection: 'column', background: '#1760A5', width: `calc(100%)`, alignItems: 'center' }}>
                        <Typography variant='h3' sx={{ color: '#FFFFFF' }}>Editar turno</Typography>
                    </Box>
                    <Spacer />
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column', flexGrow: '1', width: `calc(100%)` }}>
                        <TextField
                            required
                            id="outlined-required"
                            label="Edificios"
                            inputRef={edifRef}
                            sx={{ width: `calc(70%)`, maxWidth: 800 }}
                            defaultValue={props.data.edificios}
                        />
                        <Spacer />
                        <DaysComboBox inputRef={diaRef} defaultValue={props.data.dia} />
                        <Spacer />
                        <TextField
                            margin="dense"
                            id="name"
                            label="Hora de inicio"
                            type="time"
                            fullWidth
                            variant="outlined"
                            defaultValue={props.data.hora_inicio}
                            inputRef={initRef}
                            sx={{ width: `calc(70%)`, maxWidth: 800 }}
                        />
                        <Spacer />
                        <TextField
                            margin="dense"
                            id="name"
                            label="Hora de finalizacion"
                            type="time"
                            defaultValue={props.data.hora_fin}
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
                                <Button variant='contained' onClick={handleSave}>Guardar</Button>
                            </Box>
                            <Box sx={{ display: 'flex', flexGrow: '1', justifyContent: 'center', color: '#FF0000' }}>
                                <ColorButton onClick={() => { window.location.href = '/shifts' }}>Cancelar</ColorButton>
                            </Box>


                        </Box>
                        <Spacer />

                    </div>
                </div>
            )
        } else {
            return (
                <div>
                    Usted no tiene permisos para acceder a esta pagina
                    <button type="button" onClick={() => { window.location.href = '/signIn' }}>Iniciar sesion</button>
                </div>
            )
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
    console.log(context.query.id)
    let config = {
        method: 'POST',
        body: JSON.stringify({ id: context.query.id })
    }
    const response = await fetch("http://localhost:3000/api/editshift", config);
    const aux = await response.json();
    const data = aux.data;
    return {
        props: { data }
    }
}