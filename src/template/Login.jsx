import pageDAOGuy from "../assets/pagedao-guy.svg";
import {DynamicEmbeddedWidget} from "@dynamic-labs/sdk-react-core";
import TopNav from "./Layout/TopNav.jsx";
import Footer from "./Layout/Footer.jsx";

function Login() {
    return (
        <>
            <div className="bg-neutral-50 flex-col justify-start items-start flex">
                <TopNav/>

                {/* Content */}
                <div className="bg-dao-primary w-full">
                    <div className="container mx-auto justify-start items-center gap-4 flex">

                        {/* Hero Text */}
                        <div className="basis-2/3 py-40 justify-start items-center gap-20 flex-col">
                            <div className="flex-col justify-start items-start gap-6 inline-flex">
                                <div className="text-neutral-50 text-6xl font-bold font-['Arvo']">
                                    The platform for managing your book collections & selling your creations.
                                </div>
                                <div className="text-neutral-50 text-xl font-normal">
                                    Please log in or sign up to continue
                                </div>
                            </div>

                            <div className="mt-10">
                                <img src={pageDAOGuy} className="h-60" alt="PageDAO Guy"/>
                            </div>
                        </div>

                        {/* Login Form */}
                        <div className="basis-1/3">

                            <div className="bg-gray-50 rounded-lg p-10">
                                <DynamicEmbeddedWidget/>
                            </div>
                        </div>
                    </div>
                </div>

                <Footer/>
            </div>
        </>
    );
}

export default Login;