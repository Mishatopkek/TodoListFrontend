import './App.css'
import {createBrowserRouter, RouterProvider} from "react-router-dom";
import Board from "./pages/Board.jsx";

const router = createBrowserRouter([
    {
        path: "/",
        element: <Board/>,
        id: "root",
        children: [
            {
                index: true,
                element: <Board/>
            },
            {
                path: ":username",
                id: "username-detail",
                children: [
                    {
                        index: true,
                        element: <Board/>,
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