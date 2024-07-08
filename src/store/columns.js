import {createSlice} from '@reduxjs/toolkit';

const columnSlice = createSlice({
    name: "columns",
    initialState: [
        {
            id: "4199ED16-4051-42B7-A7A4-6307F8B7B2CA",
            title: "TO DO",
            showAddCardByDefault: true,
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
    reducers: {
        add(state, action) {
            state.push(action.payload);
        },
        remove(state, action) {
            return state.filter((column) => column.id !== action.payload);
        },
        update(state, action) {
            const column = state.columns.find((column) => column.id === action.payload.id);
            column.title = action.payload.title;
        },
        updateColumnsInBoard(state, action) {
            const columns = state;
            const dropResult = action.payload;

            const element = columns.find(x => x.id === dropResult.draggableId);
            columns.splice(columns.indexOf(element), 1);
            columns.splice(dropResult.destination.index, 0, element);
        },
        updateCardsInColumns(state, action) {
            const columns = state;
            const dropResult = action.payload;

            //Remove card from source column
            const sourceColumn = columns.find(x => x.id === dropResult.source.droppableId);
            const card = sourceColumn.cards.find(x => x.id === dropResult.draggableId);
            sourceColumn.cards = sourceColumn.cards.filter(x => x.id !== dropResult.draggableId);

            //Add card to destination column
            const destinationColumn = columns.find(x => x.id === dropResult.destination.droppableId);
            destinationColumn.cards.splice(dropResult.destination.index, 0, card);
        },
        addCardToColumn(state, action) {
            const {columnId, card} = action.payload;
            const column = state.find((column) => column.id === columnId);
            if (column) {
                column.cards.push(card);
            }
        },
    }
});

export const columnActions = columnSlice.actions;

export default columnSlice;