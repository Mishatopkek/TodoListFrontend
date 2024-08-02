import './App.css'
import {createBrowserRouter, RouterProvider} from "react-router-dom";
import Board from "./pages/Board.jsx";
import Home from "./pages/Home.jsx";
import UserDetail from "./pages/UserDetail.jsx";

const router = createBrowserRouter([
    {
        path: "/",
        // element: <Board/>,
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
    }
]);

function App() {
    return <RouterProvider router={router}/>
}

export default App