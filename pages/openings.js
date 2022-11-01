import Head from 'next/head'
import Image from 'next/image'
import { useEffect, useRef } from 'react'
import styles from '../styles/Home.module.css'
import { useSession, signIn, signOut, getSession } from "next-auth/react"
import { useRouter } from 'next/router'
import SyriCard from '../components/global/SyriCard'

export default function Open(props){
    return(
        <div style={{display:'flex',alignItems:'center',justifyContent: 'center',flexDirection:'column'}}>
          <SyriCard salon="201E" apertura="A" cierre="B"/>
          <SyriCard salon="201L" apertura="A" cierre="B"/>
          <SyriCard salon="201H" apertura="A" cierre="B"/>
          <SyriCard salon="201F" apertura="A" cierre="B"/>
          <SyriCard salon="201G" apertura="A" cierre="B"/>
          <div style={{height:'50px'}}>hide</div>
        </div>
    )
}

export async function getServerSideProps(context) {
    const session = await getSession(context);
    if(session){
      let userData = { name: session.name, type: session.type };
      let config = {
        method: 'POST',
        body: JSON.stringify({ userData })
      }
      const response = await fetch("http://localhost:3000/api/openings", config);
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