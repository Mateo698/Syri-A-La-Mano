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


export default function handler() {
    const [open, setOpen] = React.useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

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
                    <Typography variant='body1'>Aun no se agregado apertuas a este turno</Typography>

                </Box>
                <Spacer />
                <Button variant="contained" onClick={handleClickOpen}>
                    <Typography variant='subtitle1'>Agregar</Typography>
                    <ControlPointIcon></ControlPointIcon>
                </Button>
                <Dialog open={open} onClose={handleClose}>
                    <DialogTitle>Nueva apertura</DialogTitle>
                    <DialogContent>
                        <DialogContentText>
                            To subscribe to this website, please enter your email address here. We
                            will send updates occasionally.
                        </DialogContentText>
                        <TextField
                            autoFocus
                            margin="dense"
                            id="name"
                            label="Email Address"
                            type="email"
                            fullWidth
                            variant="standard"
                        />
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={handleClose}>Cancel</Button>
                        <Button onClick={handleClose}>Subscribe</Button>
                    </DialogActions>
                </Dialog>
            </div>
        </div>
    )
}
