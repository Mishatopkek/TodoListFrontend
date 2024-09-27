import {useState} from "react";
import {useSelector} from "react-redux";
import {useNavigate} from "react-router-dom";
import config from "../../../config.js";

const useBoardCreate = () => {
    const [validationErrors, setValidationErrors] = useState({});
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const auth = useSelector(state => state.auth);

    const boardCreate = async (userData) => {
        setLoading(true);
        try {
            const response = await fetch(`${config.backendUrl}/api/Board`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + auth.token
                },
                body: JSON.stringify(userData),
            });

            if (response.status === 201) {
                const user = auth.user.unique_name;
                const path = "/" + user + "/" + userData.name;
                navigate(path);
            } else if (response.status === 400 || response.status === 409) {
                const data = await response.json();
                setValidationErrors(data.errors);
            } else {
                console.error('Unexpected status code:', response.status);
            }
        } catch (error) {
            console.error('Error during fetch:', error);
        } finally {
            setLoading(false);
        }
    };

    return {boardCreate, validationErrors, setValidationErrors, loading};
};

export default useBoardCreate;