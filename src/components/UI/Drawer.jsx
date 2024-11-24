import * as React from 'react';
import {useCallback} from 'react';
import {styled, useTheme} from '@mui/material/styles';
import Box from '@mui/material/Box';
import MuiDrawer from '@mui/material/Drawer';
import MuiAppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import CssBaseline from '@mui/material/CssBaseline';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import MailIcon from '@mui/icons-material/Mail';
import {Button} from "@mui/material";
import {Link, useNavigate} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {authActions} from "../../store/auth.js";
import BasicMenu from "../wrappers/BasicMenu.jsx";
import MenuItem from "@mui/material/MenuItem";
import TextColoredAvatar from "./TextColoredAvatar.jsx";

const drawerWidth = 240;

const openedMixin = (theme) => ({
    width: drawerWidth,
    transition: theme.transitions.create('width', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.enteringScreen,
    }),
    overflowX: 'hidden',
});

const closedMixin = (theme) => ({
    transition: theme.transitions.create('width', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
    }),
    overflowX: 'hidden',
    width: `calc(${theme.spacing(7)} + 1px)`,
    [theme.breakpoints.up('sm')]: {
        width: `calc(${theme.spacing(8)} + 1px)`,
    },
});

const DrawerHeader = styled('div')(({theme}) => ({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
}));

const AppBar = styled(MuiAppBar, {
    shouldForwardProp: (prop) => prop !== 'open',
})(({theme, open}) => ({
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(['width', 'margin'], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
    }),
    ...(open && {
        marginLeft: drawerWidth,
        width: `calc(100% - ${drawerWidth}px)`,
        transition: theme.transitions.create(['width', 'margin'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen,
        }),
    }),
}));

const Drawer = styled(MuiDrawer, {shouldForwardProp: (prop) => prop !== 'open'})(
    ({theme, open}) => ({
        width: drawerWidth,
        flexShrink: 0,
        whiteSpace: 'nowrap',
        boxSizing: 'border-box',
        ...(open && {
            ...openedMixin(theme),
            '& .MuiDrawer-paper': openedMixin(theme),
        }),
        ...(!open && {
            ...closedMixin(theme),
            '& .MuiDrawer-paper': closedMixin(theme),
        }),
    }),
);

export default function MiniDrawer() {
    const dispatch = useDispatch();
    const theme = useTheme();
    const navigate = useNavigate();
    const {isAuthenticated, user} = useSelector((state) => state.auth);
    const [openLeftDrawer, setOpenLeftDrawer] = React.useState(false);
    //TODO add right drawler

    const handleDrawerOpen = () => {
        setOpenLeftDrawer(true);
    };

    const handleDrawerClose = () => {
        setOpenLeftDrawer(false);
    };

    const handleCreateProject = useCallback(() => {
        navigate("/new");
    }, [navigate]);

    const handleLogout = useCallback(() => {
        dispatch(authActions.logout());
        navigate("/");
    }, [dispatch, navigate]);

    const handleAvatar = useCallback(() => {
        if (user) {
            navigate("/" + user.unique_name);
        }
    }, [navigate, user]);

    return (
        <Box sx={{flexGrow: 1}}>
            <CssBaseline/>
            <AppBar position="fixed" open={openLeftDrawer}>
                <Toolbar>
                    <IconButton
                        color="inherit"
                        aria-label="open drawer"
                        onClick={handleDrawerOpen}
                        edge="start"
                        sx={{
                            marginRight: 5,
                            ...(openLeftDrawer && {display: 'none'}),
                        }}
                    >
                        <MenuIcon/>
                    </IconButton>
                    <Button color="inherit" variant="text" component={Link} to="/">
                        Todo list
                    </Button>
                    {isAuthenticated &&
                        <BasicMenu title="Projects">
                            <MenuItem onClick={handleCreateProject}>Create project</MenuItem>
                        </BasicMenu>
                    }

                    <Box sx={{flexGrow: 1}}/>

                    {!isAuthenticated &&
                        <>
                            <Button color="inherit" component={Link} to="/login">Sign in</Button>
                            <Button color="inherit" component={Link} to="/signup">Sign up</Button>
                        </>
                    }
                    {isAuthenticated &&
                        <>
                            <Button color="inherit" onClick={handleLogout}>Logout</Button>
                            <TextColoredAvatar onClick={handleAvatar}>{user.unique_name}</TextColoredAvatar>
                        </>
                    }
                </Toolbar>
            </AppBar>
            <Drawer variant="permanent" open={openLeftDrawer}>
                <DrawerHeader>
                    <IconButton onClick={handleDrawerClose}>
                        {theme.direction === 'rtl' ? <ChevronRightIcon/> : <ChevronLeftIcon/>}
                    </IconButton>
                </DrawerHeader>
                <Divider/>
                <List>
                    {['Inbox', 'Starred', 'Send email', 'Drafts'].map((text, index) => (
                        <ListItem key={text} disablePadding sx={{display: 'block'}}>
                            <ListItemButton
                                sx={{
                                    minHeight: 48,
                                    justifyContent: openLeftDrawer ? 'initial' : 'center',
                                    px: 2.5,
                                }}
                            >
                                <ListItemIcon
                                    sx={{
                                        minWidth: 0,
                                        mr: openLeftDrawer ? 3 : 'auto',
                                        justifyContent: 'center',
                                    }}
                                >
                                    {index % 2 === 0 ? <InboxIcon/> : <MailIcon/>}
                                </ListItemIcon>
                                <ListItemText primary={text} sx={{opacity: openLeftDrawer ? 1 : 0}}/>
                            </ListItemButton>
                        </ListItem>
                    ))}
                </List>
                <Divider/>
                <List>
                    {['All mail', 'Trash', 'Spam'].map((text, index) => (
                        <ListItem key={text} disablePadding sx={{display: 'block'}}>
                            <ListItemButton
                                sx={{
                                    minHeight: 48,
                                    justifyContent: openLeftDrawer ? 'initial' : 'center',
                                    px: 2.5,
                                }}
                            >
                                <ListItemIcon
                                    sx={{
                                        minWidth: 0,
                                        mr: openLeftDrawer ? 3 : 'auto',
                                        justifyContent: 'center',
                                    }}
                                >
                                    {index % 2 === 0 ? <InboxIcon/> : <MailIcon/>}
                                </ListItemIcon>
                                <ListItemText primary={text} sx={{opacity: openLeftDrawer ? 1 : 0}}/>
                            </ListItemButton>
                        </ListItem>
                    ))}
                </List>
            </Drawer>
        </Box>
    );
}
