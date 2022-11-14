import OpeningCard from "../components/global/OpeningCard"
import Box from "@mui/material/Box"
import { useEffect, useState } from "react"
import { ImportExport } from "@mui/icons-material"

export default function test(){

    const size = useWindowsSize()

    function useWindowsSize(){
        const [windowSize,setWindowSize] = useState({
            width : undefined
        });

        useEffect(()=>{
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

    


    function getColor(innerWidth) {
        if (innerWidth <= 500) return "red"
        if (innerWidth <= 600) return "blue"
        if (innerWidth <= 700) return "green"
        if (innerWidth <= 800) return "yellow"
        if (innerWidth <= 900) return "pink"
        if (innerWidth <= 1000) return "beige"
        if (innerWidth <= 1100) return "lightblue"
        return "violet"
    }

    function getSize(inner){
        if(inner <= 500) return 100
        return 200
    }

    function getVisibility(state){
        if(state <= 500) return 'visible'
        return 'hidden'
    }


    return(
        
        <Box sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            borderRadius: '6px',
            background: getColor(size.width),
            width: getSize(size.width),
            minHeight: 30,
            border: 1,
            borderColor: '#C8C8C8',

        }}>
            {size.width}//{getSize(size.width)}
            <ImportExport sx={{visibility:getVisibility(size.width)}} />
        </Box>
    )
}