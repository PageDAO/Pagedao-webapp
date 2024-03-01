import './App.css'
import Login from "./template/Login.jsx";
import {createBrowserRouter, RouterProvider,} from "react-router-dom";
import {useDynamicContext, useIsLoggedIn,} from "@dynamic-labs/sdk-react-core";
import React from "react";
import Dashboard from "./template/Dashboard/Dashboard.jsx";
import Project from "./template/Project/Project.jsx";
import AddBook from "./template/Project/AddBook.jsx";
import PreviewBook from "./template/Project/PreviewBook.jsx";
import Publishing from "./template/Project/Publishing.jsx";
import PublishingDone from "./template/Project/PublishingDone.jsx";

function App() {
    const isLoggedIn = useIsLoggedIn();
    const {user} = useDynamicContext();

    const router = createBrowserRouter([
        {
            path: "/",
            element: isLoggedIn ? <Dashboard/> : <Login/>,
        },
        {
            path: "/project",
            element: isLoggedIn ? <Project/> : <Login/>,
        },
        {
            path: "/book/add",
            element: isLoggedIn ? <AddBook/> : <Login/>,
        },
        {
            path: "/book/edit",
            element: isLoggedIn ? <AddBook/> : <Login/>,
        },
        {
            path: "/book/preview",
            element: isLoggedIn ? <PreviewBook/> : <Login/>,
        },
        {
            path: "/book/publishing",
            element: isLoggedIn ? <Publishing/> : <Login/>,
        },
        {
            path: "/book/publishing-done",
            element: isLoggedIn ? <PublishingDone/> : <Login/>,
        },
    ]);

    console.log('isLoggedIn', isLoggedIn ? 'true' : 'false')
    console.log('user', user)

    return (
        <>
            <RouterProvider router={router} />
        </>
    )
}

export default App
