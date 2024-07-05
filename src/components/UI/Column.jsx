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
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import IconButton from "@mui/material/IconButton";
import MenuItem from "@mui/material/MenuItem";
import Menu from "@mui/material/Menu";

const Column = ({column, index}) => {
    const [onColumnHover, setOnColumnHover] = useState(false);
    const [onColumnHeaderHover, setOnColumnHeaderHover] = useState(false);
    const [showCreateCard, setShowCreateCard] = useState(false);
    const dispatch = useDispatch();
    const [onColumnOption, setOnColumnOption] = useState(null);
    const isColumnSettingsOpen = Boolean(onColumnOption);

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
    const handleClick = (event) => {
        setOnColumnOption(event.currentTarget);
    };
    const handleClose = () => {
        setOnColumnOption(null);
    };
    const onDeleteColumn = () => {
        setOnColumnOption(null);
        dispatch(columnActions.remove(column.id));
    };

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
                    <Box
                        onMouseEnter={() => setOnColumnHeaderHover(true)}
                        onMouseLeave={() => setOnColumnHeaderHover(false)}
                        sx={{
                            display: 'flex',
                            justifyContent: 'space-between',
                            alignItems: 'center',
                        }}>
                        <Typography variant="h6" component="h2" sx={{padding: "4px 0"}}>
                            {column.title}
                        </Typography>
                        {/*https://mui.com/material-ui/react-menu/*/}
                        {onColumnHeaderHover &&
                            <IconButton
                                aria-label="more"
                                aria-controls={isColumnSettingsOpen ? 'basic-menu' : undefined}
                                aria-haspopup="true"
                                aria-expanded={isColumnSettingsOpen ? 'true' : undefined}
                                onClick={handleClick}>
                                <MoreHorizIcon sx={{fontSize: '1.5rem'}}/>
                            </IconButton>
                        }
                        <Menu
                            id="basic-menu"
                            anchorEl={onColumnOption}
                            open={isColumnSettingsOpen}
                            onClose={handleClose}
                            MenuListProps={{
                                'aria-labelledby': 'basic-button',
                            }}
                        >
                            <MenuItem onClick={onDeleteColumn}>Delete</MenuItem>
                        </Menu>
                    </Box>
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
                                    shouldBeShown={onColumnHover || column.showAddCardByDefault}
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