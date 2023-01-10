import React from "react";
import Button from "@mui/material/Button";
import { Link } from "react-router-dom";
import { useTheme } from "@mui/material/styles";
import { SvgIconProps } from "@mui/material/SvgIcon";
import { useNavigate } from "react-router-dom";

interface Props {
    link: string;
    icon?: React.ReactElement<SvgIconProps>;
    text: string;
    external: boolean;
    children?: React.ReactNode;
}

const CustomButton: React.FC<Props> =({ link, icon, text, external, children}) => {
    const theme = useTheme();
    const navigate = useNavigate();

    const handleLink= (url: string) => {
      if (external) {
        window.location.replace(url)
      } else {
        navigate("/");
      }
    }

    return(
        <Button
            component="a"
            color="primary"
            size="small"
            variant="text"
            onClick={() => handleLink(link)}
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