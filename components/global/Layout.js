import Navbar from './Navbar'
import Sidebar from './Sidebar'
import { useSession, signIn, signOut } from "next-auth/react"

const Layout = ({ children }) => {
    const { data: session } = useSession()
    if (session) {
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
        else if (session.type == "admin") {
            return (
                <div>
                    <div>
                        <Sidebar/>
                    </div>
                    <div>
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