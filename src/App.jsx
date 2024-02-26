import './App.css'
import Login from "./template/Login.jsx";
import {createBrowserRouter, RouterProvider,} from "react-router-dom";
import {useDynamicContext, useIsLoggedIn,} from "@dynamic-labs/sdk-react-core";
import React from "react";
import Dashboard from "./template/Dashboard.jsx";

function App() {
    const isLoggedIn = useIsLoggedIn();
    const {user} = useDynamicContext();

    const router = createBrowserRouter([
        {
            path: "/",
            element: isLoggedIn ? <Dashboard/> : <Login/>,
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
