import './App.css'
import {createTheme, CssBaseline, ThemeProvider, Typography} from "@mui/material";
import MiniDrawer from "./components/UI/Drawer.jsx";
import Box from "@mui/material/Box";
import {DragDropContext, Droppable} from "@hello-pangea/dnd";
import Column from "./components/UI/Column.jsx";
import {useState} from "react";

function App() {
    const darkTheme = createTheme({
        palette: {
            mode: 'dark',
        },
    });
    const [columns, setColumns] = useState(board.columns);

    return (
        <ThemeProvider theme={darkTheme}>
            <MiniDrawer/>
            <main style={{
                display: 'block',
                overflowY: 'auto',
                height: '100%'
            }}>
                <Box style={{
                    display: 'block',
                    overflowY: 'auto',
                    paddingTop: 64,
                    paddingLeft: 64 + 64, // left drawer + extra space
                    height: '100%',
                }}>
                    <CssBaseline/>
                    <Box marginTop={4}>
                        <Typography variant="h6"
                                    component="h6">https://mui.com/material-ui/react-breadcrumbs/</Typography>
                    </Box>
                    <Box marginTop={4}>
                        <Typography variant="h4" component="h1">{board.title}</Typography>
                    </Box>
                    <DragDropContext onDragEnd={dropResult => {
                        setColumns(prevColumns => {
                            if (dropResult.source === null || dropResult.destination === null) return prevColumns;
                            const columns = [...prevColumns];
                            if (dropResult.source.droppableId === dropResult.destination.droppableId && dropResult.source.droppableId === "board") { // Column reorder
                                const element = columns.find(x => x.id === dropResult.draggableId);
                                columns.splice(columns.indexOf(element), 1);
                                columns.splice(dropResult.destination.index, 0, element);
                            } else { // Card move
                                //Remove card from source column
                                const sourceColumn = columns.find(x => x.id === dropResult.source.droppableId);
                                const card = sourceColumn.cards.find(x => x.id === dropResult.draggableId);
                                sourceColumn.cards = sourceColumn.cards.filter(x => x.id !== dropResult.draggableId);

                                //Add card to destination column
                                const destinationColumn = columns.find(x => x.id === dropResult.destination.droppableId);
                                destinationColumn.cards.splice(dropResult.destination.index, 0, card);
                            }
                            return columns;
                        })
                    }}>
                        <Droppable
                            droppableId="board"
                            type="COLUMN"
                            direction="horizontal"
                            // ignoreContainerClipping={true}
                            sx={{display: 'flex', height: '100%'}}
                        >
                            {provided => (
                                <Box
                                    ref={provided.innerRef}
                                    {...provided.droppableProps}
                                    sx={{display: 'flex', height: '100%'}}
                                >
                                    {columns.map((column, index) =>
                                        <Column key={column.id} index={index} column={column}/>
                                    )}
                                    {provided.placeholder}
                                </Box>
                            )}
                        </Droppable>
                    </DragDropContext>
                </Box>
            </main>
        </ThemeProvider>
    );
}

export default App

const board = {
    title: "KAN board",
    columns: [
        {
            id: "4199ED16-4051-42B7-A7A4-6307F8B7B2CA",
            title: "TO DO",
            cards: [
                {
                    id: "C1C52A6F-429F-40FA-964A-B2932923210D",
                    title: "Misha",
                },
                {
                    id: "C0F3C799-FC46-43DE-AEDF-85444B2CC8A2",
                    title: "Misha1",
                },
                {
                    id: "0B771BA7-5E57-4817-8665-CF985B875557",
                    title: "Misha2",
                },
                {
                    id: "2E946162-F645-44FD-9038-56655F854B3C",
                    title: "Misha3",
                },
                {
                    id: "600FFC51-BE52-4370-AF23-9C5B4871C366",
                    title: "Misha4",
                },
            ],
        },
        {
            id: "39EAD32C-C6DA-46C4-9C50-8E3B41BE976D",
            title: "DOING",
            cards: [
                {
                    id: "5204E001-A9A7-4A11-8BB8-5D5771E22DC5",
                    title: "Misha",
                },
                {
                    id: "CB956FE9-6DFB-461F-B881-CC78CEB51EAC",
                    title: "Misha1",
                },
                {
                    id: "C820CE84-3E0D-4253-BD93-AC9A092ABFE5",
                    title: "Misha2",
                },
                {
                    id: "090ADEBB-D28F-4454-B3CF-6FE63EE32D2F",
                    title: "Misha3",
                },
                {
                    id: "95012401-BC95-42D4-ABA9-6C6E7B5CCFDA",
                    title: "Misha4",
                },],
        },
        {
            id: "37D9436F-E0E7-4360-A292-4694C7A07DFF",
            title: "DONE",
            cards: [
                {
                    id: "9869DE2E-55B9-4C66-A603-6010203680EC",
                    title: "Misha",
                },
                {
                    id: "5DAD045B-52EA-49A3-9348-ACA008D28401",
                    title: "Misha1",
                },
                {
                    id: "74612CBA-7F82-4673-948C-016AD52DC250",
                    title: "Misha2",
                },
                {
                    id: "D794474A-4687-4804-A770-74B8D5489442",
                    title: "Misha3",
                },
                {
                    id: "F23C77AC-B8D1-402F-9C6F-4798F5E3B084",
                    title: "Misha4",
                },],
        },
    ],
}