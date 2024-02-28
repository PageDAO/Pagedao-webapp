import {Link} from "react-router-dom";

function PreviewBookDetail() {
    return (
        <>
            <div className="px-52 py-10 bg-dao-primary w-full">
                <div className="container mx-auto justify-center items-end gap-10 inline-flex ">
                    <div
                        className="grow shrink basis-0 text-center text-neutral-50 text-4xl font-bold font-['Arvo'] leading-10">
                        Preview your book
                    </div>
                </div>
            </div>
            <div className="bg-dao-primary w-full">
                <div className="container mx-auto justify-center flex w-full">
                    <div className="w-1/2 p-8 bg-neutral-50 rounded-lg flex-col justify-start items-start gap-6  mb-20">
                        <div className="flex-col justify-start items-start gap-4 flex">
                            <div className="text-neutral-800 text-2xl font-bold font-['Arvo'] leading-normal">
                                Cover
                            </div>
                            <div className="relative bg-neutral-50 rounded-lg">
                                <div
                                    className="flex-col justify-start items-center gap-4 inline-flex">
                                    <div className="relative">
                                        <img src="https://picsum.photos/358/467" alt="cover" className="rounded-xl"/>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="self-stretch flex-col justify-start items-start gap-12 flex">
                            <div className="self-stretch flex-col justify-start items-start gap-8 flex">
                                <div className="self-stretch flex-col justify-start items-start gap-4 flex">
                                    <div
                                        className="text-neutral-800 text-2xl font-bold font-['Arvo'] leading-normal">
                                        Content
                                    </div>
                                    <div
                                        className="self-stretch rounded-lg flex-col justify-start items-start gap-2 flex">
                                        <div
                                            className="self-stretch pb-3 rounded-lg flex-col justify-start items-start gap-1 flex">
                                            <div className="self-stretch justify-start items-start gap-2.5 inline-flex">
                                                <div
                                                    className="text-neutral-500 text-sm font-normal font-['DM Sans'] leading-tight">
                                                    Book file
                                                </div>
                                            </div>
                                            <div className="self-stretch justify-start items-center gap-1 inline-flex">
                                                <div
                                                    className="grow shrink basis-0 justify-start items-start gap-1 flex">
                                                    <div
                                                        className="grow shrink basis-0 justify-start items-center gap-2.5 flex">
                                                        <div
                                                            className="text-gray-500 text-base font-normal font-['DM Sans'] leading-snug">
                                                            filename.pdf
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="self-stretch flex-col justify-start items-start gap-4 flex">
                                    <div
                                        className="text-neutral-800 text-2xl font-bold font-['Arvo'] leading-normal">Information
                                        & Metadata
                                    </div>
                                    <div
                                        className="self-stretch rounded-lg flex-col justify-start items-start gap-1 flex">
                                        <div
                                            className="self-stretch pr-2 pb-3 rounded-lg flex-col justify-start items-start gap-1 flex">
                                            <div className="self-stretch justify-start items-start gap-2.5 inline-flex">
                                                <div
                                                    className="text-zinc-600 text-sm font-normal font-['DM Sans'] leading-tight">Book
                                                    name
                                                </div>
                                            </div>
                                            <div className="self-stretch justify-start items-start gap-1 inline-flex">
                                                <div
                                                    className="grow shrink basis-0 justify-start items-center gap-2.5 flex">
                                                    <div
                                                        className="text-neutral-800 text-base font-normal font-['DM Sans'] leading-snug">The
                                                        Utopia crisis
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div
                                        className="self-stretch rounded-lg flex-col justify-start items-start gap-1 flex">
                                        <div
                                            className="self-stretch grow shrink basis-0 pr-2 pb-3 rounded-lg flex-col justify-start items-start gap-1 flex">
                                            <div className="self-stretch justify-start items-start gap-2.5 inline-flex">
                                                <div
                                                    className="text-zinc-600 text-sm font-normal font-['DM Sans'] leading-tight">Description
                                                </div>
                                            </div>
                                            <div
                                                className="self-stretch grow shrink basis-0 justify-start items-start gap-1 inline-flex">
                                                <div
                                                    className="grow shrink basis-0 justify-start items-center gap-2.5 flex">
                                                    <div
                                                        className="text-neutral-800 text-base font-normal font-['DM Sans'] leading-snug">too
                                                        much to say
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="self-stretch flex-col justify-start items-start gap-4 flex">
                                    <div
                                        className="text-neutral-800 text-2xl font-bold font-['Arvo'] leading-normal">Selling
                                        offer
                                    </div>
                                    <div
                                        className="self-stretch rounded-lg flex-col justify-start items-start gap-1 flex">
                                        <div
                                            className="self-stretch pr-2 pb-3 rounded-lg flex-col justify-start items-start gap-1 flex">
                                            <div className="self-stretch justify-start items-start gap-2.5 inline-flex">
                                                <div
                                                    className="text-zinc-600 text-sm font-normal font-['DM Sans'] leading-tight">Supply
                                                </div>
                                            </div>
                                            <div className="self-stretch justify-start items-start gap-1 inline-flex">
                                                <div
                                                    className="grow shrink basis-0 justify-start items-center gap-2.5 flex">
                                                    <div
                                                        className="text-neutral-800 text-base font-normal font-['DM Sans'] leading-snug">20
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div
                                        className="self-stretch rounded-lg flex-col justify-start items-start gap-1 flex">
                                        <div
                                            className="self-stretch pr-2 pb-3 rounded-lg flex-col justify-start items-start gap-1 flex">
                                            <div className="self-stretch justify-start items-start gap-2.5 inline-flex">
                                                <div
                                                    className="text-zinc-600 text-sm font-normal font-['DM Sans'] leading-tight">Network
                                                </div>
                                            </div>
                                            <div className="self-stretch justify-start items-start gap-1 inline-flex">
                                                <div
                                                    className="grow shrink basis-0 justify-start items-center gap-2.5 flex">
                                                    <div
                                                        className="text-neutral-800 text-base font-normal font-['DM Sans'] leading-snug">Polygon
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="self-stretch justify-start items-start gap-4 inline-flex">
                                <div
                                    className="justify-center items-center gap-1 flex">
                                    <Link
                                        to="/book/add"
                                        className="text-neutral-800 text-base font-bold font-['DM Sans'] leading-snug
                                        px-8 py-3 rounded-lg border border-neutral-800">
                                        Back to edit
                                    </Link>
                                </div>
                                <div
                                    className="grow shrink basis-0 justify-center items-center gap-1 flex">
                                    <Link
                                        to="/book/publishing"
                                        className="text-neutral-50 text-center text-base font-bold font-['DM Sans'] leading-snug
                                        px-8 py-3 bg-dao-primary rounded-lg w-full">
                                        Publish now
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default PreviewBookDetail;