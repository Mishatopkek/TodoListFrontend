import './App.css'
import {createBrowserRouter, RouterProvider} from "react-router-dom";
import Board from "./pages/Board.jsx";
import Home from "./pages/Home.jsx";
import UserDetail from "./pages/UserDetail.jsx";
import Login from "./pages/Login.jsx";
import SignUp from "./pages/SignUp.jsx";
import {checkToken} from "./store/auth.js";
import {useEffect} from "react";
import {useDispatch} from "react-redux";
import Layout from "./pages/Layouts/Layout.jsx";
import AuthorizeRoute from "./pages/Layouts/AuthorizeRoute.jsx";
import ResetPassword from "./pages/ResetPassword.jsx";

const router = createBrowserRouter([
    {
        path: "/",
        element: <Layout/>,
        id: "root",
        children: [
            {
                index: true,
                element: <Home/>
            },
            {
                path: ":username",
                id: "user-detail",
                element: <AuthorizeRoute/>,
                children: [
                    {
                        index: true,
                        element: <UserDetail/>,
                    },
                    {
                        path: ":project",
                        id: "project-detail",
                        children: [
                            {
                                index: true,
                                element: <Board/>
                            }
                        ]
                    }
                ]
            }
        ]
    },
    {
        path: "/login",
        element: <Login/>
    },
    {
        path: "/signup",
        element: <SignUp/>
    },
    {
        path: "/reset_password",
        element: <ResetPassword/>
    },
]);

function App() {
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(checkToken());
    }, [dispatch]);

    return <RouterProvider router={router}/>
}

export default App