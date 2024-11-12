import Box from "@mui/material/Box";
import {Modal, TextField, Typography} from "@mui/material";
import IconButton from "@mui/material/IconButton";
import CloseIcon from '@mui/icons-material/Close';
import CommentSection from "./CommentSection.jsx";
import {useCallback, useEffect, useRef, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {boardActions} from "../../store/boards.js";
import getCardDetailsById from "../../api/Boards/Columns/Cards/Details/GetCardDetailsById.js";
import cardPatch from "../../api/Boards/Columns/Cards/CardPatch.js";

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 800,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
};

const CardModal = ({openModalState, onClose, card}) => {
    const descriptionRef = useRef(null);
    const dispatch = useDispatch();
    const auth = useSelector(state => state.auth);
    const [isFetchDetails, setIsFetchDetails] = useState(false);

    useEffect(() => {
        if (!openModalState) return;
        getCardDetailsById(card.id, auth.token)
            .then(details => {
                dispatch(boardActions.setDetails({card, details}))
                setIsFetchDetails(true);
            });
    }, [openModalState]);
    const closeHandler = useCallback(() => {
        const description = descriptionRef.current.value;
        if (description === card?.description) {
            setIsFetchDetails(false);
        } else {
            cardPatch({description}, card.id, auth.token)
                .then(_ => {
                    dispatch(boardActions.updateCard({card, description}))
                    setIsFetchDetails(false);
                });
        }
        onClose();
    }, [onClose, dispatch, card, auth.token, card.id]);

    return (
        <Modal
            open={openModalState && isFetchDetails}
            onClose={closeHandler}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
        >
            <Box sx={style}>
                <Box sx={{display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
                    <Typography id="modal-modal-title" variant="h6" component="h2">
                        {card.title}
                    </Typography>
                    <IconButton onClick={closeHandler}>
                        <CloseIcon/>
                    </IconButton>
                </Box>
                <TextField
                    id="outlined-multiline-static"
                    inputRef={descriptionRef}
                    label="Description"
                    multiline
                    fullWidth
                    defaultValue={isFetchDetails && card.description}
                    rows={4}
                    placeholder="Add a description..."
                    sx={{marginTop: "15px"}}
                />
                <CommentSection card={card}/>
            </Box>
        </Modal>
    );
};
export default CardModal;