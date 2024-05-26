import {Card, Typography} from "@mui/material";
import {Draggable} from "@hello-pangea/dnd";
import Box from "@mui/material/Box";


const JiraCard = ({card, index}) => {
    return (<Draggable
        draggableId={card.id}
        index={index}>
        {(provided, snapshot) => (<Box
            sx={{
                marginTop: '4px', marginDown: '4px', minWidth: 256, maxWidth: 256
            }}
            {...provided.draggableProps}
            {...provided.dragHandleProps}
            ref={provided.innerRef}>
            <Card sx={{
                padding: '8px',
            }}>
                <Typography variant="body2" component="h2">
                    {index} {card.title}
                </Typography>
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