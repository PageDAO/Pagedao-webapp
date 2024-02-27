import logo from "../assets/logo.svg";
import icon from "../assets/icon.svg";
import pagedaoGuy from "../assets/pagedao-guy.svg";
import {Link} from "react-router-dom";
import {DynamicWidget} from "@dynamic-labs/sdk-react-core";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faBars} from "@fortawesome/free-solid-svg-icons";
import TopNav from "./TopNav.jsx";

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
                                <img src={pagedaoGuy} className="h-60" alt="PageDAO Guy"/>
                            </div>
                        </div>

                        {/* Login Form */}
                        <div className="basis-1/3">

                            <div className="bg-gray-50 rounded-lg p-10">
                                <div className="flex-col justify-center items-center gap-4 inline-flex w-full">
                                    <div className="text-2xl font-normal  text-center">
                                        Log in or sign up
                                    </div>
                                    <div className="text-lg font-normal">
                                        Log in using your wallet to continue
                                    </div>
                                </div>
                                <div className="mt-4 gap-6 flex-col justify-center items-center flex w-full">
                                    <DynamicWidget/>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>


                {/* Footer */}
                <div className="w-full pt-14 pb-16 bg-neutral-50">
                    <div className="container mx-auto flex justify-between">
                        <div className="flex-col justify-start items-start gap-4 inline-flex">
                            <div className=" relative">
                                <Link
                                    to={'/'}
                                >
                                    <img
                                        alt="Authentication"
                                        loading="lazy"
                                        decoding="async"
                                        data-nimg={1}
                                        className="w-80"
                                        src={logo}
                                    />
                                </Link>
                            </div>
                            <div className="text-neutral-800 text-sm font-normal leading-tight">
                                The only
                                NFT marketplace dedicated to books & wisdom.
                            </div>
                        </div>
                        <div className="justify-start items-start gap-8 flex">
                            <div className="flex-col justify-start items-start gap-4 inline-flex">
                                <div
                                    className="self-stretch px-4 py-2 rounded-lg justify-start items-center gap-2 inline-flex">
                                    <div
                                        className="text-neutral-800 text-lg font-normal leading-relaxed">Marketplace
                                    </div>
                                </div>
                                <div
                                    className="self-stretch px-4 py-2 rounded-lg justify-start items-center gap-2 inline-flex">
                                    <div
                                        className="text-neutral-800 text-lg font-normal leading-relaxed">My
                                        Books
                                    </div>
                                </div>
                                <div
                                    className="self-stretch px-4 py-2 rounded-lg justify-start items-center gap-2 inline-flex">
                                    <div
                                        className="text-neutral-800 text-lg font-normal leading-relaxed">Minting
                                    </div>
                                </div>
                            </div>
                            <div className="flex-col justify-start items-start gap-4 inline-flex">
                                <div
                                    className="self-stretch px-4 py-2 rounded-lg justify-start items-center gap-2 inline-flex">
                                    <div
                                        className="text-neutral-800 text-lg font-normal leading-relaxed">Goverance
                                    </div>
                                    <div className=" relative"/>
                                </div>
                                <div
                                    className="self-stretch px-4 py-2 rounded-lg justify-start items-center gap-2 inline-flex">
                                    <div
                                        className="text-neutral-800 text-lg font-normal leading-relaxed">Discord
                                    </div>
                                    <div className=" relative"/>
                                </div>
                                <div
                                    className="self-stretch px-4 py-2 rounded-lg justify-start items-center gap-2 inline-flex">
                                    <div
                                        className="text-neutral-800 text-lg font-normal leading-relaxed">Twitter
                                    </div>
                                    <div className=" relative"/>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default Login;