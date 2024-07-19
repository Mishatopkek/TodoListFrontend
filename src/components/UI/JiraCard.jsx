import {Card, Tooltip, Typography} from "@mui/material";
import {Draggable} from "@hello-pangea/dnd";
import Box from "@mui/material/Box";
import {useCallback, useRef, useState} from "react";
import EditIcon from '@mui/icons-material/Edit';
import IconButton from "@mui/material/IconButton";
import InputWithButtons from "./InputWithButtons.jsx";
import {columnActions} from "../../store/columns.js";
import {useDispatch} from "react-redux";
import CardModal from "./CardModal.jsx";

const JiraCard = ({card, index}) => {
    const dispatch = useDispatch();
    const titleChangeRef = useRef(null);
    const [onCardHover, setOnCardHover] = useState(false);
    const [onEditTitle, setOnEditTitle] = useState(false);
    const [openModal, setOpenModal] = useState(false);

    const handleClickCard = useCallback(() => {
        setOpenModal(true);
    }, []);

    const handleCloseModal = useCallback(() => {
        setOpenModal(false);
    }, []);

    const handleEditClick = useCallback(() => {
        setOnEditTitle(true);
    }, []);

    const onSaveTitle = useCallback(() => {
        const inputValue = titleChangeRef.current.value;
        dispatch(columnActions.updateCard({
            id: card.id,
            title: inputValue
        }));
        setOnEditTitle(false);
    }, [dispatch, card.id]);

    const onChangeTitle = useCallback((event) => {
        if (event.key === 'Enter' || event.key === 'Escape') {
            onSaveTitle();
        }
    }, [onSaveTitle]);

    const onOutsideClick = useCallback(() => {
        onSaveTitle();
        setOnEditTitle(false);
    }, [onSaveTitle]);

    return (<Draggable
        draggableId={card.id}
        index={index}>
        {(provided, snapshot) => (<Box
            sx={{
                marginTop: '4px',
                marginDown: '4px',
                minWidth: 256,
                maxWidth: 256
            }}
            {...provided.draggableProps}
            {...provided.dragHandleProps}
            ref={provided.innerRef}>
            <Card
                onMouseEnter={() => setOnCardHover(true)}
                onMouseLeave={() => setOnCardHover(false)}
                onClick={handleClickCard}
                sx={{
                    padding: '8px',
                    cursor: 'pointer',
                    backgroundColor: onCardHover ? "#252525" : "#121212",
                    transition: "background 0.2s ease 0s"
                }}>
                {onEditTitle ?
                    <InputWithButtons
                        inputRef={titleChangeRef}
                        onInputChange={onChangeTitle}
                        onDone={onSaveTitle}
                        onClose={onSaveTitle}
                        onOutsideClick={onOutsideClick}
                        placeholder={"What stage should be added?"}
                        defaultValue={card.title}
                        paperSx={{
                            border: "1px solid rgba(255, 0, 0, .2)"
                        }}
                        inputSx={{
                            ml: 1,
                            flex: 1,
                            height: '100%',
                            margin: '0',
                            paddingLeft: "4px"
                        }}
                    /> :
                    <Box sx={{display: 'flex', alignItems: 'center'}}>
                        <Tooltip title={card.title} placement="bottom-start">
                            <Typography
                                variant="body2"
                                component="h2"
                                sx={{
                                    '&:hover': {
                                        textDecoration: 'underline',
                                    },
                                    marginRight: '6px'
                                }}
                            >
                                {card.title}
                            </Typography>
                        </Tooltip>
                        {onCardHover &&
                            <Tooltip title="Edit summary" placement="bottom-start">
                                <IconButton
                                    aria-label="edit"
                                    // aria-controls={isColumnSettingsOpen ? 'basic-menu' : undefined}
                                    aria-haspopup="true"
                                    // aria-expanded={isColumnSettingsOpen ? 'true' : undefined}
                                    onClick={(event) => {
                                        event.stopPropagation();
                                        handleEditClick();
                                    }}
                                    sx={{
                                        padding: "4px",
                                        transition: 'transform 0.2s ease-in-out',
                                        '&:hover': {
                                            transform: 'scale(1.5)'
                                        }
                                    }}
                                >
                                    <EditIcon sx={{
                                        fontSize: '.7rem'
                                    }}/>
                                </IconButton>
                            </Tooltip>}
                    </Box>}
                <Typography variant="body2" color="text.secondary">
                    tag1, tag2
                </Typography>
                <Typography variant="overline" color="cyan">
                    ❤️ KAN-123
                </Typography>
            </Card>
            <CardModal
                openModalState={openModal}
                onClose={handleCloseModal}
                card={card}
            />
        </Box>)}
    </Draggable>);
};

export default JiraCard;