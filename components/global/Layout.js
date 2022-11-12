import Navbar from './Navbar'
import Sidebar from './Sidebar'
import { useSession, signIn, signOut } from "next-auth/react"
const drawerWidth = 150
const max = 500
const Layout = ({ children }) => {
    
    const { data: session } = useSession()
    if (session) {
        if (session.type == "monit") {
            return (
                <div className="layout-container">
                    <div className="sidebar-main-containter" style={{display:'flex',flexGrow:'1'}}>
                        <Navbar />
                    </div>
                    <div className="children-container" style={{display:'flex',flexGrow:'1'}}>
                        {children}
                    </div>
                </div>
            )
        }
        else if (session.type == "admin") {
            return (
                <div style={{display:'flex',flexGrow:'1'}}>
                    <div style={{width:drawerWidth}}>
                        <Sidebar/>
                    </div>
                    <div style={{flexGrow:'1'}}>
                        {children}
                    </div>
                </div>

            )
        }
    }

    //NO SESSION RETURN:

    return (
        <>
            {children}
        </>
    )

}

export default Layout