import logo from "../assets/logo.svg";
import Menu from "./Menu.jsx";
import {DynamicConnectButton, DynamicWidget, useIsLoggedIn} from "@dynamic-labs/sdk-react-core";
import icon from "../assets/icon.svg";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faBars} from "@fortawesome/free-solid-svg-icons";
import { Link } from 'react-router-dom';

function TopNav() {
    const isLoggedIn = useIsLoggedIn();

    return (
        <>
            <div className="container mx-auto pt-6 pb-4 justify-between items-center flex">

                <div>
                    <Link to="Marketplace">Marketplace</Link>
                </div>
                <div>
                    <img src={icon} alt="icon" className="w-10 h-10"/>
                </div>
                <div className="gap-2 flex">
                    <div className="px-4 py-2 bg-red-50 rounded-lg">
                        My Books
                    </div>
                    <div className="p-2 ">
                        <FontAwesomeIcon icon={faBars}/>
                    </div>
                    <div>
                        {isLoggedIn? <DynamicWidget/> : <DynamicConnectButton>Connect</DynamicConnectButton>}
                    </div>
                </div>
            </div>
        </>
    );
}

export default TopNav;