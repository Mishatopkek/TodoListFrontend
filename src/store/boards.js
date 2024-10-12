import {createSlice} from '@reduxjs/toolkit';

const boardSlice = createSlice({
    name: "boards",
    initialState: null,
    reducers: {
        init(state, action) {
            return action.payload;
        },
        addColumn(state, action) {
            const columns = state.columns;
            const column = action.payload;

            columns.push(column);
        },
        removeColumn(state, action) {
            const columns = state.columns;
            const id = action.payload;

            state.columns = columns.filter((column) => column.id !== id);
        },
        updateColumn(state, action) {
            const columns = state.columns;
            const {id, title} = action.payload;

            const column = columns.find((column) => column.id === id);
            column.title = title;
        },
        updateColumnPosition(state, action) {
            const columns = state.columns;
            const {columnId, position} = action.payload;

            const sourceColumn = columns.find(x => x.id === columnId);
            columns.splice(columns.indexOf(sourceColumn), 1);
            columns.splice(position, 0, sourceColumn);
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