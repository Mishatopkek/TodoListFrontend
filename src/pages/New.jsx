import {Typography} from "@mui/material";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import * as React from "react";
import {useCallback, useState} from "react";
import useBoardCreate from "../api/Boards/BoardCreate.js";

const New = () => {
    const [name, setName] = useState("");
    const [isChangedName, setIsChangedName] = useState(false);
    const {loading, setValidationErrors, boardCreate, validationErrors} = useBoardCreate();
    const onSubmit = useCallback((event) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);
        const userData = {
            title: data.get("title"),
            name: data.get("name"),
        };
        boardCreate(userData).then()
    }, [boardCreate]);

    const onTitleChange = useCallback((event) => {
        const titleValue = event.target.value;
        const splitTitle = titleValue.split(" ");
        let calculatedName = "";
        if (isChangedName && titleValue) {
            return;
        }
        if (!titleValue) {
            setName("");
            setIsChangedName(false);
            return;
        }

        if (splitTitle.filter(title => title !== "").length === 1) {
            calculatedName = splitTitle[0].slice(0, 2);
        } else {
            calculatedName = splitTitle.map(word => word[0]).join('')
        }

        calculatedName = calculatedName.toUpperCase();
        setName(calculatedName);
    }, [isChangedName]);

    const onNameChange = useCallback((event) => {
        let nameValue = event.target.value;
        nameValue = nameValue.replace(" ", "_").toUpperCase();

        if (nameValue.slice(-2) === "__") {//Check if the user types two spaces
            return;
        }

        setName(nameValue);
        setIsChangedName(true);
    }, []);


    return (
        <Box sx={{mt: "5%"}}>
            <Typography>Add project details</Typography>
            <Typography>Explore what's possible when you collaborate with your team.<br/>Edit project details anytime in
                project settings.</Typography>
            <Typography>Required fields are marked with an
                asterisk <span>*</span></Typography> {/*TODO Add a star required attribute*/}
            <Box component="form" noValidate sx={{mt: 1}} onSubmit={onSubmit}>
                <TextField
                    margin="normal"
                    required
                    fullWidth
                    id="title"
                    label="Title"
                    name="title"
                    autoComplete="title"
                    autoFocus
                    onChange={onTitleChange}
                    error={!!validationErrors.title}
                    helperText={!!validationErrors.title && validationErrors.title[0]}/>
                <TextField
                    margin="normal"
                    required
                    fullWidth
                    name="name"
                    label="Name"
                    type="name"
                    id="name"
                    autoComplete="name"
                    onChange={onNameChange}
                    value={name}
                    error={!!validationErrors.name}
                    helperText={!!validationErrors.name && validationErrors.name[0]}/>
                <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    sx={{mt: 3, mb: 2}}
                >
                    Create
                </Button>
            </Box>
        </Box>
    );
};
export default New;