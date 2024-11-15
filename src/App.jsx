import './App.css'
import {createBrowserRouter, RouterProvider} from "react-router-dom";
import Board from "./pages/Board.jsx";
import Home from "./pages/Home.jsx";
import UserDetail from "./pages/UserDetail.jsx";
import Login from "./pages/Login.jsx";
import SignUp from "./pages/SignUp.jsx";
import Layout from "./pages/Layouts/Layout.jsx";
import AuthorizeRoute from "./pages/Layouts/AuthorizeRoute.jsx";
import ResetPassword from "./pages/ResetPassword.jsx";
import New from "./pages/New.jsx";
import {useDispatch} from "react-redux";
import {authActions} from "./store/auth.js";
import store from "./store/index.js";
import boardInitialize from "./api/Boards/BoardByName.js";

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
                path: "/new",
                element: <New/>
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
                                element: <Board/>,
                                loader: async ({params}) => {
                                    const {project, username} = params;
                                    const {isAuthenticated, token} = store.getState().auth;
                                    if (isAuthenticated) {
                                        try {
                                            return await boardInitialize(username, project, token);
                                        } catch (e) {
                                            return null;
                                        }
                                    } else {
                                        return null;
                                    }
                                },
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
    {
        path: "/reset_password",
        element: <ResetPassword/>
    },
]);

function App() {
    const dispatch = useDispatch();
    dispatch(authActions.initialize());

    return <RouterProvider router={router}/>
}

export default App