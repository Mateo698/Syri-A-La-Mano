import { useSession } from "next-auth/react"

export default function hanlder(){
    const {data : session} = useSession()
    if(session){
        if(session.type == "Admin"){
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