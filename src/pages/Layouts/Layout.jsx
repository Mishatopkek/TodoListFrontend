import {Outlet} from "react-router-dom";
import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import * as React from "react";
import MiniDrawer from "../../components/UI/Drawer.jsx";
import BlackTheme from "../../components/wrappers/BlackTheme.jsx";
import Container from "@mui/material/Container";

const Layout = () => {

    return (
        <BlackTheme>
            <MiniDrawer/>
            <main style={{
                display: 'block',
                overflowY: 'auto',
                height: '100%'
            }}>
                <Box style={{
                    display: 'block',
                    overflowY: 'auto',
                    paddingTop: 64,
                    paddingLeft: 64, // left drawer + extra space
                    height: '100%',
                }}>
                    <CssBaseline/>
                    <Container>
                        <Outlet/>
                    </Container>
                </Box>
            </main>
        </BlackTheme>
    );
};
export default Layout;