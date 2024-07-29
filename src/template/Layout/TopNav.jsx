import Menu from "./Menu.jsx";
import {
  DynamicConnectButton,
  DynamicWidget,
  useIsLoggedIn,
} from "@dynamic-labs/sdk-react-core";
import icon from "../../assets/icon.svg";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { Menu as MenuIcon } from "lucide-react";
import { PlusCircledIcon } from "@radix-ui/react-icons";
import { useDynamicContext } from "@dynamic-labs/sdk-react-core";
import Invite from "./Invite.jsx";

function TopNav(props) {
  const isLoggedIn = useIsLoggedIn();
  const { user } = useDynamicContext();
  const [userXP, setUserXP] = useState(0);
  const [userLevel, setUserLevel] = useState(0);

  useEffect(() => {
    if (isLoggedIn) {
      try {
      setUserXP(user.metadata.xp);
      setUserLevel(user.metadata.level);
      } catch (error) {
        console.log("error", error);
      }
    }
  }, [user, isLoggedIn]);

  return (
    <>
      <div className="container mx-auto pt-6 pb-4 justify-between items-center flex">
        <div className="basis-1/50 items-center justify-center text-center flex">
          <img src={icon} alt="icon" className="w-10 h-10" />
        </div>
        <div className="basis-1/3">{props.item && "Reading "}<span className="font-bold">{props.item && props.item.name}</span></div>
        {/*}
        <div className="basis-1/3">
          <Link to={"/marketplace"}>Marketplace</Link>
        </div>
        */}
        <div>
          <div className="basis-1/3 gap-2 flex justify-end">
            {isLoggedIn ? (
              <>
              <button className="px-4 py-2 bg-red-50 rounded-lg">XP: {userXP}</button>
              <Invite/>
                <Link to="/" className="px-4 py-2 bg-red-50 rounded-lg">
                  My Books
                </Link>
                <DynamicWidget />
              </>
            ) : (
              <DynamicConnectButton>
                <div className="px-4 py-2 bg-red-50 rounded-lg">Connect</div>
              </DynamicConnectButton>
            )}
          </div>
        </div>
      </div>
    </>
  );
}

export default TopNav;
