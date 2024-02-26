import Header from "./Header.jsx";
import DashboardContent from "./DashboardContent.jsx";

function Dashboard() {
    return (
        <>
            <div className="leading-6 text-black bg-white">
                <div className="min-h-full text-black">
                    <div className="hidden flex-col md:flex">
                        <div className="border-b">
                            <Header/>
                        </div>
                        <div className="flex-1 space-y-4 p-8 pt-6">
                            <DashboardContent/>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default Dashboard;