// src/pages/Dashboard.jsx

import React from 'react';
import TopNav from "../Layout/TopNav.jsx";
import Content from "./Content.jsx";
import Header from "../Layout/Header.jsx";
import Footer from "../Layout/Footer.jsx";
import UpdateSection from "./UpdateSection.jsx";
import CommunityActionsWidget from "../../components/CommunityActions/CommunityActionsWidget.jsx";

function Dashboard() {
    return (
        <>
            <div className="text-black bg-white w-full">
                <div className="flex-col">
                    <div>
                        <TopNav/>
                    </div>
                    <div>
                        <Header/>
                    </div>
                    <UpdateSection/>

                    <div className="">
                        <Content/>
                    </div>
                    
                    {/* New Community Actions Widget */}
                    <div className="container mx-auto px-4 py-8">
                        <CommunityActionsWidget />
                    </div>
                    <Footer/>
                </div>
            </div>
        </>
    );
}

export default Dashboard;
