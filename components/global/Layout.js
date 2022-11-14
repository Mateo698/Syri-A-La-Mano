import * as React from 'react';
import Navbar from './Navbar'
import Sidebar from './Sidebar'
import { useSession, signIn, signOut } from "next-auth/react"
const drawerWidth = 150
const max = 500
const Layout = ({ children }) => {

    const size = useWindowsSize()

    function useWindowsSize(){
        const [windowSize,setWindowSize] = React.useState({
            width : undefined
        });

        React.useEffect(()=>{
            function handleResize() {
                // Set window width/height to state
                setWindowSize({
                  width: window.innerWidth
                });
            }
    
            window.addEventListener("resize", handleResize);
    
            handleResize();
    
            return () => window.removeEventListener("resize", handleResize);
        },[])

        return windowSize;
    }

    function getWidth(inner){
        if(inner>600) return 150
        return 50
    }
    
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
                    <div style={{width:getWidth(size.width)}}>
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