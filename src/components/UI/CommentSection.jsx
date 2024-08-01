import {useState} from "react";
import Box from "@mui/material/Box";
import {Avatar, Button, TextField, Typography} from "@mui/material";
import {useDispatch} from "react-redux";
import {boardActions} from "../../store/boards.js";

const CommentSection = ({card}) => {
    const dispatch = useDispatch();
    const [sortOrder, setSortOrder] = useState('newest');
    const [newComment, setNewComment] = useState('');

    const handleSortChange = () => {
        setSortOrder((prevOrder) => (prevOrder === 'newest' ? 'oldest' : 'newest'));
    };

    const handleCommentChange = (event) => {
        setNewComment(event.target.value);
    };

    const addComment = () => {
        if (newComment.length < 3) {
            return;
        }
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
                <Button variant="text" onClick={handleSortChange}>
                    {sortOrder === 'newest' ? 'Newest' : 'Oldest'}
                </Button>
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
            </Box>
            <Box sx={{display: 'flex', alignItems: 'center', marginTop: "10px"}}>
                <Button variant="contained" onClick={addComment} sx={{marginLeft: "50px"}}>
                    Post
                </Button>
                <Button onClick={() => setNewComment('')} sx={{marginLeft: "10px"}}>
                    Cancel (WIP)
                </Button>
            </Box>
            <Box sx={{paddingTop: "30px"}}>
                {sortedComments.map((comment) => (
                    <Box key={comment.id} sx={{display: 'flex', alignItems: 'center', marginTop: "10px"}}>
                        <Avatar sx={{marginRight: "10px"}}>U</Avatar>
                        <Box>
                            <Box sx={{display: 'flex', alignItems: 'center'}}>
                                <Typography variant="body1">
                                    Bob
                                </Typography>
                                <Typography variant="caption" color="textSecondary" sx={{paddingLeft: "10px"}}>
                                    {timeAgo(comment.date)}
                                </Typography>
                            </Box>
                            <Typography variant="caption">
                                {comment.text}
                            </Typography>
                        </Box>
                    </Box>
                ))}
            </Box>
        </Box>
    );
};

function timeAgo(dateString) {
    const date = new Date(dateString);
    const now = new Date();
    const secondsPast = Math.floor((now - date) / 1000);

    if (secondsPast < 60) {
        return `${secondsPast} seconds ago`;
    }
    if (secondsPast < 3600) {
        const minutes = Math.floor(secondsPast / 60);
        return `${minutes} minutes ago`;
    }
    if (secondsPast < 86400) {
        const hours = Math.floor(secondsPast / 3600);
        return `${hours} hours ago`;
    }
    if (secondsPast < 2592000) {
        const days = Math.floor(secondsPast / 86400);
        return `${days} days ago`;
    }
    if (secondsPast < 31536000) {
        const months = Math.floor(secondsPast / 2592000);
        return `${months} months ago`;
    }
    const years = Math.floor(secondsPast / 31536000);
    return `${years} years ago`;
}
export default CommentSection;