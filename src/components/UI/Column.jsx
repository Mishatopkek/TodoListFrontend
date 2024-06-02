import {Button, Paper, Typography} from "@mui/material";
import Card from "./JiraCard.jsx";
import Box from "@mui/material/Box";
import {Draggable, Droppable} from "@hello-pangea/dnd";
import {useState} from "react";
import InputBase from "@mui/material/InputBase";

const Column = ({column, index}) => {
    const [onHover, setOnHover] = useState(false);
    const [currentColumn, setCurrentColumn] = useState(column);
    return (
        <Draggable draggableId={currentColumn.id} index={index}>
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
                        {currentColumn.title}
                    </Typography>
                    <Droppable
                        droppableId={currentColumn.id}
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
                                {currentColumn.cards.map((card, index) => (
                                    <Card key={card.id} card={card} index={index}/>
                                ))}
                                {droppableCardProvider.placeholder}
                                <Paper
                                    sx={{
                                        margin: '22px 4px',
                                        display: 'flex',
                                        alignItems: 'flex-start'
                                    }}
                                >
                                    <InputBase
                                        sx={{ml: 1, flex: 1}}
                                        placeholder="What needs to be done"
                                        inputProps={{'aria-label': 'search google maps'}}
                                    />
                                </Paper>
                                <CreateIssueButton shouldBeShown={onHover || currentColumn.showAddCardByDefault}/>
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
                    textAlign: 'left',
                    color: 'lightgray',
                }}
            >
                + Create issue
            </Button>
        ) : (
            <div style={{
                width: '100%',
                height: '36px', // Set height to match the button's height
                textAlign: 'left',
            }}>
            </div>
        )
    );
};
export default Column;