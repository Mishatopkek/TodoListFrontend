import {boardActions} from "../../../store/boards.js";
import Box from "@mui/material/Box";
import Column from "../Column.jsx";
import IconButton from "@mui/material/IconButton";
import {useCallback, useState} from "react";
import columnCreate from "../../../api/Boards/Columns/ColumnCreate.js";
import {useDispatch, useSelector} from "react-redux";
import AddIcon from "@mui/icons-material/Add.js";
import CreateColumnInput from "../Column/CreateColumnInput.jsx";

const ColumnGenerator = ({board, droppableProvided}) => {
    const dispatch = useDispatch();
    const auth = useSelector(state => state.auth);
    const [showCreateColumn, setShowCreateColumn] = useState(false);

    const onAddColumnButtonClick = useCallback((event) => {
        setShowCreateColumn(true);
    }, []);

    const onOutsideClick = useCallback(() => {
        setShowCreateColumn(false);
    }, []);

    const onCancelColumn = useCallback(() => {
        setShowCreateColumn(false);
    }, []);

    const onSubmitColumn = useCallback((title) => {
        if (title.length < 3) {
            return;
        }

        columnCreate(title, board.id, auth.token).then(x => {
            dispatch(boardActions.addColumn({
                id: x.columnId,
                title: title,
                cards: []
            }));
        });
        setShowCreateColumn(false);
    }, [dispatch, board.id, auth.token]);

    return (
        <>
            {board.columns.map((column, index) =>
                <Column key={column.id} index={index} column={column}/>
            )}
            {droppableProvided.placeholder}

            {showCreateColumn &&
                <CreateColumnInput
                    onSubmit={onSubmitColumn}
                    onCancel={onCancelColumn}
                    onOutsideClick={onOutsideClick}
                />}
            {!showCreateColumn &&
                <Box>
                    <IconButton aria-label="add" onClick={onAddColumnButtonClick}>
                        <AddIcon/>
                    </IconButton>
                </Box>
            }
        </>
    );
};
export default ColumnGenerator;