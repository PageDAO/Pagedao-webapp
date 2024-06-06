import { useContext } from "react";
import {TasksContext} from "../Providers/TasksContext";

function SideBar() {
    const tasks = useContext(TasksContext);
    return (
        <>
            <div
                className="p-6 bg-white rounded-xl flex-col justify-start items-start inline-flex w-full">
                <div className="self-stretch flex-col justify-start items-start gap-6 flex">
                    <div
                        className="self-stretch text-neutral-800 text-3xl font-bold font-['Arvo'] leading-loose">
                        Stats
                    </div>
                    <div className="self-stretch   flex-col justify-start items-start gap-2 flex">
                        <div
                            className="self-stretch pb-2 border-b border-zinc-500 justify-between items-start inline-flex">
                            <div
                                className="text-neutral-800 text-xl font-normal font-['DM Sans'] leading-7">
                                Projects created
                            </div>
                            <div
                                className="text-right text-neutral-800 text-xl font-bold font-['DM Sans'] leading-7">
                                {tasks.length}
                            </div>
                        </div>
                        <div
                            className="self-stretch pb-2 border-b border-neutral-500 justify-between items-start inline-flex">
                            <div
                                className="text-neutral-800 text-xl font-normal font-['DM Sans'] leading-7">
                                Items purchased
                            </div>
                            <div
                                className="text-right text-neutral-800 text-xl font-bold font-['DM Sans'] leading-7">
                                0
                            </div>
                        </div>
                    </div>
                </div>
                <div className="py-20 relative bg-rose-100 w-full text-center mt-10">
                    <div
                        className="text-black text-base font-bold font-['DM Sans'] leading-snug">
                        
                    </div>
                </div>
            </div>
        </>
    );
}

export default SideBar;