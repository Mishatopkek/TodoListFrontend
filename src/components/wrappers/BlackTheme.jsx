import {createTheme, ThemeProvider} from "@mui/material";
import * as React from "react";

const BlackTheme = ({children}) => {
    const darkTheme = createTheme({
        palette: {
            mode: 'dark',
        },
    });

    return (
        <ThemeProvider theme={darkTheme}>
            {children}
        </ThemeProvider>
    );
};
export default BlackTheme;