import {Paper} from "@mui/material";
import InputBase from "@mui/material/InputBase";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import DoneIcon from "@mui/icons-material/Done.js";
import CloseIcon from "@mui/icons-material/Close.js";
import OutsideClickHandler from "../wrappers/OutsideClickHandler.jsx";

const InputWithButtons = (
    {
        inputRef,
        onInputChange,
        onDone,
        onClose,
        onOutsideClick,
        placeholder,
        paperSx,
        inputSx,
        defaultValue = null
    }) => {
    return (
        <OutsideClickHandler
            onOutsideClick={onOutsideClick}>
            <Paper
                sx={paperSx}
                onClick={event => event.stopPropagation()}
            >
                <InputBase
                    autoFocus
                    inputRef={inputRef}
                    sx={inputSx}
                    placeholder={placeholder}
                    inputProps={{'aria-label': 'search google maps'}}
                    onKeyDown={onInputChange}
                    defaultValue={defaultValue}/>
            </Paper>
            <Box
                sx={{position: 'relative'}}
                onClick={event => event.stopPropagation()}>
                <Box sx={{
                    position: 'absolute',
                    top: '5px',
                    right: 0,
                    display: 'flex',
                    gap: "5px"
                }}>
                    <IconButton
                        aria-label="done"
                        onClick={onDone}
                        size="small"
                        sx={{
                            backgroundColor: 'rgba(255, 255, 255, .1)',
                            boxShadow: '0px 4px 6px rgba(0, 0, 0, 0.1)'
                        }}>
                        <DoneIcon fontSize="small"/>
                    </IconButton>
                    <IconButton
                        aria-label="close"
                        onClick={onClose}
                        size="small"
                        sx={{
                            backgroundColor: 'rgba(255, 255, 255, .1)',
                            boxShadow: '0px 4px 6px rgba(0, 0, 0, 0.1)'
                        }}>
                        <CloseIcon fontSize="small"/>
                    </IconButton>
                </Box>
            </Box>
        </OutsideClickHandler>
    );
};
export default InputWithButtons;