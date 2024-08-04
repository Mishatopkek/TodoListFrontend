import './App.css'
import {createBrowserRouter, RouterProvider} from "react-router-dom";
import Board from "./pages/Board.jsx";
import Home from "./pages/Home.jsx";
import UserDetail from "./pages/UserDetail.jsx";
import Login from "./pages/Login.jsx";
import Layout from "./pages/Layout.jsx";

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
]);

function App() {
    return <RouterProvider router={router}/>
}

export default App