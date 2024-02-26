import logo from "../assets/logo-inverted.svg";
import background from "../assets/pagedao_hero_video_bg.png";
import {Link} from "react-router-dom";
import {DynamicWidget} from "@dynamic-labs/sdk-react-core";

function Login() {
    return (
        <>
            <div className="border bg-background shadow-md md:shadow-xl">
                <div className="md:hidden p-4">
                    <Link
                        to={'/'}
                    >
                        <img
                            alt="Authentication"
                            loading="lazy"
                            decoding="async"
                            data-nimg={1}
                            className="block dark:hidden"
                            src={logo}
                            style={{color: "transparent"}}
                        />
                        <img
                            alt="Authentication"
                            loading="lazy"
                            decoding="async"
                            data-nimg={1}
                            className="hidden dark:block"
                            src={logo}
                            style={{color: "transparent"}}
                        />
                    </Link>
                </div>
                <div
                    className="container relative hidden h-[800px] flex-col items-center justify-center md:grid lg:max-w-none lg:grid-cols-2 lg:px-0"

                >
                    <div
                        className="relative hidden h-full flex-col bg-muted p-10 text-white lg:flex dark:border-r"
                    >
                        <div
                            style={{'--image-url': `url(${background})`}}
                            className={'absolute inset-0 bg-zinc-900 bg-center bg-[image:var(--image-url)] bg-no-repeat bg-cover'}
                        />
                        <div className="relative z-20 flex items-center text-lg font-medium">
                            <Link
                                to={'/'}
                            >
                                <img
                                    alt="Authentication"
                                    loading="lazy"
                                    decoding="async"
                                    data-nimg={1}
                                    className=""
                                    width={200}
                                    src={logo}
                                />
                            </Link>
                        </div>
                        <div className="relative z-20 mt-auto">
                            <blockquote className="space-y-2">
                                <p className="text-lg">
                                    “Our NFT minter is design & build with book/pdf in mind. We figured that other
                                    marketplace didn’t built with pdf content in mind, this is why we are proud to
                                    present this minter for our DAO members. Get started now.”
                                </p>
                                <footer className="text-sm">PageDAO Team</footer>
                            </blockquote>
                        </div>
                    </div>
                    <div className="lg:p-8">
                        <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
                            <div className="flex flex-col space-y-2 text-center">
                                <h1 className="text-2xl font-semibold tracking-tight">
                                    You need to log in
                                </h1>
                                <p className="text-sm text-muted-foreground">
                                    Log in using your wallet to continue
                                </p>
                            </div>
                            <div className="grid gap-6 text-center align-middle">
                                <DynamicWidget/>
                            </div>
                            <p className="px-8 text-center text-sm text-muted-foreground">
                                By clicking continue, you agree to our{" "}
                                <Link
                                    className="underline underline-offset-4 hover:text-primary"
                                    to={'/'}
                                >
                                    Terms of Service
                                </Link>{" "}
                                and{" "}
                                <Link
                                    className="underline underline-offset-4 hover:text-primary"
                                    to={'/'}
                                >
                                    Privacy Policy
                                </Link>
                                .
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default Login;