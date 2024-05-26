import {Typography} from "@mui/material";
import JiraCard from "./JiraCard.jsx";
import Box from "@mui/material/Box";
import {Draggable, Droppable} from "@hello-pangea/dnd";

const Column = ({column, index}) => {
    return (
        <Draggable draggableId={column.id} index={index}>
            {(draggableProvider, draggableSnapshot) => (
                <Droppable
                    droppableId={column.id}
                    type="CARD"
                >
                    {(droppableProvider, droppableSnapshot) => (
                        <Box
                            ref={draggableProvider.innerRef}
                            {...draggableProvider.draggableProps}
                            {...draggableProvider.dragHandleProps}
                            sx={{
                                display: 'flex',
                                backgroundColor: 'black',
                                marginLeft: '4px',
                                marginRight: '4px',
                                paddingLeft: '4px',
                                paddingRight: '4px'
                            }}
                        >
                            <Box
                                ref={droppableProvider.innerRef}
                                {...droppableProvider.droppableProps}>
                                <Typography variant="h6" component="h2">
                                    {column.title}
                                </Typography>
                                <Box
                                >
                                    {column.cards.map((card, index) => (
                                        <JiraCard key={card.id} card={card} index={index}/>
                                    ))}
                                    {droppableProvider.placeholder}
                                </Box>
                            </Box>
                        </Box>
                    )}
                </Droppable>
            )}
        </Draggable>
    );
};
export default Column;