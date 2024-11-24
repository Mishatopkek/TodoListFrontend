import {Avatar} from "@mui/material";

function stringToColor(name) {
    let hash = 0;

    // Generate a hash from the name
    for (let i = 0; i < name.length; i++) {
        hash = name.charCodeAt(i) + ((hash << 5) - hash);
    }

    // Convert hash to RGB values
    const r = (hash >> 24) & 0xFF;
    const g = (hash >> 16) & 0xFF;
    const b = (hash >> 8) & 0xFF;

    // Convert RGB to hex color string
    const color = `#${((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1).toUpperCase()}`;

    return color;
}

const TextColoredAvatar = ({children, sx, ...props}) => {
    return (
        <Avatar sx={{
            bgcolor: stringToColor(children),
            cursor: "pointer", ...sx
        }} {...props}>{children[0].toUpperCase()}</Avatar>
    );
};
export default TextColoredAvatar;