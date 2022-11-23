import React, { useState, useRef, useContext } from "react";
import { useTheme, alpha } from "@mui/material/styles";
import ColorModeContext from "../components/ColorModeContext";
import { Constants } from "../constants";
import Box from "@mui/material/Box";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Link from "@mui/material/Link";
import DashboardRoundedIcon from "@mui/icons-material/DashboardRounded";
import CustomButton from "../components/CustomButton";

interface Props {
    onSideBarOpen: () => void;
    children?: React.ReactNode;
}

const Header: React.FC<Props> = ({ onSideBarOpen }) => {
    const theme = useTheme();
    const anchorRef = useRef(null);
    const colorMode = useContext(ColorModeContext);
    const [avatarOpen, setAvatarOpen] = useState(false);

    const handleAvatarOpen = () => {
        setAvatarOpen(true);
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
                    <Link href="/" style={{ textDecoration: "none" }}>
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
                        <CustomButton href="/" icon={<DashboardRoundedIcon />} text="Dashboard" />
                        <CustomButton href="https://starscan.io/" text="Explorer" />
                    </Box>
                </Toolbar>
            </AppBar>

        </React.Fragment>
    )
}

export default Header;