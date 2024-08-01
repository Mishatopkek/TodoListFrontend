import './App.css'
import {createTheme, CssBaseline, ThemeProvider, Typography} from "@mui/material";
import MiniDrawer from "./components/UI/Drawer.jsx";
import Box from "@mui/material/Box";
import {DragDropContext, Droppable} from "@hello-pangea/dnd";
import Column from "./components/UI/Column.jsx";
import {useDispatch, useSelector} from "react-redux";
import IconButton from "@mui/material/IconButton";
import AddIcon from '@mui/icons-material/Add';
import {useCallback, useState} from "react";
import CreateColumn from "./components/UI/Column/CreateColumn.jsx";
import {boardActions} from "./store/boards.js";

function App() {
    const darkTheme = createTheme({
        palette: {
            mode: 'dark',
        },
    });
    const [showCreateColumn, setShowCreateColumn] = useState(false);
    const dispatch = useDispatch();
    const board = useSelector(state => state.board);
    const onIconButtonClick = useCallback((event) => {
        setShowCreateColumn(true);
    }, []);

    const onOutsideClick = useCallback(() => {
        setShowCreateColumn(false);
    }, []);

    const onCancelColumn = useCallback(() => {
        setShowCreateColumn(false);
    }, []);

    const onSubmitColumn = useCallback((title) => {
        if (title.length < 3) {
            return;
        }

        dispatch(boardActions.addColumn({
            id: crypto.randomUUID(),
            title: title,
            cards: []
        }));
        setShowCreateColumn(false);
    }, [dispatch]);

    return (
        <ThemeProvider theme={darkTheme}>
            <MiniDrawer/>
            <main style={{
                display: 'block',
                overflowY: 'auto',
                height: '100%'
            }}>
                <Box style={{
                    display: 'block',
                    overflowY: 'auto',
                    paddingTop: 64,
                    paddingLeft: 64 + 64, // left drawer + extra space
                    height: '100%',
                }}>
                    <CssBaseline/>
                    <Box marginTop={4}>
                        <Typography variant="h6"
                                    component="h6">https://mui.com/material-ui/react-breadcrumbs/</Typography>
                    </Box>
                    <Box marginTop={4}>
                        <Typography variant="h4" component="h1">{board.title}</Typography>
                    </Box>
                    <DragDropContext onDragEnd={dropResult => {
                        if (dropResult.source === null || dropResult.destination === null) return columns;

                        // Column reorder
                        if (dropResult.source.droppableId === dropResult.destination.droppableId && dropResult.source.droppableId === "board") {
                            dispatch(boardActions.updateColumnPosition(dropResult));
                        } else {
                            // Card move
                            dispatch(boardActions.updateCardPositionInColumn(dropResult));
                        }
                    }}>
                        <Droppable
                            droppableId="board"
                            type="COLUMN"
                            direction="horizontal"
                            // ignoreContainerClipping={true}
                            sx={{display: 'flex', height: '100%'}}
                        >
                            {provided => (
                                <Box
                                    ref={provided.innerRef}
                                    {...provided.droppableProps}
                                    sx={{display: 'flex', height: '100%'}}
                                >
                                    {board.columns.map((column, index) =>
                                        <Column key={column.id} index={index} column={column}/>
                                    )}
                                    {provided.placeholder}

                                    <Box>
                                            {showCreateColumn &&
                                                <CreateColumn
                                                    onSubmit={onSubmitColumn}
                                                    onCancel={onCancelColumn}
                                                    onOutsideClick={onOutsideClick}
                                                />}
                                        {!showCreateColumn && <IconButton aria-label="add" onClick={onIconButtonClick}>
                                            <AddIcon/>
                                        </IconButton>}
                                    </Box>
                                </Box>
                            )}
                        </Droppable>
                    </DragDropContext>
                </Box>
            </main>
        </ThemeProvider>
    );
}

export default App