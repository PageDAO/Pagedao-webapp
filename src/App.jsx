import './App.css'
import Login from "./template/Login.jsx";
import {createBrowserRouter, RouterProvider, ScrollRestoration} from "react-router-dom";
import {useIsLoggedIn} from "@dynamic-labs/sdk-react-core";
import React from "react";
import Dashboard from "./template/Dashboard/Dashboard.jsx";
import Project from "./template/Project/Project.jsx";
import AddBook from "./template/Project/AddBook.jsx";
import PreviewBook from "./template/Project/PreviewBook.jsx";
import Publishing from "./template/Project/Publishing.jsx";
import PublishingDone from "./template/Project/PublishingDone.jsx";
import AuthorProfile from './template/AuthorProfile/AuthorProfile.jsx';
import Marketplace from './template/Marketplace/Marketplace.jsx';
import EditAuthorInfo from './template/AuthorProfile/EditAuthorInfo.jsx';
import ItemView from './template/Project/ItemView.jsx';
import ProjectView from './template/Project/ProjectView.jsx';
import Profile from './template/AuthorProfile/Profile.jsx';
//import Profile from './portfolio/Profile.jsx';

function App() {
    const isLoggedIn = useIsLoggedIn();

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
            path: "/profile2/:userId",
            element: <Profile/>
        },
        {
            path: "/editprofile/:userId",
            element: <EditAuthorInfo/>
        },
        {
            path: "/project",
            element: <Dashboard/>,
        },
        {
            path: "/project/:projectIndex",
            element: isLoggedIn ? <Project /> : <Login/>,
        },
        {
            path: "/book/:userId/:projectId/:itemId",
            element: <ItemView/>
        },
        {
            path: "/book/:userId/:projectId",
            element: <ProjectView/>
        },
        {
            path: "/book/add/:projectIndex",
            element: isLoggedIn ? <AddBook/> : <Login/>,
        },
        {
            path: "/book/edit/:projectIndex",
            element: isLoggedIn ? <AddBook/> : <Login/>,
        },
        {
            path: "/book/edit/:projectIndex/:itemIndex",
            element: isLoggedIn ? <AddBook/> : <Login/>,
        },
        {
            path: "/book/preview/:projectIndex/:itemIndex",
            element: isLoggedIn ? <PreviewBook/> : <Login/>,
        },
        {
            path: "/book/publishing",
            element: isLoggedIn ? <Publishing/> : <Login/>,
        },
        {
            path: "/book/publishing-done/:projectIndex/:itemIndex",
            element: isLoggedIn ? <PublishingDone/> : <Login/>,
        },
        {
            path: "/marketplace",
            element: <Marketplace/>
        }
    ]);

    return (
        <>
            <RouterProvider router={router}>
                <ScrollRestoration/>
            </RouterProvider>
        </>
    )
}

export default App
