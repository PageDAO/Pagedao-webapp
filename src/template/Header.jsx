import logo from "../assets/logo.svg";
import Menu from "./Menu.jsx";
import {DynamicWidget, useDynamicContext} from "@dynamic-labs/sdk-react-core";

function Header() {
    return (
        <>
            <div className="flex h-16 items-center px-4">
                <img
                    className="block w-auto max-w-full h-8 align-middle lg:hidden"
                    src={logo}
                    alt="PageDAO"
                />
                <img
                    className="hidden w-auto max-w-full h-8 align-middle lg:block"
                    src={logo}
                    alt="PageDAO"
                />
                <Menu />
                <div className="ml-auto flex items-center space-x-4">
                    <button
                        className="inline-flex items-center justify-center whitespace-nowrap text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 hover:bg-accent hover:text-accent-foreground px-4 py-2 relative h-8 w-8 rounded-full"
                        type="button"
                        id="radix-:r11j:"
                        aria-haspopup="menu"
                        aria-expanded="false"
                        data-state="closed"
                    >
                      <span className="relative flex shrink-0 overflow-hidden rounded-full h-8 w-8">
                        <img
                            className="aspect-square h-full w-full"
                            alt="@shadcn"
                            src="https://i.pravatar.cc/500"
                        />
                      </span>
                    </button>
                    <DynamicWidget/>
                </div>
            </div>
        </>
    );
}

export default Header;