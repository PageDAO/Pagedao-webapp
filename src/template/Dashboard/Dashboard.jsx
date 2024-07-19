import TopNav from "../Layout/TopNav.jsx";
import Content from "./Content.jsx";
import Header from "../Layout/Header.jsx";
import Footer from "../Layout/Footer.jsx";
import UpdateSection from "./UpdateSection.jsx";


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
                    <Footer/>
                </div>
            </div>
        </>
    );
}

export default Dashboard;