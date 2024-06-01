import {Button, Typography} from "@mui/material";
import Card from "./JiraCard.jsx";
import Box from "@mui/material/Box";
import {Draggable, Droppable} from "@hello-pangea/dnd";
import {useState} from "react";

const Column = ({column, index}) => {
    const [onHover, setOnHover] = useState(false);
    return (
        <Draggable draggableId={column.id} index={index}>
            {(columnDraggableProvider, draggableSnapshot) => (
                <Box
                    onMouseEnter={() => setOnHover(true)}
                    onMouseLeave={() => setOnHover(false)}
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
                            <Box
                                sx={{
                                    paddingLeft: '128px',
                                    paddingRight: '128px',
                                }}
                            ></Box>
                            {column.cards.map((card, index) => (
                                <Card key={card.id} card={card} index={index}/>
                            ))}
                            {droppableCardProvider.placeholder}
                            <CreateIssueButton shouldBeShown={onHover || column.showAddCardByDefault}/>
                        </Box>
                    )}
                </Droppable>
                </Box>
            )}
        </Draggable>
    );
};
const CreateIssueButton = ({shouldBeShown}) => {
    return (
        shouldBeShown ? (
            <Button
                variant="text"
                sx={{
                    display: 'block',
                    textTransform: "none",
                    width: '100%',
                    textAlign: 'left'
                }}
            >
                + Create issue
            </Button>
        ) : (
            <div style={{
                width: '100%',
                height: '36px', // Set height to match the button's height
                textAlign: 'left'
            }}>
            </div>
        )
    );
};
export default Column;