import React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button"
import { useAppSelector, useAppDispatch } from "../hooks/ReduxHooks"
import axios from "axios";

const Dashboard: React.FC = () => {

    const handleClick = async () => {
        const res: any = await axios.get<any>(
            "http://localhost:4000/getusers",
            {
                withCredentials: true
            }
        );
        console.log(res);
    }

    return (
        <Box>
            <h1>
                Dashboard
                <Button onClick={handleClick}>Test</Button>
            </h1>
        </Box>
    )
}

export default Dashboard;