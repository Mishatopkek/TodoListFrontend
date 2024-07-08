import Box from "@mui/material/Box";
import {Typography} from "@mui/material";
import IconButton from "@mui/material/IconButton";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz.js";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import {columnActions} from "../../../store/columns.js";
import {useState} from "react";
import {useDispatch} from "react-redux";

const ColumnHeader = ({column}) => {
    const dispatch = useDispatch();
    const [onColumnHeaderHover, setOnColumnHeaderHover] = useState(false);
    const [onColumnOption, setOnColumnOption] = useState(null);
    const isColumnSettingsOpen = Boolean(onColumnOption);
    const [titleHover, setTitleHover] = useState(false);
    const handleMenuClick = (event) => {
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
        <Box
            onMouseEnter={() => setOnColumnHeaderHover(true)}
            onMouseLeave={() => setOnColumnHeaderHover(false)}
            sx={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
            }}>
            <Box
                onMouseEnter={() => setTitleHover(true)}
                onMouseLeave={() => setTitleHover(false)}
                sx={{
                    display: "block",
                    backgroundColor: titleHover ? "rgba(255, 255, 255, .1)" : "transparent",
                    width: "100%",
                    transition: "background 0.2s ease 0s"
                }}>
                <Typography variant="h6" component="h2">
                    {column.title}
                </Typography>
            </Box>
            {onColumnHeaderHover ? (
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