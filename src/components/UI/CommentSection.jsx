import {useState} from "react";
import Box from "@mui/material/Box";
import {Avatar, Button, FormControl, InputLabel, Select, TextField, Typography} from "@mui/material";
import MenuItem from "@mui/material/MenuItem";
import {useDispatch} from "react-redux";
import {boardActions} from "../../store/boards.js";

const CommentSection = ({card}) => {
    const dispatch = useDispatch();
    const [sortOrder, setSortOrder] = useState('newest');
    const [newComment, setNewComment] = useState('');

    const handleSortChange = (event) => {
        setSortOrder(event.target.value);
    };

    const handleCommentChange = (event) => {
        setNewComment(event.target.value);
    };

    const addComment = () => {
        const comment = {
            id: crypto.randomUUID(),
            cardId: card.id,
            text: newComment,
            date: new Date().toISOString()
        };
        dispatch(boardActions.addComment(comment));
        setNewComment('');
    };

    const sortedComments = [...card.details.comments].sort((a, b) => {
        return sortOrder === 'newest'
            ? new Date(b.date) - new Date(a.date)
            : new Date(a.date) - new Date(b.date);
    });

    return (
        <Box sx={{marginTop: "25px"}}>
            <Box sx={{display: 'flex', justifyContent: 'flex-end', marginBottom: "10px"}}>
                <FormControl>
                    <InputLabel id="sort-label">Sort by</InputLabel>
                    <Select
                        labelId="sort-label"
                        id="sort-select"
                        value={sortOrder}
                        label="Sort by"
                        onChange={handleSortChange}
                    >
                        <MenuItem value={'newest'}>Newest</MenuItem>
                        <MenuItem value={'oldest'}>Oldest</MenuItem>
                    </Select>
                </FormControl>
            </Box>
            <Box sx={{display: 'flex', alignItems: 'center', marginTop: "10px"}}>
                <Avatar sx={{marginRight: "10px"}}>U</Avatar>
                <TextField
                    id="new-comment"
                    label="Add a comment..."
                    fullWidth
                    value={newComment}
                    onChange={handleCommentChange}
                    multiline
                />
                <Button onClick={addComment} sx={{marginLeft: "10px"}}>
                    Post
                </Button>
            </Box>
            <Box>
                {sortedComments.map((comment) => (
                    <Box key={comment.id} sx={{marginBottom: "10px"}}>
                        <Typography variant="body2">
                            {comment.text}
                        </Typography>
                        <Typography variant="caption" color="textSecondary">
                            {new Date(comment.date).toLocaleString()}
                        </Typography>
                    </Box>
                ))}
            </Box>
        </Box>
    );
};
export default CommentSection;