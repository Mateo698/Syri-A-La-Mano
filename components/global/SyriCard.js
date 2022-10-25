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
    •
  </Box>
);

export default function SyriCard(props) {
  return (
    <Card sx={{ minWidth: 275 }}>
      <CardContent>
        <Typography variant="h5" component="div">
          {props.salon}
        </Typography>
        <Typography variant="body2">
          {props.apertura}
        </Typography>
        <Typography variant="body2">
          {props.cierre}
        </Typography>
      </CardContent>
      <CardActions>
        <IconButton>
            <DoneIcon/>
        </IconButton>
        <IconButton>
            <FlagIcon/>
        </IconButton>
        <IconButton>
            <SupportIcon/>
        </IconButton>
      </CardActions>
    </Card>
  );
}
