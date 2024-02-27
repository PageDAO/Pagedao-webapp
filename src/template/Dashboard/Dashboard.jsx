import TopNav from "../TopNav.jsx";
import Content from "./Content.jsx";
import Header from "../Header.jsx";

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
                    <div className="">
                        <Content/>
                    </div>
                </div>
            </div>
        </>
    );
}

export default Dashboard;