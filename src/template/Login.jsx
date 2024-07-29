import pageDAOGuy from "../assets/pagedao-guy.svg";
import { DynamicEmbeddedWidget } from "@dynamic-labs/sdk-react-core";
import TopNav from "./Layout/TopNav.jsx";
import Footer from "./Layout/Footer.jsx";
import AuthorList from "./AuthorProfile/AuthorList.jsx";

function Login() {
    return (
        <>
            <div className="bg-neutral-50 flex-col justify-start items-start flex">
                <TopNav />

                {/* Content */}
                <div className="bg-dao-primary w-full">
                    <div className="container mx-auto justify-start items-center gap-4 flex flex-col md:flex-row">

                        {/* Hero Text */}
                        <div className="basis-full md:basis-2/3 py-20 md:py-40 justify-start items-center gap-10 md:gap-20 flex-col">
                            <div className="flex-col justify-start items-start gap-6 inline-flex">
                                <div className="text-neutral-50 text-3xl md:text-6xl font-bold font-['Arvo']">
                                    Open source publishing software to bring the world&apos;s literature to the world&apos;s people.
                                </div>
                            </div>

                            <div className="mt-10">
                                <img src={pageDAOGuy} className="h-40 md:h-60" alt="PageDAO Guy" />
                            </div>
                        </div>

                        {/* Login Form */}
                        <div className="basis-full md:basis-1/3">
                            <div className="bg-gray-50 rounded-lg p-6 md:p-10">
                                <DynamicEmbeddedWidget />
                            </div>
                        </div>
                    </div>
                </div>
                <div className="container mx-auto justify-start items-center">
                <AuthorList />
                </div>
            </div>
        </>
    );
}

export default Login;