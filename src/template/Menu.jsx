import logo from "../assets/logo.svg";

function Menu() {
    return (
        <>
            <nav className="flex items-center space-x-4 lg:space-x-6 mx-6">
                <a
                    className="text-sm font-medium transition-colors hover:text-primary"
                    href="/examples/dashboard"
                >
                    Overview
                </a>
                <a
                    className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
                    href="/examples/dashboard"
                >
                    Customers
                </a>
                <a
                    className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
                    href="/examples/dashboard"
                >
                    Products
                </a>
                <a
                    className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
                    href="/examples/dashboard"
                >
                    Settings
                </a>
            </nav>
        </>
    );
}

export default Menu;