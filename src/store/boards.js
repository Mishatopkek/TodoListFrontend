import {createSlice} from '@reduxjs/toolkit';

const boardSlice = createSlice({
    name: "boards",
    initialState: {
        id: "816644D7-7AC1-42C1-9D16-6F2FD9193015",
        title: "Test",
        columns: [
            {
                id: "4199ED16-4051-42B7-A7A4-6307F8B7B2CA",
                boardId: "816644D7-7AC1-42C1-9D16-6F2FD9193015",
                title: "TO DO",
                showAddCardByDefault: true,
                cards: [
                    {
                        id: "C1C52A6F-429F-40FA-964A-B2932923210D",
                        columnId: "4199ED16-4051-42B7-A7A4-6307F8B7B2CA",
                        title: "Misha",
                        details: {
                            description: "Misha top and kek",
                            comments: []
                        },
                    },
                    {
                        id: "C0F3C799-FC46-43DE-AEDF-85444B2CC8A2",
                        columnId: "4199ED16-4051-42B7-A7A4-6307F8B7B2CA",
                        title: "Misha1",
                        details: {
                            description: "Misha top and kek",
                            comments: []
                        },
                    },
                    {
                        id: "0B771BA7-5E57-4817-8665-CF985B875557",
                        columnId: "4199ED16-4051-42B7-A7A4-6307F8B7B2CA",
                        title: "Misha2",
                        details: {
                            description: "Misha top and kek",
                            comments: []
                        },
                    },
                    {
                        id: "2E946162-F645-44FD-9038-56655F854B3C",
                        columnId: "4199ED16-4051-42B7-A7A4-6307F8B7B2CA",
                        title: "Misha3",
                        details: {
                            description: "Misha top and kek",
                            comments: []
                        },
                    },
                    {
                        id: "600FFC51-BE52-4370-AF23-9C5B4871C366",
                        columnId: "4199ED16-4051-42B7-A7A4-6307F8B7B2CA",
                        title: "Misha4",
                        details: {
                            description: "Misha top and kek",
                            comments: []
                        },
                    },
                ],
            },
            {
                id: "39EAD32C-C6DA-46C4-9C50-8E3B41BE976D",
                boardId: "816644D7-7AC1-42C1-9D16-6F2FD9193015",
                title: "DOING",
                cards: [
                    {
                        id: "5204E001-A9A7-4A11-8BB8-5D5771E22DC5",
                        columnId: "39EAD32C-C6DA-46C4-9C50-8E3B41BE976D",
                        title: "Misha",
                        details: {
                            description: "Misha top and kek",
                            comments: []
                        },
                    },
                    {
                        id: "CB956FE9-6DFB-461F-B881-CC78CEB51EAC",
                        columnId: "39EAD32C-C6DA-46C4-9C50-8E3B41BE976D",
                        title: "Misha1",
                        details: {
                            description: "Misha top and kek",
                            comments: []
                        },
                    },
                    {
                        id: "C820CE84-3E0D-4253-BD93-AC9A092ABFE5",
                        columnId: "39EAD32C-C6DA-46C4-9C50-8E3B41BE976D",
                        title: "Misha2",
                        details: {
                            description: "Misha top and kek",
                            comments: []
                        },
                    },
                    {
                        id: "090ADEBB-D28F-4454-B3CF-6FE63EE32D2F",
                        columnId: "39EAD32C-C6DA-46C4-9C50-8E3B41BE976D",
                        title: "Misha3",
                        details: {
                            description: "Misha top and kek",
                            comments: []
                        },
                    },
                    {
                        id: "95012401-BC95-42D4-ABA9-6C6E7B5CCFDA",
                        columnId: "39EAD32C-C6DA-46C4-9C50-8E3B41BE976D",
                        title: "Misha4",
                        details: {
                            description: "Misha top and kek",
                            comments: []
                        },
                    },],
            },
            {
                id: "37D9436F-E0E7-4360-A292-4694C7A07DFF",
                boardId: "816644D7-7AC1-42C1-9D16-6F2FD9193015",
                title: "DONE",
                cards: [
                    {
                        id: "9869DE2E-55B9-4C66-A603-6010203680EC",
                        columnId: "37D9436F-E0E7-4360-A292-4694C7A07DFF",
                        title: "Misha",
                        details: {
                            description: "Misha top and kek",
                            comments: []
                        },
                    },
                    {
                        id: "5DAD045B-52EA-49A3-9348-ACA008D28401",
                        columnId: "37D9436F-E0E7-4360-A292-4694C7A07DFF",
                        title: "Misha1",
                        details: {
                            description: "Misha top and kek",
                            comments: []
                        },
                    },
                    {
                        id: "74612CBA-7F82-4673-948C-016AD52DC250",
                        columnId: "37D9436F-E0E7-4360-A292-4694C7A07DFF",
                        title: "Misha2",
                        details: {
                            description: "Misha top and kek",
                            comments: []
                        },
                    },
                    {
                        id: "D794474A-4687-4804-A770-74B8D5489442",
                        columnId: "37D9436F-E0E7-4360-A292-4694C7A07DFF",
                        title: "Misha3",
                        details: {
                            description: "Misha top and kek",
                            comments: []
                        },
                    },
                    {
                        id: "F23C77AC-B8D1-402F-9C6F-4798F5E3B084",
                        columnId: "37D9436F-E0E7-4360-A292-4694C7A07DFF",
                        title: "Misha4",
                        details: {
                            description: "Misha top and kek",
                            comments: []
                        },
                    },
                ],
            },
        ]
    },
    reducers: {
        addColumn(state, action) {
            const columns = state.columns;
            const column = action.payload;

            columns.push(column);
        },
        removeColumn(state, action) {
            const columns = state.columns;
            const id = action.payload;

            return columns.filter((column) => column.id !== id);
        },
        updateColumn(state, action) {
            const columns = state.columns;
            const {id, title} = action.payload;

            const column = columns.find((column) => column.id === id);
            column.title = title;
        },
        updateColumnPosition(state, action) {
            const columns = state.columns;
            const dropResult = action.payload;

            const sourceColumn = columns.find(x => x.id === dropResult.draggableId);
            columns.splice(columns.indexOf(sourceColumn), 1);
            columns.splice(dropResult.destination.index, 0, sourceColumn);
        },
        updateCardPositionInColumn(state, action) {
            const columns = state.columns;
            const dropResult = action.payload;

            //Remove card from source column
            const sourceColumn = columns.find(x => x.id === dropResult.source.droppableId);
            const card = sourceColumn.cards.find(x => x.id === dropResult.draggableId);
            sourceColumn.cards = sourceColumn.cards.filter(x => x.id !== dropResult.draggableId);

            //Add card to destination column
            const destinationColumn = columns.find(x => x.id === dropResult.destination.droppableId);
            destinationColumn.cards.splice(dropResult.destination.index, 0, card);

            //Actualize values
            card.columnId = destinationColumn.id;
        },
        addCard(state, action) {
            const columns = state.columns;
            const {columnId, card} = action.payload;

            const column = columns.find((column) => column.id === columnId);
            if (column) {
                column.cards.push(card);
            }
        },
        updateCard(state, action) {
            const {card, title} = action.payload;
            const columns = state.columns;

            const cardSelected = findCardById(columns, card.id, card.columnId);
            cardSelected.title = title;
        },
        updateDetails(state, action) {
            const {card, description} = action.payload;
            const columns = state.columns;

            const cardSelected = findCardById(columns, card.id, card.columnId);
            cardSelected.details.description = description;
        },
        addComment(state, action) {
            const comment = action.payload;
            const columns = state.columns;

            const card = findCardById(columns, comment.cardId);
            card.details.comments.push(comment);
        }
    }
});

function findCardById(columns, cardId, columnId = null) {
    if (columnId) {
        const column = columns.find(x => x.id == columnId);
        return column.cards.find(x => x.id == cardId);
    }

    for (let column of columns) {
        const card = column.cards.find(x => x.id === cardId);
        if (card) {
            return card;
        }
    }

    return null;
}

function findCommentById(columns, commentId, cardId) {
    for (let column of columns) {
        const card = column.cards.find(x => x.id === cardId);
        if (card) {
            return card.comments.find(x => x.id === commentId);
        }
    }
    return null;
}

export const boardActions = boardSlice.actions;

export default boardSlice;