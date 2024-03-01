import {Link} from "react-router-dom";
import {useState} from "react";

function Header({title: initialTitle, breadcrumb, breadcrumbLink = '/'}) {
    const [isEditing, setIsEditing] = useState(false);
    const [title, setTitle] = useState(initialTitle);

    const handleTitleClick = () => {
        setIsEditing(true);
    };

    const handleTitleChange = (e) => {
        setTitle(e.target.value);
    };

    const handleBlur = () => {
        setIsEditing(false);

        // Todo: Save project title
        console.log('Title changed to:', title)
    };

    const handleKeyDown = (e) => {
        if (e.key === "Enter") {
            e.preventDefault();
            e.target.blur();
        }
    };

    return (
        <>
            <div className="w-full bg-gray-50">
                <div className="container mx-auto py-10 flex justify-between">
                    <div className="grow shrink basis-0 flex-col justify-end items-start gap-4 inline-flex">
                        <div className="self-stretch justify-start items-center inline-flex mb-4">
                            <Link
                                to={breadcrumbLink}
                                className="text-orange-800 text-base font-normal font-['DM Sans'] leading-snug">
                                {breadcrumb}
                            </Link>
                        </div>
                        <div className="self-stretch pr-16 justify-start items-start gap-2 inline-flex">
                            {isEditing ? (
                                <input
                                    type="text"
                                    value={title}
                                    onChange={handleTitleChange}
                                    onBlur={handleBlur}
                                    onKeyDown={handleKeyDown}
                                    autoFocus
                                    className="text-neutral-800 text-6xl font-bold font-['Arvo'] leading-10"
                                />
                            ) : (
                                <h1
                                    onClick={handleTitleClick}
                                    className="grow shrink basis-0 text-neutral-800 text-6xl font-bold font-['Arvo'] leading-10">
                                    {title}
                                </h1>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default Header;