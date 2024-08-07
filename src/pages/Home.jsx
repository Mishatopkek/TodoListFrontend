import {Link, useNavigate} from "react-router-dom";
import Box from "@mui/material/Box";
import {Typography} from "@mui/material";
import Divider from '@mui/material/Divider';
import BoardCard from "../components/UI/Home/BoardCard.jsx";
import {useCallback, useState} from "react";
import {useSelector} from "react-redux";

const Home = () => {
    const navigate = useNavigate();
    const auth = useSelector(state => state.auth);
    const [projects, setProjects] = useState([{
        id: "B6DED1FA-53E2-4EA6-9793-2E37E9920774",
        name: "SuperMisha",
        title: "The board full of Misha",
        author: "Misha"
    }]);
    const handleCardClick = useCallback((project) => {
        const {author, name} = project;
        const url = `/${author}/${name}`;
        navigate(url);
    }, [navigate]);
    return (
        <>
            <Typography variant="h2">Your work</Typography>
            <Divider/>
            <Typography variant="h3">Recent projects</Typography>
            {projects.map(project => (
                <BoardCard key={project.id} title={project.title} onClick={() => handleCardClick(project)}/>
            ))}
            <Box>
                <ul>
                    <li><Link to="misha">Test Misha page</Link></li>
                </ul>
            </Box>
            <Typography>{JSON.stringify(auth)}</Typography>
        </>
    );
};
export default Home;