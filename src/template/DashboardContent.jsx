import logo from "../assets/logo.svg";
import {useDynamicContext} from "@dynamic-labs/sdk-react-core";

function DashboardContent() {
    const {user} = useDynamicContext();
    return (
        <>
            <div className="flex items-center justify-between space-y-2">
                <h2 className="text-3xl font-bold tracking-tight">
                    Hi {user?.alias || 'Guest'}, {' '}
                    welcome to your Dashboard
                </h2>
                <div className="flex items-center space-x-2">
                    <div className="grid gap-2">
                        <button
                            className="inline-flex items-center whitespace-nowrap rounded-md text-sm transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 border border-input bg-background shadow-sm hover:bg-accent hover:text-accent-foreground h-9 px-4 py-2 w-[260px] justify-start text-left font-normal"
                            id="date"
                            type="button"
                            aria-haspopup="dialog"
                            aria-expanded="false"
                            aria-controls="radix-:r11l:"
                            data-state="closed"
                        >
                            <svg
                                width={15}
                                height={15}
                                viewBox="0 0 15 15"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                                className="mr-2 h-4 w-4"
                            >
                                <path
                                    d="M4.5 1C4.77614 1 5 1.22386 5 1.5V2H10V1.5C10 1.22386 10.2239 1 10.5 1C10.7761 1 11 1.22386 11 1.5V2H12.5C13.3284 2 14 2.67157 14 3.5V12.5C14 13.3284 13.3284 14 12.5 14H2.5C1.67157 14 1 13.3284 1 12.5V3.5C1 2.67157 1.67157 2 2.5 2H4V1.5C4 1.22386 4.22386 1 4.5 1ZM10 3V3.5C10 3.77614 10.2239 4 10.5 4C10.7761 4 11 3.77614 11 3.5V3H12.5C12.7761 3 13 3.22386 13 3.5V5H2V3.5C2 3.22386 2.22386 3 2.5 3H4V3.5C4 3.77614 4.22386 4 4.5 4C4.77614 4 5 3.77614 5 3.5V3H10ZM2 6V12.5C2 12.7761 2.22386 13 2.5 13H12.5C12.7761 13 13 12.7761 13 12.5V6H2ZM7 7.5C7 7.22386 7.22386 7 7.5 7C7.77614 7 8 7.22386 8 7.5C8 7.77614 7.77614 8 7.5 8C7.22386 8 7 7.77614 7 7.5ZM9.5 7C9.22386 7 9 7.22386 9 7.5C9 7.77614 9.22386 8 9.5 8C9.77614 8 10 7.77614 10 7.5C10 7.22386 9.77614 7 9.5 7ZM11 7.5C11 7.22386 11.2239 7 11.5 7C11.7761 7 12 7.22386 12 7.5C12 7.77614 11.7761 8 11.5 8C11.2239 8 11 7.77614 11 7.5ZM11.5 9C11.2239 9 11 9.22386 11 9.5C11 9.77614 11.2239 10 11.5 10C11.7761 10 12 9.77614 12 9.5C12 9.22386 11.7761 9 11.5 9ZM9 9.5C9 9.22386 9.22386 9 9.5 9C9.77614 9 10 9.22386 10 9.5C10 9.77614 9.77614 10 9.5 10C9.22386 10 9 9.77614 9 9.5ZM7.5 9C7.22386 9 7 9.22386 7 9.5C7 9.77614 7.22386 10 7.5 10C7.77614 10 8 9.77614 8 9.5C8 9.22386 7.77614 9 7.5 9ZM5 9.5C5 9.22386 5.22386 9 5.5 9C5.77614 9 6 9.22386 6 9.5C6 9.77614 5.77614 10 5.5 10C5.22386 10 5 9.77614 5 9.5ZM3.5 9C3.22386 9 3 9.22386 3 9.5C3 9.77614 3.22386 10 3.5 10C3.77614 10 4 9.77614 4 9.5C4 9.22386 3.77614 9 3.5 9ZM3 11.5C3 11.2239 3.22386 11 3.5 11C3.77614 11 4 11.2239 4 11.5C4 11.7761 3.77614 12 3.5 12C3.22386 12 3 11.7761 3 11.5ZM5.5 11C5.22386 11 5 11.2239 5 11.5C5 11.7761 5.22386 12 5.5 12C5.77614 12 6 11.7761 6 11.5C6 11.2239 5.77614 11 5.5 11ZM7 11.5C7 11.2239 7.22386 11 7.5 11C7.77614 11 8 11.2239 8 11.5C8 11.7761 7.77614 12 7.5 12C7.22386 12 7 11.7761 7 11.5ZM9.5 11C9.22386 11 9 11.2239 9 11.5C9 11.7761 9.22386 12 9.5 12C9.77614 12 10 11.7761 10 11.5C10 11.2239 9.77614 11 9.5 11Z"
                                    fill="currentColor"
                                    fillRule="evenodd"
                                    clipRule="evenodd"
                                />
                            </svg>
                            Jan 20, 2023 - Feb 09, 2023
                        </button>
                    </div>
                    <button
                        className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground shadow hover:bg-primary/90 h-9 px-4 py-2">
                        Download
                    </button>
                </div>
            </div>
            <div dir="ltr" data-orientation="horizontal" className="space-y-4">
                <div
                    role="tablist"
                    aria-orientation="horizontal"
                    className="inline-flex h-9 items-center justify-center rounded-lg bg-muted p-1 text-muted-foreground"
                    tabIndex={0}
                    data-orientation="horizontal"
                    style={{outline: "none"}}
                >
                    <button
                        type="button"
                        role="tab"
                        aria-selected="true"
                        aria-controls="radix-:r11m:-content-overview"
                        data-state="active"
                        id="radix-:r11m:-trigger-overview"
                        className="inline-flex items-center justify-center whitespace-nowrap rounded-md px-3 py-1 text-sm font-medium ring-offset-background transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 data-[state=active]:bg-background data-[state=active]:text-foreground data-[state=active]:shadow"
                        tabIndex={-1}
                        data-orientation="horizontal"
                        data-radix-collection-item=""
                    >
                        Overview
                    </button>
                    <button
                        type="button"
                        role="tab"
                        aria-selected="false"
                        aria-controls="radix-:r11m:-content-analytics"
                        data-state="inactive"
                        data-disabled=""
                        disabled=""
                        id="radix-:r11m:-trigger-analytics"
                        className="inline-flex items-center justify-center whitespace-nowrap rounded-md px-3 py-1 text-sm font-medium ring-offset-background transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 data-[state=active]:bg-background data-[state=active]:text-foreground data-[state=active]:shadow"
                        tabIndex={-1}
                        data-orientation="horizontal"
                        data-radix-collection-item=""
                    >
                        Analytics
                    </button>
                    <button
                        type="button"
                        role="tab"
                        aria-selected="false"
                        aria-controls="radix-:r11m:-content-reports"
                        data-state="inactive"
                        data-disabled=""
                        disabled=""
                        id="radix-:r11m:-trigger-reports"
                        className="inline-flex items-center justify-center whitespace-nowrap rounded-md px-3 py-1 text-sm font-medium ring-offset-background transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 data-[state=active]:bg-background data-[state=active]:text-foreground data-[state=active]:shadow"
                        tabIndex={-1}
                        data-orientation="horizontal"
                        data-radix-collection-item=""
                    >
                        Reports
                    </button>
                    <button
                        type="button"
                        role="tab"
                        aria-selected="false"
                        aria-controls="radix-:r11m:-content-notifications"
                        data-state="inactive"
                        data-disabled=""
                        disabled=""
                        id="radix-:r11m:-trigger-notifications"
                        className="inline-flex items-center justify-center whitespace-nowrap rounded-md px-3 py-1 text-sm font-medium ring-offset-background transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 data-[state=active]:bg-background data-[state=active]:text-foreground data-[state=active]:shadow"
                        tabIndex={-1}
                        data-orientation="horizontal"
                        data-radix-collection-item=""
                    >
                        Notifications
                    </button>
                </div>
                <div
                    data-state="active"
                    data-orientation="horizontal"
                    role="tabpanel"
                    aria-labelledby="radix-:r11m:-trigger-overview"
                    id="radix-:r11m:-content-overview"
                    tabIndex={0}
                    className="mt-2 ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 space-y-4"
                    style={{animationDuration: "0s"}}
                >
                    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                        <div className="rounded-xl border bg-card text-card-foreground shadow">
                            <div
                                className="p-6 flex flex-row items-center justify-between space-y-0 pb-2">
                                <h3 className="tracking-tight text-sm font-medium">
                                    Total Revenue
                                </h3>
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    stroke="currentColor"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    className="h-4 w-4 text-muted-foreground"
                                >
                                    <path
                                        d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/>
                                </svg>
                            </div>
                            <div className="p-6 pt-0">
                                <div className="text-2xl font-bold">$45,231.89</div>
                                <p className="text-xs text-muted-foreground">
                                    +20.1% from last month
                                </p>
                            </div>
                        </div>
                        <div className="rounded-xl border bg-card text-card-foreground shadow">
                            <div
                                className="p-6 flex flex-row items-center justify-between space-y-0 pb-2">
                                <h3 className="tracking-tight text-sm font-medium">
                                    Subscriptions
                                </h3>
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    stroke="currentColor"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    className="h-4 w-4 text-muted-foreground"
                                >
                                    <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/>
                                    <circle cx={9} cy={7} r={4}/>
                                    <path d="M22 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75"/>
                                </svg>
                            </div>
                            <div className="p-6 pt-0">
                                <div className="text-2xl font-bold">+2350</div>
                                <p className="text-xs text-muted-foreground">
                                    +180.1% from last month
                                </p>
                            </div>
                        </div>
                        <div className="rounded-xl border bg-card text-card-foreground shadow">
                            <div
                                className="p-6 flex flex-row items-center justify-between space-y-0 pb-2">
                                <h3 className="tracking-tight text-sm font-medium">Sales</h3>
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    stroke="currentColor"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    className="h-4 w-4 text-muted-foreground"
                                >
                                    <rect width={20} height={14} x={2} y={5} rx={2}/>
                                    <path d="M2 10h20"/>
                                </svg>
                            </div>
                            <div className="p-6 pt-0">
                                <div className="text-2xl font-bold">+12,234</div>
                                <p className="text-xs text-muted-foreground">
                                    +19% from last month
                                </p>
                            </div>
                        </div>
                        <div className="rounded-xl border bg-card text-card-foreground shadow">
                            <div
                                className="p-6 flex flex-row items-center justify-between space-y-0 pb-2">
                                <h3 className="tracking-tight text-sm font-medium">Active Now</h3>
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    stroke="currentColor"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    className="h-4 w-4 text-muted-foreground"
                                >
                                    <path d="M22 12h-4l-3 9L9 3l-3 9H2"/>
                                </svg>
                            </div>
                            <div className="p-6 pt-0">
                                <div className="text-2xl font-bold">+573</div>
                                <p className="text-xs text-muted-foreground">
                                    +201 since last hour
                                </p>
                            </div>
                        </div>
                    </div>
                    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
                        <div
                            className="rounded-xl border bg-card text-card-foreground shadow col-span-4">
                            <div className="flex flex-col space-y-1.5 p-6">
                                <h3 className="font-semibold leading-none tracking-tight">
                                    Overview
                                </h3>
                            </div>
                            <div className="p-6 pt-0 pl-2">
                                <div
                                    className="recharts-responsive-container"
                                    style={{width: "100%", height: 350, minWidth: 0}}
                                    width={0}
                                    height={0}
                                />
                            </div>
                        </div>
                        <div
                            className="rounded-xl border bg-card text-card-foreground shadow col-span-3">
                            <div className="flex flex-col space-y-1.5 p-6">
                                <h3 className="font-semibold leading-none tracking-tight">
                                    Recent Sales
                                </h3>
                                <p className="text-sm text-muted-foreground">
                                    You made 265 sales this month.
                                </p>
                            </div>
                            <div className="p-6 pt-0">
                                <div className="space-y-8">
                                    <div className="flex items-center">
                  <span className="relative flex shrink-0 overflow-hidden rounded-full h-9 w-9">
                    <img
                        className="aspect-square h-full w-full"
                        alt="Avatar"
                        src="https://i.pravatar.cc/500"
                    />
                  </span>
                                        <div className="ml-4 space-y-1">
                                            <p className="text-sm font-medium leading-none">
                                                Olivia Martin
                                            </p>
                                            <p className="text-sm text-muted-foreground">
                                                olivia.martin@email.com
                                            </p>
                                        </div>
                                        <div className="ml-auto font-medium">+$1,999.00</div>
                                    </div>
                                    <div className="flex items-center">
                  <span
                      className="relative shrink-0 overflow-hidden rounded-full flex h-9 w-9 items-center justify-center space-y-0 border">
                    <img
                        className="aspect-square h-full w-full"
                        alt="Avatar"
                        src="https://i.pravatar.cc/500"
                    />
                  </span>
                                        <div className="ml-4 space-y-1">
                                            <p className="text-sm font-medium leading-none">
                                                Jackson Lee
                                            </p>
                                            <p className="text-sm text-muted-foreground">
                                                jackson.lee@email.com
                                            </p>
                                        </div>
                                        <div className="ml-auto font-medium">+$39.00</div>
                                    </div>
                                    <div className="flex items-center">
                  <span className="relative flex shrink-0 overflow-hidden rounded-full h-9 w-9">
                    <img
                        className="aspect-square h-full w-full"
                        alt="Avatar"
                        src="https://i.pravatar.cc/500"
                    />
                  </span>
                                        <div className="ml-4 space-y-1">
                                            <p className="text-sm font-medium leading-none">
                                                Isabella Nguyen
                                            </p>
                                            <p className="text-sm text-muted-foreground">
                                                isabella.nguyen@email.com
                                            </p>
                                        </div>
                                        <div className="ml-auto font-medium">+$299.00</div>
                                    </div>
                                    <div className="flex items-center">
                  <span className="relative flex shrink-0 overflow-hidden rounded-full h-9 w-9">
                    <img
                        className="aspect-square h-full w-full"
                        alt="Avatar"
                        src="https://i.pravatar.cc/500"
                    />
                  </span>
                                        <div className="ml-4 space-y-1">
                                            <p className="text-sm font-medium leading-none">
                                                William Kim
                                            </p>
                                            <p className="text-sm text-muted-foreground">
                                                will@email.com
                                            </p>
                                        </div>
                                        <div className="ml-auto font-medium">+$99.00</div>
                                    </div>
                                    <div className="flex items-center">
                  <span className="relative flex shrink-0 overflow-hidden rounded-full h-9 w-9">
                    <img
                        className="aspect-square h-full w-full"
                        alt="Avatar"
                        src="https://i.pravatar.cc/500"
                    />
                  </span>
                                        <div className="ml-4 space-y-1">
                                            <p className="text-sm font-medium leading-none">
                                                Sofia Davis
                                            </p>
                                            <p className="text-sm text-muted-foreground">
                                                sofia.davis@email.com
                                            </p>
                                        </div>
                                        <div className="ml-auto font-medium">+$39.00</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default DashboardContent;