import Menu from "./Menu.jsx";
import {DynamicWidget, useIsLoggedIn} from "@dynamic-labs/sdk-react-core";
import icon from "../../assets/icon.svg";
import {Link} from "react-router-dom";
import {Menu as MenuIcon} from 'lucide-react';


function TopNav() {
    const isLoggedIn = useIsLoggedIn();

    return (
        <>
            <div className="container mx-auto pt-6 pb-4 justify-between items-center flex">
                <div className="basis-1/3">
                    <Link to={'/marketplace'}>
                        Marketplace
                    </Link>
                </div>
                <div className="basis-1/3 items-center justify-center text-center flex">
                    <img src={icon} alt="icon" className="w-10 h-10"/>
                </div>
                <div className="basis-1/3 gap-2 flex justify-end">
                    <Link
                        to="/"
                        className="px-4 py-2 bg-red-50 rounded-lg">
                        My Books
                    </Link>
                    <div className="p-2 ">
                        <MenuIcon/>

                    </div>
                    <div>
                        {isLoggedIn && <DynamicWidget/>}
                    </div>
                </div>
            </div>
        </>
    );
}

export default TopNav;