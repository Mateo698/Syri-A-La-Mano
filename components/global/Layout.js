import Navbar from './Navbar'
import { useSession, signIn, signOut } from "next-auth/react"

const Layout = ({ children }) => {
    const { data: session } = useSession()
    if (session.type == "monit") {
        return (
            <div className="layout-container">
                <div className="sidebar-main-containter">
                    <Navbar />
                </div>
                <div className="children-container">
                    {children}
                </div>
            </div>
        )
    }
    else if(session.type == "admin"){
        return(
            <div>
                Admin view
            </div>

        )
    }

    //NO SESSION RETURN:

    return (
        <>
            {children}
        </>
    )

}

export default Layout