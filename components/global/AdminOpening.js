import * as React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import { IconButton } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import Spacer from './Spacer';

export default function item(props) {


    return (
        <Card sx={{ display: 'flex', width: `calc(95%)`, flexDirection: 'row', maxHeight: 50, margin: '15px 15px 15px 15px', background: "#ebfafa" }}>

            <CardContent sx={{ display: 'flex', flexGrow: '1' }}>
                <Typography gutterBottom variant="body1" component="div">
                    {props.dia}
                </Typography>
                <Spacer />
                <Typography gutterBottom variant="body1" component="div">
                    {props.salon}
                </Typography>
                <Spacer />
                <Typography gutterBottom variant="body1" component="div">
                    {props.build}
                </Typography>
                <Spacer />
                <Typography gutterBottom variant="body1" component="div">
                    {props.init}
                </Typography>
                <Spacer />
                <Typography gutterBottom variant="body1" component="div">
                    - {props.end}
                </Typography>
            </CardContent>
            <CardActions>
                <IconButton onClick={props.onEdit}>
                    <EditIcon />
                </IconButton>
                <IconButton onClick={props.onDelete}>
                    <DeleteIcon />
                </IconButton>
            </CardActions>
        </Card>
    );
}