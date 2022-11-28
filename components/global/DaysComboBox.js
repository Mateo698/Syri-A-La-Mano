import * as React from 'react';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';

export default function DaysComboBox(props) {
  return (
    <Autocomplete
      disablePortal
      defaultValue={props.defaultValue}
      id="combo-box-demo"
      options={days}
      sx={{ width: `calc(70%)`,maxWidth:800 }}
      
      renderInput={(params) => <TextField {...params} label="Dia" inputRef={props.inputRef}/>}
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