﻿import * as React from 'react';
import {useCallback} from 'react';
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
import {Link} from "react-router-dom";
import useUserSignUp from "../api/Users/UserSignUp.js";

export default function SignUp() {
    const {signUp, validationErrors, setValidationErrors} = useUserSignUp();

    const handleSubmit = (event) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);
        const userData = {
            name: data.get('username'),
            email: data.get('email'),
            password: data.get('password'),
        };

        signUp(userData).then();
    };

    const onInputChange = useCallback((inputName) => {
        setValidationErrors((prevState) => {
            const newState = {...prevState};
            delete newState[inputName];
            return newState;
        });
    }, [setValidationErrors]);

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