import {Navigate, Outlet, useLocation} from 'react-router-dom';
import {useSelector} from 'react-redux';

const AuthorizeRoute = () => {
    const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
    const location = useLocation();

    return isAuthenticated ? <Outlet/> : <Navigate state={{from: location}} to="/login" replace/>;
};

export default AuthorizeRoute;