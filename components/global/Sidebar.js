import * as React from 'react';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import CssBaseline from '@mui/material/CssBaseline';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
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
const drawerWidth = 50;

//<button onClick={() => signOut({callbackUrl:'/'})}>LogOut</button>


export default function PermanentDrawerLeft() {
    const router = useRouter()
    function navigateTo(to){
        router.push(to)
    }

    const menuItems = [
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
            path: '/turnos'
        },
        {
            text: 'Aperturas',
            icon: <MeetingRoomIcon />,
            path: '/aperturas'
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
                        width: 150,
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
                                <ListItemText primary={item.text} />
                            </ListItemButton>
                        </ListItem>
                    ))}
                    <ListItem button key='exit' disablePadding onClick={() => signOut({callbackUrl:'/'})}>
                            <ListItemButton>
                                <ListItemIcon>
                                   <LogoutIcon/>
                                </ListItemIcon>
                                <ListItemText primary="Salir" />
                            </ListItemButton>
                        </ListItem>
                </List>
            </Drawer>

        </Box>
    );
}
