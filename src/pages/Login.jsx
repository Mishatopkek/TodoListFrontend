import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import MuiLink from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import {Link, useLocation, useNavigate} from "react-router-dom";
import BlackTheme from "../components/wrappers/BlackTheme.jsx";
import {useDispatch} from "react-redux";
import {authActions} from "../store/auth.js";

export default function Login() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const location = useLocation();

    const handleSubmit = (event) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);
        const user = {
            username: data.get('username'),
            password: data.get('password'),
        };
        try {

            //Mock jwt, TODO remove this
            const response = {
                data: {
                    token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6Ik1pc2hhIiwicm9sZSI6InVzZXIiLCJpYXQiOjE3MjI1NDc4MDAsImV4cCI6MTczMjU1MTQwMH0.lcINuF4acYXJMH2ubDpRX18LsrF5M5JOGiTLPhdVZVQ"
                }
            };
            const token = response.data.token;
            localStorage.setItem('token', token);
            dispatch(authActions.loginSuccess(token));

            const from = location.state?.from?.pathname || "/";
            navigate(from, {replace: true});
        } catch (error) {
            console.error('Login failed:', error);
        }
    };

    return (
        <BlackTheme>
            <Container component="main" maxWidth="xs">
                <CssBaseline/>
                <Box
                    sx={{
                        marginTop: 8,
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                    }}
                >
                    <Avatar sx={{m: 1, bgcolor: 'secondary.main'}}>
                        <LockOutlinedIcon/>
                    </Avatar>
                    <Typography component="h1" variant="h5">
                        Sign in
                    </Typography>
                    <Box component="form" onSubmit={handleSubmit} noValidate sx={{mt: 1}}>
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            id="username"
                            label="Username or email address"
                            name="email"
                            autoComplete="email"
                            autoFocus
                        />
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            name="password"
                            label="Password"
                            type="password"
                            id="password"
                            autoComplete="current-password"
                        />
                        <FormControlLabel
                            control={<Checkbox value="remember" color="primary"/>}
                            label="Remember me"
                        />
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            sx={{mt: 3, mb: 2}}
                        >
                            Sign In
                        </Button>
                        <Grid container>
                            <Grid item xs>
                                <MuiLink variant="body2" component={Link} to="/reset_password">
                                    Forgot password?
                                </MuiLink>
                            </Grid>
                            <Grid item>
                                <MuiLink variant="body2" component={Link} to="/signup">
                                    {"Don't have an account? Sign Up"}
                                </MuiLink>
                            </Grid>
                        </Grid>
                    </Box>
                </Box>
            </Container>
        </BlackTheme>
    );
}