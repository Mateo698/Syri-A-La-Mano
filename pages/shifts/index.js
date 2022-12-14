import * as React from 'react';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box'
import { Typography } from '@mui/material';
import ControlPointIcon from '@mui/icons-material/ControlPoint';
import { useRouter } from 'next/router';
import Spacer from '../../components/global/Spacer'
import { getSession, useSession } from 'next-auth/react';
import ShiftCard from '../../components/global/ShiftCard'


export default function handler(props) {
    const [list, setList] = React.useState(props.data);
    const { data: session } = useSession()
    const router = useRouter();
    function navigateTo(to) {
        router.push(to)
    }
    
    function onEdit(id){
        window.location.href = '/shifts/'+id
    }

    const deleteItem = async (id) => {
        const obj = { id:id,operation:'delete'}
        console.log(obj)
        let config = {
            method: 'POST',
            body: JSON.stringify(obj)
        }
        const response = await fetch("http://localhost:3000/api/shifts", config);
        const aux = await response.json();
        const data = aux.message;
        console.log(data)
        const newList = list.filter((item) => item.id != id)
        setList(newList)
    }

    if (session) {
        if (session.type == "admin") {
            return (
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column', flexGrow: '1' }}>
                    <Box sx={{ display: 'flex', flexGrow: '1', flexDirection: 'column', background: '#1760A5', width: `calc(100%)`, alignItems: 'center' }}>
                        <Typography variant='h3' sx={{ color: '#FFFFFF' }}>Turnos</Typography>
                    </Box>
                    <Spacer />
                    <Box>
                        <Button variant="contained" onClick={() => navigateTo('/newshift')}>
                            <Typography variant='subtitle1'>Crear nuevo</Typography>
                            <ControlPointIcon></ControlPointIcon>
                        </Button>

                    </Box>
                    <Spacer />
                    <Box sx={{
                        display: 'flex',
                        flexGrow: '1',
                        flexDirection: 'column',
                        alignItems: 'center',
                        borderRadius: '6px',
                        background: 'white',
                        border: 1,
                        borderColor: '#C8C8C8',
                        width: `calc(70%)`
                    }}>
                        {list.length == 0 ? "Aun no se ha creado ning??n turno" : ""}
                        {list.map((item) => (
                            <ShiftCard key={item.id}
                                dia={item.dia}
                                build={item.edificio}
                                init={item.hora_inicio}
                                end={item.hora_fin}
                                onEdit={() => onEdit(item.id)}
                                onDelete={() => deleteItem(item.id)} />
                        ))}
                    </Box>
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
    const session = getSession()
    if (session) {
        let userData = { name: session.name, type: session.type };
        let config = {
            method: 'POST',
            body: JSON.stringify({ userData })
        }
        const response = await fetch("http://localhost:3000/api/shifts", config);
        const aux = await response.json();
        const data = aux.data;
        return {
            props: { data }
        }
    } else {
        return {
            props: { none: "" }
        }
    }
}