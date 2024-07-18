import {useCallback, useRef} from "react";
import InputWithButtons from "../InputWithButtons.jsx";

const CreateColumn = ({onSubmit, onCancel, onOutsideClick}) => {
    const inputRef = useRef(null);
    const onInputChange = useCallback((event) => {
        if (event.key === 'Enter') {
            const inputValue = inputRef.current.value;
            onSubmit(inputValue);
        }
        if (event.key === 'Escape') {
            onCancel();
        }
    }, [onSubmit, onCancel]);

    const onDoneHandler = useCallback(() => {
        onSubmit(inputRef.current.value);
    }, [onSubmit]);
    const onCloseHandler = useCallback(() => {
        onCancel();
    }, [onCancel]);


    return <InputWithButtons
        inputRef={inputRef}
        onInputChange={onInputChange}
        onDone={onDoneHandler}
        onClose={onCloseHandler}
        onOutsideClick={onOutsideClick}
        placeholder={"What stage should be added?"}
        inputSx={{
            ml: 1,
            flex: 1,
            height: '100%',
            margin: '0',
            padding: '8px'
        }}
    />
};
export default CreateColumn;