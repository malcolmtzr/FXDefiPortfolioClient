import React, { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import Box from "@mui/material/Box";
import ButtonBase from "@mui/material/ButtonBase";
import Button from "@mui/material/Button";
import Tooltip from "@mui/material/Tooltip";
import Popover from "@mui/material/Popover";
import Avatar from "@mui/material/Avatar";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import MenuItem from "@mui/material/MenuItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import UserIcon from "@mui/icons-material/Person";
import TextSnippetIcon from '@mui/icons-material/TextSnippet';
import { useTheme } from "@mui/material/styles";
import { Link } from "react-router-dom";
import { useAppSelector, useAppDispatch } from "../hooks/ReduxHooks"
import { selectUser, removeUser } from "../redux/userSlice";

interface Props {
    // onHandleAvatarOpen: () => void;
    // onHandleAvatarClose: () => void;
    // onAvatarOpen: boolean;
    isLoggedIn?: boolean;
    children?: React.ReactNode;
}

const UserAvatar: React.FC<Props> = ({ isLoggedIn, children }) => {
    const user = useAppSelector(selectUser);
    const dispatch = useAppDispatch();
    const navigate = useNavigate();

    const theme = useTheme();
    const anchorRef = useRef(null);
    const [avatarOpen, setAvatarOpen] = useState(false);

    const handleLogin = () => {
        navigate("/Login")
    }

    const handleLogout = () => {
        //reset state
        dispatch(removeUser())
        navigate("/");
    }

    const handleAvatarOpen = () => {
        setAvatarOpen(true);
    }

    const handleAvatarClose = () => {
        setAvatarOpen(false);
    }

    //Logic for rendering logged in user or no user
    const render = () => {
        //if user true... else return login/register
        const loggedIn = true;
        if (loggedIn) {
            return (
                <Box>
                    <Typography variant="subtitle1" color={theme.palette.text.primary} sx={{ textAlign: "center" }}>
                        {user.name}
                    </Typography>
                    <Divider />
                    <Box sx={{ mt: 2 }}>
                        {/* MenuItem component={Link} to="#" */}
                        <MenuItem component={Link} to="#">
                            <ListItemIcon>
                                <UserIcon fontSize="small" />
                            </ListItemIcon>
                            <ListItemText
                                primary={
                                    <Typography variant="subtitle2" color={theme.palette.text.primary}>
                                        {"Profile"}
                                    </Typography>
                                }
                            />
                        </MenuItem>
                        <MenuItem component={Link} to="#">
                            <ListItemIcon>
                                <TextSnippetIcon fontSize="small" />
                            </ListItemIcon>
                            <ListItemText
                                primary={
                                    <Typography variant="subtitle2" color={theme.palette.text.primary}>
                                        {"Private Notes"}
                                    </Typography>
                                }
                            />
                        </MenuItem>
                    </Box>
                    <Box sx={{ p: 1 }}>
                        <Button onClick={() => handleLogout()} color="primary" fullWidth variant="outlined">
                            {"Logout"}
                        </Button>
                    </Box>
                </Box>
            );
        } else {
            return (
                <Box>
                    <Button onClick={() => handleLogin()} fullWidth>
                        <Typography variant="subtitle2" color={theme.palette.text.primary}>
                            {"Login"}
                        </Typography>
                    </Button>
                </Box>
            );
        }
    }
    return (
        <Box>
            <Box
                component={ButtonBase}
                onClick={handleAvatarOpen}
                ref={anchorRef}
                sx={{
                    alignItems: "center",
                    display: "flex"
                }}
            >
                <Avatar
                    sx={{
                        height: 32,
                        width: 32,
                        backgroundColor: theme.palette.primary.main
                    }}
                //src -> image url
                />
            </Box>
            <Popover
                anchorEl={anchorRef.current}
                anchorOrigin={{
                    horizontal: "center",
                    vertical: "bottom"
                }}
                keepMounted
                open={avatarOpen}
                onClose={handleAvatarClose}
                PaperProps={{
                    sx: { width: 200 }
                }}
            >
                <Box sx={{ p: 1.5 }}>
                    {render()}
                </Box>
            </Popover>
        </Box>
    )
}

export default UserAvatar