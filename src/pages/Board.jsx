import {CssBaseline, Typography} from "@mui/material";
import {useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import {boardActions} from "../store/boards.js";
import Box from "@mui/material/Box";
import {useLoaderData, useParams} from "react-router-dom";
import boardInitialize from "../api/Boards/BoardByName.js";
import BoardSection from "../components/UI/Board/BoardSection.jsx";

const Board = () => {
    const dispatch = useDispatch();
    const loadedData = useLoaderData();
    const {project, username} = useParams();
    const token = useSelector(state => state.auth.token);
    let board = useSelector(state => state.board);

    if (!board) {
        board = loadedData;
    }
    if (!board) {
        board = {
            id: null,
            title: null,
            columns: []
        };
    }

    useEffect(() => {
        if (loadedData) {
            dispatch(boardActions.init(loadedData));
        } else {
            boardInitialize(username, project, token).then(value => dispatch(boardActions.init(value)));
        }
    }, []);

    return (
        <>
            <CssBaseline/>
            <Box marginTop={4}>
                <Typography variant="h6"
                            component="h6">https://mui.com/material-ui/react-breadcrumbs/</Typography>
            </Box>
            <Box marginTop={4}>
                <Typography variant="h4" component="h1">{board.title}</Typography>
            </Box>
            <BoardSection board={board}/>
        </>
    );
};

export default Board;