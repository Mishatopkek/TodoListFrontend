import Box from "@mui/material/Box";
import {Modal, TextField, Typography} from "@mui/material";
import IconButton from "@mui/material/IconButton";
import CloseIcon from '@mui/icons-material/Close';
import CommentSection from "./CommentSection.jsx";
import {useCallback, useRef} from "react";
import {useDispatch} from "react-redux";
import {boardActions} from "../../store/boards.js";

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
    const inputRef = useRef(null);
    const dispatch = useDispatch();

    const closeHandler = useCallback(() => {
        dispatch(boardActions.updateDetails({card, description: inputRef.current.value}));
        onClose();
    }, [onClose, dispatch, card]);

    return (
        <Modal
            open={openModalState}
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
                    inputRef={inputRef}
                    label="Description"
                    multiline
                    fullWidth
                    defaultValue={card.details?.description}
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