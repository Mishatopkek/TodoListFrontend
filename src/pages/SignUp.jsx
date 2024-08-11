import * as React from 'react';
import {useCallback, useState} from 'react';
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
import BlackTheme from "../components/wrappers/BlackTheme.jsx";
import {Link, useLocation, useNavigate} from "react-router-dom";
import {authActions} from "../store/auth.js";
import {useDispatch} from "react-redux";
import config from "../../config.js";

export default function SignUp() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const location = useLocation();
    // const [afterSignUp, setAfterSignUp] = useState(false);
    const [validationErrors, setValidationErrors] = useState({});

    const handleSubmit = (event) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);
        const userData = {
            name: data.get('username'),
            email: data.get('email'),
            password: data.get('password'),
        };

        fetch(`${config.backendUrl}/api/User/SignUp`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(userData)
        })
            .then(response => {
                if (response.status === 201) {
                    return response.json().then(data => {
                        const token = data.token;
                        localStorage.setItem('token', token);
                        dispatch(authActions.loginSuccess(token));

                        const from = location.state?.from?.pathname || "/";
                        navigate(from, {replace: true});
                    });
                } else if (response.status === 400 || response.status === 409) {
                    return response.json().then(data => {
                        setValidationErrors(data.errors);
                    });
                } else {
                    // Handle other status codes
                    console.error('Unexpected status code:', response.status);
                }
            });
    };

    const onInputChange = useCallback((inputName) => {
        setValidationErrors(prevState => {
            delete prevState[inputName];
            return prevState;
        })
    }, []);

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
                        Sign up
                    </Typography>
                    <Box component="form" noValidate onSubmit={handleSubmit} sx={{mt: 3}}>
                        <Grid container spacing={2}>
                            <Grid item xs={12}>
                                <TextField
                                    required
                                    fullWidth
                                    id="username"
                                    label="Username"
                                    name="username"
                                    autoComplete="username"
                                    onChange={() => onInputChange("name")}
                                    error={!!validationErrors.name}
                                    helperText={!!validationErrors.name && validationErrors.name[0]}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    required
                                    fullWidth
                                    id="email"
                                    label="Email Address"
                                    name="email"
                                    autoComplete="email"
                                    onChange={() => onInputChange("email")}
                                    error={!!validationErrors.email}
                                    helperText={!!validationErrors.email && validationErrors.email[0]}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    required
                                    fullWidth
                                    name="password"
                                    label="Password"
                                    type="password"
                                    id="password"
                                    autoComplete="new-password"
                                    onChange={() => onInputChange("password")}
                                    error={!!validationErrors?.password}
                                    helperText={!!validationErrors.password && validationErrors.password[0]}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <FormControlLabel
                                    control={<Checkbox value="allowExtraEmails" color="primary"/>}
                                    label="I want to receive inspiration, marketing promotions and updates via email."
                                />
                            </Grid>
                        </Grid>
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            sx={{mt: 3, mb: 2}}
                        >
                            Sign Up
                        </Button>
                        <Grid container justifyContent="flex-end">
                            <Grid item>
                                <MuiLink href="#" variant="body2" component={Link} to="/login">
                                    Already have an account? Sign in
                                </MuiLink>
                            </Grid>
                        </Grid>
                    </Box>
                </Box>
            </Container>
        </BlackTheme>
    );
}