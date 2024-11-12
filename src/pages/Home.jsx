import {useNavigate} from "react-router-dom";
import {Typography} from "@mui/material";
import Divider from '@mui/material/Divider';
import BoardCard from "../components/UI/Home/BoardCard.jsx";
import {useCallback, useEffect, useState} from "react";
import {useSelector} from "react-redux";
import FetchBoardList from "../api/Boards/BoardList.js";
import Grid from "@mui/material/Grid";

const Home = () => {
    const navigate = useNavigate();
    const auth = useSelector(state => state.auth);
    const [projects, setProjects] = useState([]);
    useEffect(() => {
        if (auth.isAuthenticated) {
            FetchBoardList(auth.token)
                .then(x => x.json())
                .then(x => setProjects(x));
        } else {
            setProjects([]);
        }
    }, [auth.isAuthenticated]);
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
            <Grid container spacing={2}>
                {projects.map(project => (
                    <Grid item key={project.id}>
                        <BoardCard title={project.title} onClick={() => handleCardClick(project)}/>
                    </Grid>
                ))}
            </Grid>
        </>
    );
};
export default Home;