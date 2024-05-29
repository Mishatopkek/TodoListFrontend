import {Typography} from "@mui/material";
import JiraCard from "./JiraCard.jsx";
import Box from "@mui/material/Box";
import {Draggable, Droppable} from "@hello-pangea/dnd";

const Column = ({column, index}) => {
    return (
        <Draggable draggableId={column.id} index={index}>
            {(columnDraggableProvider, draggableSnapshot) => (
                <Box
                    ref={columnDraggableProvider.innerRef}
                    {...columnDraggableProvider.draggableProps}
                    {...columnDraggableProvider.dragHandleProps}
                    sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        backgroundColor: 'black',
                        marginLeft: '4px',
                        marginRight: '4px',
                        paddingLeft: '4px',
                        paddingRight: '4px',
                    }}
                >
                    <Typography variant="h6" component="h2">
                        {column.title}
                    </Typography>
                <Droppable
                    droppableId={column.id}
                    type="CARD"
                >
                    {(droppableCardProvider, droppableSnapshot) => (
                            <Box
                                ref={droppableCardProvider.innerRef}
                                {...droppableCardProvider.droppableProps}
                                sx={{
                                    flexGrow: 1 // Allow the droppable area to grow
                                }}
                            >
                                <Box>
                                    <Box
                                        sx={{
                                            paddingLeft: '128px',
                                            paddingRight: '128px',
                                        }}
                                    ></Box>
                                    {column.cards.map((card, index) => (
                                        <JiraCard key={card.id} card={card} index={index}/>
                                    ))}
                                    {droppableCardProvider.placeholder}
                                </Box>
                            </Box>
                    )}
                </Droppable>
                </Box>
            )}
        </Draggable>
    );
};
export default Column;