import {Link, useNavigate} from "react-router-dom";
import Box from "@mui/material/Box";
import {Typography} from "@mui/material";
import Divider from '@mui/material/Divider';
import BoardCard from "../components/UI/Home/BoardCard.jsx";
import {useCallback} from "react";

const Home = () => {
    const navigate = useNavigate();
    const handleCardClick = useCallback(() => {
        navigate("/misha/testboard")
    }, [navigate]);
    return (
        <>
            <Typography variant="h2">Your work</Typography>
            <Divider/>
            <Typography variant="h3">Recent projects</Typography>
            <BoardCard title="My Kanban Project" onClick={handleCardClick}/>
            <Box>
                <ul>
                    <li><Link to="misha">Test Misha page</Link></li>
                </ul>
            </Box>
        </>
    );
};
export default Home;