import {Paper} from "@mui/material";
import InputBase from "@mui/material/InputBase";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import DoneIcon from "@mui/icons-material/Done.js";
import CloseIcon from "@mui/icons-material/Close.js";

const InputWithButtons = ({inputRef, onInputChange, onDone, onClose, placeholder, inputSx, defaultValue = null}) => {
    return (
        <>
            <Paper
                sx={{
                    minWidth: 256,
                    maxWidth: 256,
                    marginTop: '4px',
                    display: 'flex',
                    alignItems: 'flex-start'
                }}
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
            <Box sx={{
                position: 'relative',
            }}>
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
                        sx={{
                            backgroundColor: 'rgba(255, 255, 255, .1)',
                            boxShadow: '0px 4px 6px rgba(0, 0, 0, 0.1)'
                        }}>
                        <DoneIcon/>
                    </IconButton>
                    <IconButton
                        aria-label="close"
                        onClick={onClose}
                        sx={{
                            backgroundColor: 'rgba(255, 255, 255, .1)',
                            boxShadow: '0px 4px 6px rgba(0, 0, 0, 0.1)'
                        }}>
                        <CloseIcon/>
                    </IconButton>
                </Box>
            </Box>
        </>
    );
};
export default InputWithButtons;