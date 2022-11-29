import * as React from 'react';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import CssBaseline from '@mui/material/CssBaseline';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import HomeIcon from '@mui/icons-material/Home';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import CampaignIcon from '@mui/icons-material/Campaign';
import PersonIcon from '@mui/icons-material/Person';
import TodayIcon from '@mui/icons-material/Today';
import MeetingRoomIcon from '@mui/icons-material/MeetingRoom';
import LogoutIcon from '@mui/icons-material/Logout';
import { useRouter } from 'next/router';
import { signOut } from 'next-auth/react';

const drawerWidth = 25;

//<button onClick={() => signOut({callbackUrl:'/'})}>LogOut</button>


export default function PermanentDrawerLeft() {
    const router = useRouter()
    const size = useWindowsSize()

    function navigateTo(to){
        router.push(to)
    }

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

    function getVisibility(inner){
        if(inner>600) return 'visible'
        return 'hidden'
    }

    
    const menuItems = [
        {
            text: 'Inicio',
            icon: <HomeIcon />,
            path: '/'
        },
        {
            text: 'RUH',
            icon: <CampaignIcon />,
            path: '/RUH'
        },
        {
            text: 'Monitores',
            icon: <PersonIcon />,
            path: '/monitores'
        },
        {
            text: 'Turnos',
            icon: <TodayIcon />,
            path: '/shifts'
        },
        {
            text: 'Aperturas',
            icon: <MeetingRoomIcon />,
            path: '/openings'
        }
    ]

    return (
        <Box sx={{ display: 'flex' }}>
            <CssBaseline />
            <Drawer
                sx={{
                    width: drawerWidth,
                    flexShrink: 0,
                    '& .MuiDrawer-paper': {
                        width: getWidth(size.width),
                        boxSizing: 'border-box',
                    },
                }}
                variant="permanent"
                anchor="left"
            >
                <Toolbar />
                <List>
                    {menuItems.map(item => (
                        <ListItem button key={item.text} disablePadding onClick={() => navigateTo(item.path)}>
                            <ListItemButton>
                                <ListItemIcon>
                                    {item.icon}
                                </ListItemIcon>
                                <ListItemText primary={item.text} sx={{visibility:getVisibility(size.width)}}/>
                            </ListItemButton>
                        </ListItem>
                    ))}
                    <ListItem button key='exit' disablePadding onClick={() => signOut({callbackUrl:'/'})}>
                            <ListItemButton>
                                <ListItemIcon>
                                   <LogoutIcon/>
                                </ListItemIcon>
                                <ListItemText primary="Salir"  sx={{visibility:getVisibility(size.width)}}/>
                            </ListItemButton>
                        </ListItem>
                </List>
            </Drawer>

        </Box>
    );
}
