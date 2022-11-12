import * as React from 'react';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';

export default function DaysComboBox() {
  return (
    <Autocomplete
      disablePortal
      id="combo-box-demo"
      options={days}
      sx={{ width: 500 }}
      renderInput={(params) => <TextField {...params} label="Dia" />}
    />
  );
}


const days = [
  {label: 'Lunes'},
  {label: 'Martes'},
  {label: 'Miercoles'},
  {label: 'Jueves'},
  {label: 'Viernes'},
  {label: 'Sabado'}
]