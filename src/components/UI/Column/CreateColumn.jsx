import {useCallback} from "react";
import {Paper} from "@mui/material";
import InputBase from "@mui/material/InputBase";
import DoneIcon from '@mui/icons-material/Done';
import IconButton from "@mui/material/IconButton";
import CloseIcon from '@mui/icons-material/Close';
import Box from "@mui/material/Box";

const CreateColumn = ({onSubmit, onCancel}) => {
    const onInputChange = useCallback((e) => {
        if (e.key === 'Enter') {
            onSubmit(e.target.value);
        }
    }, [onSubmit]);

    const onDoneHandler = useCallback((event) => {
        onSubmit(event.target.value);
    }, [onSubmit]);
    const onCloseHandler = useCallback(() => {
        onCancel();
    }, [onCancel]);


    return <>
        <Paper
            sx={{
                minWidth: 256,
                maxWidth: 256,
                marginTop: '4px', //The same as Jira card margin top
                marginBottom: '4px', //The same as Jira card margin bottom
                display: 'flex',
                alignItems: 'flex-start'
            }}
        >
            <InputBase
                sx={{
                    ml: 1,
                    flex: 1,
                    height: '100%',
                    margin: '0',
                    padding: '8px'
                }} //The Margin should be accurate to match the Jira card
                placeholder="What needs to be done"
                inputProps={{'aria-label': 'search google maps'}}
                onKeyDown={onInputChange}/>
        </Paper>
        <Box sx={{
            display: 'flex',
            justifyContent: 'right'
        }}>
            <IconButton aria-label="done" onClick={onDoneHandler}>
                <DoneIcon/>
            </IconButton>
            <IconButton aria-label="close" onClick={onCloseHandler}>
                <CloseIcon/>
            </IconButton>
        </Box>
    </>
};
export default CreateColumn;