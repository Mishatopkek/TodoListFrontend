import {Button} from "@mui/material";

const CreateIssueButton = ({shouldBeShown, clickHandler}) => {
    return (
        shouldBeShown ? (
            <Button
                variant="text"
                sx={{
                    display: 'block',
                    textTransform: "none",
                    width: '100%',
                    textAlign: 'left',
                    color: 'lightgray',
                }}

                onClick={clickHandler}
            >
                + Create issue
            </Button>
        ) : (
            <div style={{
                width: '100%',
                height: '36px', // Set height to match the button's height
                textAlign: 'left',
            }}>
            </div>
        )
    );
};
export default CreateIssueButton;