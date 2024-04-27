import './App.css'
import {Container, createTheme, CssBaseline, Grid, ThemeProvider, Typography} from "@mui/material";
import JiraCard from "./components/UI/JiraCard.jsx";
import MiniDrawer from "./components/UI/Drawer.jsx";
import Box from "@mui/material/Box";

function App() {
    const darkTheme = createTheme({
        palette: {
            mode: 'dark',
        },
    });

    return (
        <ThemeProvider theme={darkTheme}>
            <MiniDrawer/>
            <Container style={{paddingTop: 64, paddingLeft: 64, height: '100vh'}}>
                <CssBaseline/>
                <Box marginTop={4}>
                    <Typography variant="h4" component="h1">KAN board</Typography>
                </Box>
                <Grid container spacing={2} marginTop={4} style={{height: '100%'}}>
                    <Grid item xs={12} sm={6} md={4} lg={3}>
                        <Box display="block"
                             style={{height: '100%', background: 'linear-gradient(to bottom, #444, #555)'}}>
                            <Typography variant="h6" component="h2">TO DO</Typography>
                            <JiraCard title="Misha"/>
                            <JiraCard title="Misha"/>
                            <JiraCard title="Misha"/>
                            <JiraCard title="Misha"/>
                        </Box>
                    </Grid>
                    <Grid item xs={12} sm={6} md={4} lg={3}>
                        <Box display="block"
                             style={{height: '100%', background: 'linear-gradient(to bottom, #444, #555)'}}>
                            <Typography variant="h6" component="h2">TO DO</Typography>
                            <JiraCard title="Misha"/>
                            <JiraCard title="Misha"/>
                            <JiraCard title="Misha"/>
                            <JiraCard title="Misha"/>
                        </Box>
                    </Grid>
                    <Grid item xs={12} sm={6} md={4} lg={3}>
                        <Box display="block"
                             style={{height: '100%', background: 'linear-gradient(to bottom, #444, #555)'}}>
                            <Typography variant="h6" component="h2">TO DO</Typography>
                            <JiraCard title="Misha"/>
                            <JiraCard title="Misha"/>
                            <JiraCard title="Misha"/>
                            <JiraCard title="Misha"/>
                        </Box>
                    </Grid>
                    <Grid item xs={12} sm={6} md={4} lg={3}>
                        <Box display="block"
                             style={{height: '100%', background: 'linear-gradient(to bottom, #444, #555)'}}>
                            <Typography variant="h6" component="h2">TO DO</Typography>
                            <JiraCard title="Misha"/>
                            <JiraCard title="Misha"/>
                            <JiraCard title="Misha"/>
                            <JiraCard title="Misha"/>
                        </Box>
                    </Grid>
                    <Grid item xs={12} sm={6} md={4} lg={3}>
                        <Box display="block"
                             style={{height: '100%', background: 'linear-gradient(to bottom, #444, #555)'}}>
                            <Typography variant="h6" component="h2">TO DO</Typography>
                            <JiraCard title="Misha"/>
                            <JiraCard title="Misha"/>
                            <JiraCard title="Misha"/>
                            <JiraCard title="Misha"/>
                        </Box>
                    </Grid>
                </Grid>
            </Container>
        </ThemeProvider>
    );
}

export default App
