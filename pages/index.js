import Head from 'next/head'
import Image from 'next/image'
import { useEffect, useRef } from 'react'
import styles from '../styles/Home.module.css'
import { useSession, signIn, signOut } from "next-auth/react"
import { useRouter } from 'next/router'


function Component() {
  const { data: session,status } = useSession()
  const router = useRouter();
  console.log(session)
  

  useEffect(() => {
    if (status === "unauthenticated") router.push('/signIn');
  }, [status]);

 
  

  if(session){
    
    return(
      <div>
        Gud
        <button onClick={() => signOut({callbackUrl:'/'})}>LogOut</button>
      </div>
    )
  }else{
    return(
      <div>
        <button onClick={() => {window.location.href= '/signIn'}}>Go</button>
      </div>
    )
  }
  
}

export default Component;
