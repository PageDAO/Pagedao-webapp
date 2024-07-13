import {Link} from "react-router-dom";
import {Settings} from "lucide-react";
import { useDynamicContext } from "@dynamic-labs/sdk-react-core";

    function Header({headerText = "Your PageDAO today"}) {
        const { user } = useDynamicContext();
        return (
            <>
                <div className="w-full bg-neutral-100">
                    <div className="container mx-auto py-10 flex justify-between">
                        <div className="">
                            <h2
                                className="text-neutral-800 text-6xl font-bold font-['Arvo']">
                                {headerText || "Dashboard"}
                            </h2>
                        </div>
                        <div className="justify-end items-center gap-4 flex">
                            {user.userId &&
                            <Link to={"/profile/"+userId}
                                className="bg-white px-4 py-3 rounded-xl text-neutral-800 text-base font-medium font-['DM Sans'] leading-snug">
                                View my profile
                            </Link>}
                            <button>
                                <Settings/>
                            </button>
                        </div>
                    </div>
                </div>
            </>
        );
    }

export default Header;