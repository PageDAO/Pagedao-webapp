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
import AuthorProfile from './template/AuthorProfile/AuthorProfile.jsx';
import EditAuthorInfo from './template/AuthorProfile/EditAuthorInfo.jsx';

function App() {
    const isLoggedIn = useIsLoggedIn();
    const {user} = useDynamicContext();

    const router = createBrowserRouter([
        {
            path: "/",
            element: isLoggedIn ? <Dashboard/> : <Login/>,
        },
        {
            path: "/profile/:userId",
            element: <AuthorProfile/>
        },
        {
            path: "/editprofile/:userId",
            element: <EditAuthorInfo/>
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

    return (
        <>
            <RouterProvider router={router} />
        </>
    )
}

export default App
