import {Navigate, Outlet} from 'react-router-dom';
import {useSelector} from 'react-redux';

const AuthorizeRoute = () => {
    const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);

    return isAuthenticated ? <Outlet/> : <Navigate to="/login"/>;
};

export default AuthorizeRoute;