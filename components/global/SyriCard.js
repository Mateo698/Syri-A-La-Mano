import * as React from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { IconButton } from '@mui/material';
import DoneIcon from '@mui/icons-material/Done';
import FlagIcon from '@mui/icons-material/Flag';
import SupportIcon from '@mui/icons-material/Support';

const bull = (
  <Box
    component="span"
    sx={{ display: 'inline-block', mx: '2px', transform: 'scale(0.8)' }}
  >
    
  </Box>
);

export default function SyriCard(props) {
  return (
    <Card sx={{ width: 340,border:'5px',borderColor:'#4659F3',borderStyle:'solid'}}>
      <CardContent>
        <Typography variant="h4" component="div">
          {props.salon}
        </Typography>
        <Typography variant="h5">
          {props.hora}
        </Typography>
        <Typography variant="h5">
          {props.tipo}
        </Typography>
        <Typography variant="h5">
          {props.estado}
        </Typography>
      </CardContent>
      <CardActions sx={{display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <Box flexGrow={1}>
          <IconButton>
            <DoneIcon sx={{ width: 45, height: 45 }} />
          </IconButton>
        </Box>
        <Box flexGrow={1}>
          <IconButton>
            <FlagIcon sx={{ width: 45, height: 45 }} />
          </IconButton>
        </Box>
        <Box flexGrow={1}>
          <IconButton>
            <SupportIcon sx={{ width: 45, height: 45 }} />
          </IconButton>
        </Box>



      </CardActions>
    </Card>
  );
}
