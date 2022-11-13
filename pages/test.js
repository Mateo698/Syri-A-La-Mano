import OpeningCard from "../components/global/OpeningCard"
import Box from "@mui/material/Box"

export default function test(){
    return(
        
        <Box sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            borderRadius: '6px',
            background: 'white',
            width: 500,
            minHeight: 30,
            border: 1,
            borderColor: '#C8C8C8',

        }}>
            <OpeningCard salon="amogus" init="00:00" end="10:00"/>
            <OpeningCard salon="amogus" init="00:00" end="10:00"/>
            <OpeningCard salon="amogus" init="00:00" end="10:00"/>
            <OpeningCard salon="amogus" init="00:00" end="10:00"/>
            
        </Box>
    )
}