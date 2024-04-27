import {Card, CardActionArea, CardContent, Typography} from "@mui/material";

const JiraCard = ({title, style}) => {
    return (
        <Card sx={{maxWidth: 260}} style={style}>
            <CardActionArea>
                <CardContent>
                    <Typography variant="body2" component="h2">
                        {title}
                    </Typography>
                    {/*<Typography variant="body2" color="text.secondary">*/}
                    {/*    tag1, tag2*/}
                    {/*</Typography>*/}
                </CardContent>
            </CardActionArea>
        </Card>
    );
};
export default JiraCard;