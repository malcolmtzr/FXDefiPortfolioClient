import React, { useState, useRef, useContext } from "react";
import { useTheme, alpha } from "@mui/material/styles";
import ColorModeContext from "../components/ColorModeContext";
import { Constants } from "../constants";
import Box from "@mui/material/Box";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import { Link } from "react-router-dom";
import DashboardRoundedIcon from "@mui/icons-material/DashboardRounded";
import ComputerIcon from '@mui/icons-material/Computer';
import LightModeIcon from "@mui/icons-material/LightMode";
import DarkModeIcon from "@mui/icons-material/DarkMode";
import CustomButton from "../components/CustomButton";
import Divider from "@mui/material/Divider";
import UserAvatar from "../components/UserAvatar";

interface Props {
    onSideBarOpen: () => void;
    children?: React.ReactNode;
}

const Header: React.FC<Props> = ({ onSideBarOpen }) => {
    const theme = useTheme();
    const colorMode = useContext(ColorModeContext);
    const [avatarOpen, setAvatarOpen] = useState(false);
    const isLoggedIn: boolean = true;

    const handleAvatarOpen = () => {
        setAvatarOpen(true);
        console.log("open");
    }

    const handleAvatarClose = () => {
        setAvatarOpen(false);
    }

    return (
        <React.Fragment>
            <AppBar
                elevation={5}
                sx={{
                    top: 0,
                    border: 0,
                    backgroundColor: theme.palette.background.default,
                    color: theme.palette.text.secondary
                }}
            >
                <Toolbar sx={{ minHeight: 70 }}>
                    {/* Side bar button component will only be displayed only on md, & hidden on lg */}
                    <Box alignItems="center" sx={{ display: { md: "block", lg: "none" } }}>
                        <Button
                            color="inherit"
                            variant="outlined"
                            onClick={() => onSideBarOpen()}
                            sx={{
                                borderRadius: 4,
                                minWidth: "auto",
                                padding: 1,
                                color: theme.palette.text.secondary,
                                //borderColor: alpha(theme.palette.text.secondary, 0.2),
                            }}>
                            <MenuIcon fontSize="small" />
                        </Button>
                    </Box>
                    <Link to="/" style={{ textDecoration: "none" }}>
                        <Box>
                            <IconButton size="large" disabled>
                                {/* To add on Fx Logo here */}
                                <Typography
                                    variant="h3"
                                    //component="div"
                                    sx={{
                                        flexGrow: 1,
                                        color: theme.palette.text.primary,
                                        fontWeight: "bold",
                                        display: {
                                            md: "inline",
                                            xs: "none"
                                        }
                                    }}
                                >
                                    {Constants.Layout.APP_TITLE}
                                </Typography>
                            </IconButton>
                        </Box>
                    </Link>
                    <Box sx={{ flexGrow: 1 }} />
                    {/* Hides header buttons except theme toggler, and avatar*/}
                    <Box alignItems="center" sx={{ display: { xs: "none", md: "none", lg: "flex" } }}>
                        {/* Header buttons/tabs go here */}
                        <CustomButton link="/" external={false} icon={<DashboardRoundedIcon />} text={Constants.Layout.DASHBOARD} />
                        <CustomButton link="https://starscan.io/" external={true} icon={<ComputerIcon />} text={Constants.Layout.EXPLORER} />
                    </Box>
                    <Divider
                        orientation="vertical"
                        sx={{ height: 32, mx: 2, display: { lg: "flex", md: "none", xs: "none" } }}
                    />
                    <Box sx={{ display: "flex" }}>
                        <IconButton
                            onClick={colorMode.toggleColorMode}
                            color={theme.palette.mode === "dark" ? "warning" : "inherit"}
                        >
                            {theme.palette.mode === "dark" ? (<LightModeIcon fontSize="medium" />) : (<DarkModeIcon fontSize="medium" />)}
                        </IconButton>
                    </Box>
                    <Divider
                        orientation="vertical"
                        sx={{ height: 32, mx: 2, display: { lg: "flex", md: "none", xs: "none" } }}
                    />
                    <Box sx={{ display: { lg: "flex", md: "none", xs: "none" } }}>
                        <UserAvatar />
                    </Box>
                </Toolbar>
            </AppBar>
        </React.Fragment>
    )
}

export default Header;