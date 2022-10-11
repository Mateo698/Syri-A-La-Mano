import Head from 'next/head'
import Image from 'next/image'
import { useRef } from 'react'
import styles from '../styles/Home.module.css'


function Component({realData}) {
  const nameRef = useRef();
  const passRef = useRef();
  var typeUser = "";
  console.log(realData)

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
      const response = await fetch('http://localhost:3000/api/login', {    
          method: 'PUT',
          body: JSON.stringify({ data }),
          headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json'
          }
      })
    }
   
  }

  if(!realData.session){
    return(
      <div className={styles.main}>
        <h1 className={styles.title}>Syri A La Mano</h1>
        
          <label>Usuario:</label>
          <input type="text" ref={nameRef}></input>
          <label>Contraseña:</label>
          <input type="password" ref={passRef}></input>
          <div className={styles.radio}>
            <input type="radio" id="admin" name="type" value="Admin" onClick={onChange}></input>
            <label >Administrador</label>
            <input type="radio" id="monit" name ="type" value="Monitor" onClick={onChange}></input>
            <label >Monitor</label>
          </div>
          
          <button type="button" onClick={handleClick}>Sign in</button>
      </div>
      )
  }else{
    return(
      <div>Session: {realData.username}</div>
    )
  }
  
}

Component.getInitialProps = async (ctx) => {
  const testData = await fetch("http://localhost:3000/api/login");
  const r = await testData.json();
  console.log("AQUI")
  console.log(r.data.session)
  const realData = r.data
  return {realData};
};

export default Component;
