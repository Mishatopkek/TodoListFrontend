import {Card, Tooltip, Typography} from "@mui/material";
import {Draggable} from "@hello-pangea/dnd";
import Box from "@mui/material/Box";


const JiraCard = ({card, index}) => {
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
            <Card sx={{padding: '8px', cursor: 'pointer'}}>
                <Tooltip title={card.title} placement="bottom-start">
                    <Typography
                        variant="body2"
                        component="h2"
                        sx={{
                            '&:hover': {
                                textDecoration: 'underline',
                            },
                        }}
                    >
                        {card.title}
                    </Typography>
                </Tooltip>
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