﻿import {useCallback} from "react";
import {Paper} from "@mui/material";
import InputBase from "@mui/material/InputBase";

const CreateCard = ({onSubmit, onCancel}) => {
    const onInputChange = useCallback((event) => {
        if (event.key === 'Enter') {
            onSubmit(event.target.value);
        }
        if (event.key === 'Escape') {
            onCancel();
        }
    }, [onSubmit, onCancel]);

    return <Paper
        sx={{
            marginTop: '4px', //The same as Jira card margin top
            marginBottom: '4px', //The same as Jira card margin bottom
            display: 'flex',
            alignItems: 'flex-start'
        }}
    >
        <InputBase
            autoFocus
            sx={{
                ml: 1,
                flex: 1,
                height: '100%',
                margin: '0',
                padding: '8px',
                marginBottom: '40px'
            }} //The Margin should be accurate to match the Jira card
            placeholder="What needs to be done"
            inputProps={{'aria-label': 'search google maps'}}
            onKeyDown={onInputChange}/>
    </Paper>
}
export default CreateCard;