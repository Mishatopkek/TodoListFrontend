import {boardActions} from "../../../store/boards.js";
import columnOrder from "../../../api/Boards/Columns/ColumnOrder.js";
import cardOrder from "../../../api/Boards/Columns/Cards/Details/ColumnOrder.js";
import ColumnGenerator from "./ColumnGenerator.jsx";
import {useDispatch, useSelector} from "react-redux";
import {DragDropContext, Droppable} from "@hello-pangea/dnd";
import Box from "@mui/material/Box";

const BoardSection = ({board}) => {
    const dispatch = useDispatch();
    const token = useSelector(state => state.auth.token);

    const columnDrop = (dropResult) => {
        //TODO fix bug when you can't drop a column to the rightest part of the grid
        if (dropResult.source === null || dropResult.destination === null) return columns;

        const order = {
            columnId: dropResult.draggableId,
            position: dropResult.destination.index + 1 // +1 because the index starts with 0 
        };

        // Column reorder
        if (dropResult.source.droppableId === dropResult.destination.droppableId && dropResult.source.droppableId === "board") {

            //Update position whatever result from backend
            dispatch(boardActions.updateColumnPosition(order));

            columnOrder(order.columnId, order.position, token).then(isSuccess => {

                //If server was not succeeded to update position, we return to the previous state
                if (!isSuccess) {
                    boardActions.updateColumnPosition({
                        columnId: order.columnId,
                        position: order.position
                    });
                }
            });
        } else {
            // Card move
            const order = {
                cardId: dropResult.draggableId,
                sourceColumnId: dropResult.source.droppableId,
                destinationColumnId: dropResult.destination.droppableId,
                position: dropResult.destination.index + 1,
            };
            dispatch(boardActions.updateCardPositionInColumn(order));

            cardOrder(order.cardId, order.destinationColumnId, order.position, token)
                .then(isSuccess => {
                    if (!isSuccess) {
                        dispatch(boardActions.updateCardPositionInColumn({
                            cardId: order.cardId,
                            sourceColumnId: order.destinationColumnId,
                            destinationColumnId: order.sourceColumnId,
                            position: dropResult.source.index + 1,
                        }));
                    }
                });
        }
    }

    return (
        <DragDropContext onDragEnd={columnDrop}> {/*All columns can be dragged and dropped here.*/}
            <Droppable
                droppableId="board"
                type="COLUMN"
                direction="horizontal"
                sx={{display: 'flex', height: '100%'}}
            >
                {droppableProvided =>
                    <Box
                        // Pointer that these elements are part of the columns
                        ref={droppableProvided.innerRef}
                        {...droppableProvided.droppableProps}
                        sx={{display: 'flex', height: '100%'}}
                    >
                        <ColumnGenerator board={board} droppableProvided={droppableProvided}/>
                    </Box>
                }
            </Droppable>
        </DragDropContext>
    );
};
export default BoardSection;