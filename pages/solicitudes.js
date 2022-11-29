import * as React from 'react'
import { useSession,getSession } from "next-auth/react";
import { useRouter } from "next/router";
import SyriCard from '../components/global/SyriCard';
import '@fontsource/roboto/400.css';
import { Typography } from '@mui/material';

export default function handler(props){
    const [list, setList] = React.useState(props.data)
    const router = useRouter()
    console.log(props)
    const { data: session, status } = useSession()
    React.useEffect(() => {
        if (status === "unauthenticated") router.push('/signIn');
      }, [status]);
    return(
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column', flexGrow: '1' }}>
          {props.data == "notinshift" ? <Typography>No estas en ningun turno</Typography> : ""}
          {props.data.length == 0 ? <Typography>No tienes ninguna solicitud</Typography> : ""}
          {props.data != "notinshift" ? props.data.map((item)=>(<SyriCard salon={item.salon} comentarios={item.comentarios} />)) : ""}
        </div>
    )
}

export async function getServerSideProps(context) {
    const session = await getSession(context);
    if (session) {
      let userData = { username: session.username, type: session.type };
      let config = {
        method: 'POST',
        body: JSON.stringify({ userData })
      }
      const response = await fetch("http://localhost:3000/api/monitorSolicitudes", config);
      const aux = await response.json();
      const data = aux.data;
      console.log(data)
      return {
        props: { data }
      }
    } else {
      return {
        props: { none: "" }
      }
    }
  
  }