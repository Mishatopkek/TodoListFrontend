import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import {CardActionArea} from "@mui/material";


const BoardCard = ({title, onClick}) => {
    return <Card sx={{maxWidth: 250}}>
        <CardActionArea onClick={onClick}>
            <CardContent>
                <Typography variant="h5" component="div">
                    {title}
                </Typography>
                <Typography sx={{mb: 1.5}} color="text.secondary">
                    Team-managed software
                </Typography>
                <Typography sx={{fontSize: 14}} color="text.secondary" gutterBottom>
                    QUICK LINKS
                </Typography>
                <Typography sx={{fontSize: 14}} color="text.secondary" gutterBottom>
                    My open issue
                </Typography>
                <Typography sx={{fontSize: 14}} color="text.secondary" gutterBottom>
                    Done issues
                </Typography>
            </CardContent>
            <CardActions>
                <Typography>
                    1 board
                </Typography>
            </CardActions>
        </CardActionArea>
    </Card>;
}
export default BoardCard;