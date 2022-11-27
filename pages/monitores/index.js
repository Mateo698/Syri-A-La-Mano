import * as React from 'react';
import Head from 'next/head'
import Image from 'next/image'
import { useEffect, useRef } from 'react'
import styles from '../../styles/Home.module.css'
import { useSession, signIn, signOut, getSession } from "next-auth/react"
import { useRouter } from 'next/router'
import {IconButton} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import MonitorCard from '../../components/global/MonitorCard'

export default function handler(props){
    const monitores = props.data,
     [list, setList] = React.useState(props.data),
     { data: session } = useSession(),
     router = useRouter();

    function navigateTo(to) {
        router.push(to)
    }
    
    return(
        <div style={{display:"flex",justifyContent:"center",alignItems:"center",flexDirection:"column"}} >
            {monitores.map((monitores) => (
                <MonitorCard key= {monitores.username}
                username={monitores.username}
                name={monitores.name}
                email={monitores.email}
                onEdit={() => { window.location.href = '/monitores/' + monitores.username}}
                onDelete={async ()=>{
                    let config = {
                        method: 'POST',
                        body: JSON.stringify({ username:monitores.username,operation:'delete'})
                    }
                    const response = await fetch("http://localhost:3000/api/monitores", config);
                    const aux = await response.json();
                    const data = aux.data;
                    window.location.reload()
                }}/>
            ))}
            <IconButton onClick={() => navigateTo('/newMonitor')}>
                <AddIcon/>
            </IconButton>
        </div>
        
    );
}

export async function getServerSideProps(context) {
    const session = await getSession(context);
    if(session){
      let userData = { name: session.name, type: session.type };
      let config = {
        method: 'POST',
        body: JSON.stringify({ userData })
    }
      const response = await fetch("http://localhost:3000/api/monitores",config);
      const aux = await response.json();
      const data = aux.data;      
      return {
        props: { data }
      }
    }else{
      return{
        props: {none : ""}
      }
    }
}
