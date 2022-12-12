import React from "react";
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

interface Props {

}

const Login: React.FC<Props> = () => {
    const theme = useTheme();


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
            <Box>
                
            </Box>
        </Box>
    )
}

export default Login;