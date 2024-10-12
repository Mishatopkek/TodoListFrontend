import Card from "./JiraCard.jsx";
import Box from "@mui/material/Box";
import {Draggable, Droppable} from "@hello-pangea/dnd";
import {useCallback, useState} from "react";
import OutsideClickHandler from "../wrappers/OutsideClickHandler.jsx";
import {useDispatch, useSelector} from "react-redux";
import CreateIssueButton from "./Column/CreateIssueButton.jsx";
import CreateCard from "./Column/CreateCard.jsx";
import ColumnHeader from "./Column/ColumnHeader.jsx";
import {boardActions} from "../../store/boards.js";
import cardCreate from "../../api/Boards/Columns/Cards/CardCreate.js";

const Column = ({column, index}) => {
    const [onColumnHover, setOnColumnHover] = useState(false);
    const [showCreateCard, setShowCreateCard] = useState(false);
    const dispatch = useDispatch();
    const auth = useSelector(state => state.auth);

    const onSubmitInput = useCallback((title) => {
        if (title.length < 3) {
            return;
        }

        cardCreate(title, column.id, auth.token).then(
            card => dispatch(boardActions.addCard({
            columnId: column.id,
                card: {
                    id: card.id,
                    title
                }
            }))
        );

        setShowCreateCard(false);
    }, [dispatch, column.id, auth.token]);

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
                    onMouseEnter={() => setOnColumnHover(true)}
                    onMouseLeave={() => setOnColumnHover(false)}
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
                    <ColumnHeader column={column}/>
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
                                    {showCreateCard && <CreateCard onSubmit={onSubmitInput} onCancel={onOutsideClick}/>}
                                </OutsideClickHandler>
                                {!showCreateCard && <CreateIssueButton
                                    shouldBeShown={onColumnHover || column.isAlwaysVisibleAddCardButton}
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