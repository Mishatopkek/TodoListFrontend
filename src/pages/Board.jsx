import {CssBaseline, Typography} from "@mui/material";
import {useCallback, useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {boardActions} from "../store/boards.js";
import Box from "@mui/material/Box";
import {DragDropContext, Droppable} from "@hello-pangea/dnd";
import Column from "../components/UI/Column.jsx";
import CreateColumn from "../components/UI/Column/CreateColumn.jsx";
import IconButton from "@mui/material/IconButton";
import AddIcon from "@mui/icons-material/Add.js";
import {useLoaderData, useParams} from "react-router-dom";
import columnCreate from "../api/Boards/Columns/ColumnCreate.js";
import boardInitialize from "../api/Boards/BoardByName.js";
import columnOrder from "../api/Boards/Columns/ColumnOrder.js";

const Board = () => {
    let board = useSelector(state => state.board);
    const loadedData = useLoaderData();
    const dispatch = useDispatch();
    const {project} = useParams();
    const auth = useSelector(state => state.auth);
    board = useBoardInit(board, loadedData, dispatch, project, auth);
    const [showCreateColumn, setShowCreateColumn] = useState(false);

    const onAddColumnButtonClick = useCallback((event) => {
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

        columnCreate(title, board.id, auth.token).then(x => {
            dispatch(boardActions.addColumn({
                id: x.columnId,
                title: title,
                cards: []
            }));
        });
        setShowCreateColumn(false);
    }, [dispatch, board.id, auth.token]);

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
            <DragDropContext onDragEnd={dropResult => {
                if (dropResult.source === null || dropResult.destination === null) return columns;

                const order = {
                    columnId: dropResult.draggableId,
                    position: dropResult.destination.index
                };
                // Column reorder
                if (dropResult.source.droppableId === dropResult.destination.droppableId && dropResult.source.droppableId === "board") {

                    //Update position whatever result from backend
                    dispatch(boardActions.updateColumnPosition(order));

                    columnOrder(order.columnId, order.position, auth.token).then(isSuccess => {

                        //If server was not succeeded to update position, we return to the previous state
                        if (!isSuccess) {
                            boardActions.updateColumnPosition({
                                columnId: dropResult.draggableId,
                                position: dropResult.source.index
                            });
                        }
                    });
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
                                {!showCreateColumn && <IconButton aria-label="add" onClick={onAddColumnButtonClick}>
                                    <AddIcon/>
                                </IconButton>}
                            </Box>
                        </Box>
                    )}
                </Droppable>
            </DragDropContext>
        </>
    )
        ;
};

function useBoardInit(board, loadedData, dispatch, project, auth) {
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
            boardInitialize(project, auth.token).then(value => dispatch(boardActions.init(value)));
        }
    }, []);
    return board;
}
export default Board;