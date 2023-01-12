import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Box from "@mui/material/Box";
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { useTheme } from '@mui/material/styles';
import { Constants } from "../constants";
import axios from "axios";
import { useAppSelector, useAppDispatch } from "../hooks/ReduxHooks"
import { UserInterface } from "../redux/userSlice";
import { selectUser, setUser } from "../redux/userSlice";
import { selectAuth, login } from "../redux/authSlice";

interface Props { }

export interface UserLogin {
    message: string;
    user: UserInterface
}

export interface LoginData {
    email: string;
    password: string;
}

const Login: React.FC<Props> = () => {
    const user = useAppSelector(selectUser);
    const auth = useAppSelector(selectAuth);
    const dispatch = useAppDispatch();
    const theme = useTheme();
    const navigate = useNavigate();

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const formData: any = new FormData(event.currentTarget);
        const loginData: LoginData  = {
            email: formData.get("email"),
            password: formData.get("password"),
        }
        try {
            const res: any = await dispatch(login(loginData));
            console.log(res);
            // const resType: string = res.type;
            // console.log(resType);
            const userPayload: UserLogin = res.payload;
            console.log(userPayload);
            const loginUser: UserInterface = {
                id: userPayload.user.id,
                name: userPayload.user.name,
                email: userPayload.user.email,
                notes: userPayload.user.notes,
                seq: userPayload.user.seq,
            }
            dispatch(setUser(loginUser))
            navigate("/");

        }
        catch (error) {
            if (axios.isAxiosError(error)) {
                console.log(error.message);
            }
        }

    }

    return (
        <Box
            sx={{
                marginTop: 8,
                display: "flex",
                flexDirection: "column",
                alignItems: "center"
            }}>

            <Typography
                variant="h2"
                sx={{
                    color: theme.palette.text.primary,
                    fontWeight: "bold"
                }}
            >
                {Constants.Auth.LOGIN_HEADER}
            </Typography>
            <Typography
                variant="h4"
                sx={{
                    color: theme.palette.text.secondary
                }}
            >
                {Constants.Auth.LOGIN_SUBHEADER}
            </Typography>
            <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
                <TextField
                    margin="normal"
                    required
                    fullWidth
                    id="email"
                    label="Email Address"
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
                <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    sx={{ mt: 3, mb: 2 }}
                >
                    {Constants.Auth.SIGN_IN}
                </Button>
                <Grid container>
                    <Grid item xs>
                        <Link href="#" variant="body2">
                            {Constants.Auth.FORGOT_PASSWORD}
                        </Link>
                    </Grid>
                    <Grid item>
                        <Link href="#" variant="body2">
                            {Constants.Auth.SIGN_UP}
                        </Link>
                    </Grid>
                </Grid>
            </Box>
        </Box>
    )
}

export default Login;