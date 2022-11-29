import * as React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import {IconButton} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import Spacer from './Spacer';

export default function item(props) {
    

    return (
        <Card sx={{ display: 'flex',width:`calc(95%)`, flexDirection: 'row', maxHeight: 50, margin: '15px 15px 15px 15px', background: "#ebfafa" }}>

            <CardContent sx={{display:'flex',flexGrow:'1'}}>
                <Typography gutterBottom variant="body1" component="div">
                    {props.edificios}
                </Typography>
                <Spacer/>
                <Typography gutterBottom variant="body1" component="div">
                    {props.estado}
                </Typography>
                <Spacer/>
                <Typography gutterBottom variant="body1" component="div">
                    {props.id}
                </Typography>

            </CardContent>
            
        </Card>
    );
}