import TopNav from "../Layout/TopNav.jsx";
import Footer from "../Layout/Footer.jsx";
import PreviewBookDetail from "./PreviewBookDetail.jsx";
import {Link} from "react-router-dom";
import mintInProgress from "../../assets/mint-in-progress.svg";

function Publishing() {

    return (
        <>
            <div className="px-52 py-10 bg-dao-primary w-full">
                <div className="container mx-auto justify-center gap-20 flex-col ">
                    <h1
                        className="grow shrink basis-0 text-center text-neutral-50 text-4xl font-bold font-['Arvo']">
                        Publishing
                    </h1>
                    <h2
                        className="mt-4 self-stretch text-center text-neutral-50  font-normal font-['Arvo']">The
                        Utopia crisis
                    </h2>
                </div>
            </div>
            <div className="bg-dao-primary w-full">
                <div className="container mx-auto justify-center flex flex-col w-full">
                    <div className="flex flex-col w-full mb-10">
                        <img src={mintInProgress} alt="Mint in progress" className="h-80 animate-spin-slow"/>
                    </div>
                    <div className="flex-col justify-end items-center gap-2 inline-flex mb-20">
                        <div className="text-center text-neutral-50 font-bold font-['DM Sans'] leading-7">In
                            progress...
                        </div>
                        <div
                            className="text-center text-neutral-50 text-sm font-normal font-['DM Sans'] leading-snug">See
                            on blockexplorer
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Publishing;