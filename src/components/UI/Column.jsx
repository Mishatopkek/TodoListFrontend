import {Typography} from "@mui/material";
import Card from "./JiraCard.jsx";
import Box from "@mui/material/Box";
import {Draggable, Droppable} from "@hello-pangea/dnd";
import {useCallback, useState} from "react";
import OutsideClickHandler from "../wrappers/OutsideClickHandler.jsx";
import {useDispatch} from "react-redux";
import {columnActions} from "../../store/columns.js";
import CreateIssueButton from "./Column/CreateIssueButton.jsx";
import CreateCard from "./Column/CreateCard.jsx";

const Column = ({column, index}) => {
    const [onHover, setOnHover] = useState(false);
    const [showCreateCard, setShowCreateCard] = useState(false);
    const dispatch = useDispatch();

    const onSubmitInput = useCallback((text) => {
        const newCard = {
            id: new Date().getTime().toString(),
            title: text,
        };
        dispatch(columnActions.addCardToColumn({columnId: column.id, card: newCard}));

        setShowCreateCard(false);
    }, [dispatch, column.id]);

    const onCreateButton = useCallback(() => {
        setShowCreateCard(true);
    }, []);

    const onOutsideClick = useCallback(() => {
        setShowCreateCard(false);
    }, []);
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
                        cursor: "default!important",
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
                                <OutsideClickHandler onOutsideClick={onOutsideClick}>
                                    {showCreateCard && <CreateCard onSubmit={onSubmitInput}/>}
                                </OutsideClickHandler>
                                {!showCreateCard && <CreateIssueButton
                                    shouldBeShown={onHover || column.showAddCardByDefault}
                                    clickHandler={onCreateButton}
                                />}
                            </Box>
                        )}
                    </Droppable>
                </Box>
            )}
        </Draggable>
    );
};


export default Column;