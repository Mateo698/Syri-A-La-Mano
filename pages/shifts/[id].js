import Box from '@mui/material/Box';
import * as React from 'react';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Spacer from '../../components/global/Spacer';
import DaysComboBox from '../components/global/DaysComboBox';
import Button from '@mui/material/Button';
import { useRef } from 'react';
import { styled } from '@mui/material/styles';
import { red } from '@mui/material/colors';
import { useSession } from "next-auth/react"


const ColorButton = styled(Button)(({ theme }) => ({
    color: theme.palette.getContrastText(red[500]),
    backgroundColor: red[500],
    '&:hover': {
        backgroundColor: red[700],
    },
}));

export default function hanlder(){
    const edifRef = useRef()
    const diaRef = useRef()
    const initRef = useRef()
    const endRef = useRef()
    
    const {data : session} = useSession()
    if(session){
        if(session.type == "admin"){
            return(
                <div>
                    Aqui es
                </div>
            )
        }else{
            return(
                <div>
                    Usted no tiene permisos para acceder a esta pagina
                    <button type="button" onClick={() => {window.location.href = '/signIn'}}>Iniciar sesion</button>
                </div>
            )
        }
    }else{
        return(
            <div>
                Usted no tiene permisos para acceder a esta pagina
                <button type="button" onClick={() => {window.location.href = '/signIn'}}>Iniciar sesion</button>
            </div>
        )
    }
    
}