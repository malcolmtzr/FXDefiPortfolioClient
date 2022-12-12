import React, { FC, ReactElement, useState } from 'react'
import PropTypes from "prop-types";
import Box from "@mui/material/Box";
import Fab from "@mui/material/Fab";
import NoSsr from "@mui/material/NoSsr";
import Zoom from "@mui/material/Zoom";
import useMediaQuery from "@mui/material/useMediaQuery";
import useScrollTrigger from "@mui/material/useScrollTrigger";
import { useTheme } from "@mui/material/styles";
import Header from './Header';

interface Props {
    children?: React.ReactNode;
}

const Layout: React.FC<Props> = ({ children }) => {
    const theme = useTheme();
    console.log(children)
    //Checks width of screen - for responsiveness.
    //True if max width for device 
    const isLg = useMediaQuery(theme.breakpoints.up("lg"), { defaultMatches: true });

    const [openSidebar, setOpenSidebar] = useState(false);

    const handleSidebarOpen = () => {
        setOpenSidebar(true);
        //currently nothing to display on click
    }

    const handleSidebarClose = () => {
        setOpenSidebar(false);
    }

    const open = isLg ? false : openSidebar;
    console.log(open);

    const trigger = useScrollTrigger({
        disableHysteresis: true,
        threshold: 100
    });
    console.log(trigger);

    const scrollTo = (id: any) => {
        setTimeout(() => {
            const element = document.querySelector(`#${id}`) as HTMLElement | null;
            console.log(element);
            if (!element) {
                return;
            }
            window.scrollTo({ left: 0, top: element.offsetTop, behavior: "smooth" })
        });
    }

    return (
        <Box
            id="page-top"
            sx={{
                backgroundColor: theme.palette.background.default,
                height: "100%",
                paddingTop: "60px",
            }}
        >
            <Header onSideBarOpen={handleSidebarOpen}/>
            <Box>{children}</Box>
        </Box>
    )
}

export default Layout;