import React from "react";
import Button from "@mui/material/Button";
import { useTheme } from "@mui/material/styles";
import { SvgIconProps } from "@mui/material/SvgIcon";

interface Props {
    href: string;
    icon?: React.ReactElement<SvgIconProps>;
    text: string;
    children?: React.ReactNode;
}

const CustomButton: React.FC<Props> =({ href, icon, text, children}) => {
    const theme = useTheme();
    return(
        <Button
            component="a"
            color="primary"
            href={href}
            size="small"
            variant="text"
            sx={{
                color: 
                    theme.palette.mode === "dark" 
                    ? theme.palette.text.secondary
                    : theme.palette.text.primary,
                fontSize: theme.typography.subtitle1,
                fontWeight: "medium",
                mr: 2,
                "&:active": {
                    color:
                      theme.palette.mode === "dark"
                        ? theme.palette.primary.contrastText
                        : theme.palette.primary.main,
                  },
                  "&:hover": {
                    color:
                      theme.palette.mode === "dark"
                        ? theme.palette.primary.contrastText
                        : theme.palette.primary.main,
                  },
                  "& svg": {
                    mr: 0.5,
                  }
            }}
        >
        {icon}
        {text}    
        </Button>
    )
}

export default CustomButton