import {Card, Tooltip, Typography} from "@mui/material";
import {Draggable} from "@hello-pangea/dnd";
import Box from "@mui/material/Box";
import {useCallback, useState} from "react";
import EditIcon from '@mui/icons-material/Edit';
import IconButton from "@mui/material/IconButton";

const JiraCard = ({card, index}) => {
    const [onCardHover, setOnCardHover] = useState(false);
    const handleEditClick = useCallback(() => {

    }, []);
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
                sx={{
                    padding: '8px',
                    cursor: 'pointer',
                    backgroundColor: onCardHover ? "#252525" : "#121212",
                    transition: "background 0.2s ease 0s"
                }}>
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
                                onClick={handleEditClick}
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
                </Box>
                <Typography variant="body2" color="text.secondary">
                    tag1, tag2
                </Typography>
                <Typography variant="overline" color="cyan">
                    ❤️ KAN-123
                </Typography>
            </Card>
        </Box>)}
    </Draggable>);
};

export default JiraCard;