import * as React from 'react';
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
import {Link} from "react-router-dom";
import BlackTheme from "../components/wrappers/BlackTheme.jsx";
import useUserLogin from "../api/Users/UserLogin.js";

export default function Login() {
    const {signUp, validationErrors, setValidationErrors} = useUserLogin();

    const handleSubmit = (event) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);
        const userData = {
            login: data.get('username'),
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
                        Sign in
                    </Typography>
                    <Box component="form" onSubmit={handleSubmit} noValidate sx={{mt: 1}}>
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            id="username"
                            label="Username or email address"
                            name="username"
                            autoComplete="username"
                            autoFocus
                            onChange={() => onInputChange("login")}
                            error={!!validationErrors.errors?.login}
                            helperText={!!validationErrors.errors?.login && validationErrors.errors.login[0]}
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
                            onChange={() => onInputChange("password")}
                            error={!!validationErrors.errors?.password}
                            helperText={!!validationErrors.errors?.password && validationErrors.errors.password[0]}
                        />
                        {validationErrors && validationErrors.statusCode === 404 && validationErrors.message && (
                            <Typography color="error" variant="body2">
                                {validationErrors.message}
                            </Typography>
                        )}
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