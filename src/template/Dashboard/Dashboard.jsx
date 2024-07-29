import TopNav from "../Layout/TopNav.jsx";
import Content from "./Content.jsx";
import Header from "../Layout/Header.jsx";
import Footer from "../Layout/Footer.jsx";

function Dashboard() {
  return (
    <>
      <div className="text-black bg-white w-full">
        <div className="flex-col">
          <div>
            <TopNav />
          </div>
          <div>
            <Header />
          </div>
          <div className="">
            <Content />
          </div>
          <Footer />
        </div>
      </div>
    </>
  );
}

export default Dashboard;
