import Box from "@mui/material/Box";
import {Typography} from "@mui/material";
import IconButton from "@mui/material/IconButton";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz.js";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import {useRef, useState} from "react";
import {useDispatch} from "react-redux";
import {useTheme} from "@mui/material/styles";
import InputWithButtons from "../InputWithButtons.jsx";
import {columnActions} from "../../../store/boards.js";

const ColumnHeader = ({column}) => {
    const theme = useTheme();
    const dispatch = useDispatch();
    const inputRef = useRef(null);
    const [onColumnHeaderHover, setOnColumnHeaderHover] = useState(false);
    const [onColumnOption, setOnColumnOption] = useState(null);
    const isColumnSettingsOpen = Boolean(onColumnOption);
    const [titleHover, setTitleHover] = useState(false);
    const [isOnSetTitle, setIsOnSetTitle] = useState(false);
    const handleMenuClick = (event) => {
        setOnColumnOption(event.currentTarget);
    };

    const handleClose = () => {
        setOnColumnOption(null);
    };

    const onDeleteColumn = () => {
        setOnColumnOption(null);
        dispatch(columnActions.removeColumn(column.id));
    };

    const onOutsideClick = () => {
        onSaveTitle();
        setIsOnSetTitle(false);
    }

    const onTitleClick = () => {
        setIsOnSetTitle(true);
        setOnColumnHeaderHover(false);
        setTitleHover(false);
    }

    const onChangeTitle = (event) => {
        if (event.key === 'Enter' || event.key === 'Escape') {
            onSaveTitle();
        }
    }

    const onSaveTitle = () => {
        const inputValue = inputRef.current.value;
        dispatch(columnActions.updateColumn({
            id: column.id,
            title: inputValue
        }));
        setIsOnSetTitle(false);
    }

    return (
        <Box
            onMouseEnter={() => setOnColumnHeaderHover(true)}
            onMouseLeave={() => setOnColumnHeaderHover(false)}
            sx={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
            }}>
            {isOnSetTitle ?
                <InputWithButtons
                    inputRef={inputRef}
                    onInputChange={onChangeTitle}
                    onDone={onSaveTitle}
                    onClose={onSaveTitle}
                    onOutsideClick={onOutsideClick}
                    placeholder={"What stage should be added?"}
                    defaultValue={column.title}
                    paperSx={{
                        minWidth: 256,
                        maxWidth: 256,
                        marginTop: '4px',
                        display: 'flex',
                        alignItems: 'flex-start'
                    }}
                    inputSx={{
                        fontSize: theme.typography.h6.fontSize,
                        maxWidth: 'fit-content', // Limit the width of InputBase
                        height: "36px"
                    }}/> :
                <Box
                    onMouseEnter={() => setTitleHover(true)}
                    onMouseLeave={() => setTitleHover(false)}
                    onClick={onTitleClick}
                    sx={{
                        display: "block",
                        backgroundColor: titleHover ? "rgba(255, 255, 255, .1)" : "transparent",
                        width: "100%",
                        transition: "background 0.2s ease 0s"
                    }}>
                    <Typography variant="h6" component="h2">
                        {column.title} {column.cards.length}
                    </Typography>
                </Box>}
            {!isOnSetTitle && (
                onColumnHeaderHover ? (
                    <IconButton
                        aria-label="more"
                        aria-controls={isColumnSettingsOpen ? 'basic-menu' : undefined}
                        aria-haspopup="true"
                        aria-expanded={isColumnSettingsOpen ? 'true' : undefined}
                        onClick={handleMenuClick}
                    >
                        <MoreHorizIcon sx={{fontSize: '1.5rem'}}/>
                    </IconButton>
                ) : (
                    <Box sx={{
                        width: '40px',
                        height: '40px',
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center'
                    }}>
                        <Box sx={{width: '40px', height: '40px'}}/>
                    </Box>
                )
            )}
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
    );
};
export default ColumnHeader;