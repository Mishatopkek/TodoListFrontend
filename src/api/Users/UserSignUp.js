import config from "../../../config.js";
import {authActions} from "../../store/auth.js";
import {useState} from "react";
import {useDispatch} from "react-redux";
import {useLocation, useNavigate} from "react-router-dom";

const useUserSignUp = () => {
    const [validationErrors, setValidationErrors] = useState({});
    const [loading, setLoading] = useState(false);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const location = useLocation();

    const signUp = async (userData) => {
        setLoading(true);
        try {
            const response = await fetch(`${config.backendUrl}/api/User/SignUp`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(userData),
            });

            if (response.status === 201) {
                const data = await response.json();
                const token = data.token;
                localStorage.setItem('token', token);
                dispatch(authActions.loginSuccess(token));

                const from = location.state?.from?.pathname || '/';
                navigate(from, {replace: true});
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

    return {signUp, validationErrors, setValidationErrors, loading};
};

export default useUserSignUp;