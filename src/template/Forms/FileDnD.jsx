import React, {useRef, useState} from 'react';
import {faUpload} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faCircleXmark, faFile} from "@fortawesome/free-regular-svg-icons";

function humanFileSize(size) {
    const i = Math.floor(Math.log(size) / Math.log(1024));
    return (size / Math.pow(1024, i)).toFixed(2) * 1 + " " + ['B', 'kB', 'MB', 'GB', 'TB'][i];
}

const FileDnD = () => {
    const [files, setFiles] = useState([]);
    const [dragging, setDragging] = useState(null);
    const [dropping, setDropping] = useState(null);
    const fileInputRef = useRef(null);

    const addFiles = (event) => {
        const newFiles = [...files, ...event.target.files];
        setFiles(newFiles);
    };

    const removeFile = (index) => {
        const newFiles = [...files];
        newFiles.splice(index, 1);
        setFiles(newFiles);
    };

    const dragStart = (index) => (event) => {
        setDragging(index);
    };

    const dragEnter = (index) => (event) => {
        setDropping(index);
    };

    const dragOver = (event) => {
        event.preventDefault();
    };

    const drop = (event) => {
        event.preventDefault();
        const newFiles = [...files];
        const file = newFiles.splice(dragging, 1)[0];
        newFiles.splice(dropping, 0, file);
        setFiles(newFiles);
        setDragging(null);
        setDropping(null);
    };

    return (
        <div className="bg-white p-7 rounded w-full mx-auto">
            <div className="relative flex flex-col p-4 text-gray-400 border border-gray-200 rounded w-full">
                <div
                    className="relative flex flex-col text-gray-400 border border-gray-200 border-dashed rounded cursor-pointer"
                    onDragOver={(event) => event.preventDefault()}
                >
                    <input
                        ref={fileInputRef}
                        accept="*"
                        type="file"
                        multiple
                        className="absolute inset-0 z-50 w-full h-full p-0 m-0 outline-none opacity-0 cursor-pointer"
                        onChange={addFiles}
                        title=""
                    />
                    <div className="flex flex-col items-center justify-center py-10 text-center">
                        <FontAwesomeIcon
                            icon={faUpload}
                            className="w-10 h-10 text-gray-400"
                        />
                        <p>Drag your files here or click in this area.</p>
                    </div>
                </div>

                {files.length > 0 && (
                    <div className="grid grid-cols-2 gap-4 mt-4 md:grid-cols-6">
                        {files.map((file, index) => (
                            <div
                                key={index}
                                className={`p-4 relative flex flex-col items-center overflow-hidden text-center bg-gray-100 border rounded cursor-move select-none ${dragging === index ? 'border-blue-600' : ''}`}
                                draggable="true"
                                onDragStart={dragStart(index)}
                                onDragEnter={dragEnter(index)}
                                onDragOver={dragOver}
                                onDrop={drop}
                            >
                                {/* ToDo: File type icons or previews here */}
                                <FontAwesomeIcon icon={faFile} className="h-10" />
                                <button onClick={() => removeFile(index)} type="button" className="absolute top-0 right-1">
                                    <FontAwesomeIcon icon={faCircleXmark}/>
                                </button>
                                <div>
                                    <div className="text-gray-900">{file.name}</div>
                                    <div>{humanFileSize(file.size)}</div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

export default FileDnD;