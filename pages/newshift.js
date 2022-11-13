import Box from '@mui/material/Box';
import * as React from 'react';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Spacer from '../components/global/Spacer';
import DaysComboBox from '../components/global/DaysComboBox';
import Autocomplete from '@mui/material/Autocomplete';
import Button from '@mui/material/Button';
import ControlPointIcon from '@mui/icons-material/ControlPoint';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { useRef } from 'react';


export default function handler() {
    let state = {
        salon: "",
        inicio: "",
        fin: ""
    }
    const salonRef = useRef()
    const initRef = useRef()
    const endRef = useRef()
    const [open, setOpen] = React.useState(false);
    const [list, setList] = React.useState([]);


    const handleClickOpen = () => {
        console.log(list)
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleSave = () => {
        if(salonRef.current.value == "" || initRef.current.value == "" || endRef.current.value == ""){
            alert("Por favor ingrese todos los campos")
        }
        let newOpening = {
            salon: salonRef.current.value,
            horaInicio: initRef.current.value,
            horaFin: endRef.current.value
        }
        setList([...list,newOpening])
        
        setOpen(false)
    }

    return (
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column', flexGrow: '1' }}>
            <Box sx={{ display: 'flex', flexGrow: '1', flexDirection: 'column', background: '#1760A5', width: `calc(100%)`, alignItems: 'center' }}>
                <Typography variant='h3' sx={{ color: '#FFFFFF' }}>Nuevo turno</Typography>
            </Box>
            <Spacer />
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column', flexGrow: '1' }}>
                <TextField
                    required
                    id="outlined-required"
                    label="Edificios"
                    sx={{ width: 500 }}
                />
                <Spacer />
                <DaysComboBox />
                <Spacer />
                <Typography variant='h6' fontWeight='bold'>Aperturas</Typography>
                <Box sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    borderRadius: '6px',
                    background: 'white',
                    width: 500,
                    minHeight: 30,
                    border: 1,
                    borderColor: '#C8C8C8',

                }}>
                    <Typography variant='body1'>{list.length == 0 ? "Aun no se han agregado aperturas" : ""}</Typography>

                </Box>
                <Spacer />
                <Button variant="contained" onClick={handleClickOpen}>
                    <Typography variant='subtitle1'>Agregar</Typography>
                    <ControlPointIcon></ControlPointIcon>
                </Button>
                <Dialog open={open} onClose={handleClose}>
                    <DialogTitle>Nueva apertura</DialogTitle>
                    <DialogContent>

                        <TextField
                            autoFocus
                            margin="dense"
                            id="name"
                            label="Salon"
                            type="email"
                            fullWidth
                            variant="standard"
                            inputRef={salonRef}
                        />
                        <Spacer />
                        <TextField
                            margin="dense"
                            id="name"
                            label="Hora de apertura"
                            type="time"
                            defaultValue="00:00"
                            fullWidth
                            variant="standard"
                            inputRef={initRef}
                        />
                        <TextField
                            margin="dense"
                            id="name"
                            label="Hora de cierre"
                            type="time"
                            defaultValue="00:00"
                            fullWidth
                            variant="standard"
                            inputRef={endRef}
                        />

                    </DialogContent>
                    <DialogActions>
                        <Button onClick={handleClose}>Cancelar</Button>
                        <Button onClick={handleSave}>Guardar</Button>
                    </DialogActions>
                </Dialog>
            </div>
        </div>
    )
}
