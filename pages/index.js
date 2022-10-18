import Head from 'next/head'
import Image from 'next/image'
import { useEffect, useRef } from 'react'
import styles from '../styles/Home.module.css'
import { useSession, signIn, signOut } from "next-auth/react"
import { useRouter } from 'next/router'


function Component() {
  const { data: session,status } = useSession()
  const router = useRouter();
  const nameRef = useRef();
  const passRef = useRef();
  var typeUser = "";
  console.log(session)
  

  useEffect(() => {
    if (status === "unauthenticated") router.push('/signIn');
  }, [status]);

  function onChange(e){    
    typeUser = e.target.value;
  }

  async function handleClick(e){
    e.preventDefault();
    
    console.log(type);
    if(nameRef.current.value == "" || passRef.current.value == "" || typeUser == ""){
      alert("Por favor llene todo los campos");
    }else{
      let data = {
        type : typeUser,
        username : nameRef.current.value,
        password : passRef.current.value
      }
      
    }
   
  }
  

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
