import {Link} from "react-router-dom";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faGear} from "@fortawesome/free-solid-svg-icons";

function Header() {
    return (
        <>
            <div className="w-full bg-gray-50">
                <div className="container mx-auto py-10 flex justify-between">
                    <div className="">
                        <h2
                            className="text-neutral-800 text-6xl font-bold font-['Arvo']">
                            My Books
                        </h2>
                    </div>
                    <div className="justify-end items-center gap-4 flex">
                        <button className="bg-white px-4 py-3 rounded-xl text-neutral-800 text-base font-medium font-['DM Sans'] leading-snug">
                            Share my profile
                        </button>
                        <Link to={"/"}>
                            <FontAwesomeIcon icon={faGear} />
                        </Link>
                    </div>
                </div>
            </div>
        </>
    );
}

export default Header;