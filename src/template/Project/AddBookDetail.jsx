import React, {useState} from "react";
import {Link} from "react-router-dom";
import {Percent, UploadCloud} from "lucide-react";
import { degrees, PDFDocument, rgb, StandardFonts } from 'pdf-lib';
import { useDynamicContext } from "@dynamic-labs/sdk-react-core";

function AddBookDetail({project, projectIndex}) {
    const { user } = useDynamicContext();
    const [coverImage, setCoverImage] = useState(null);
    const [isHovering, setIsHovering] = useState(false);
    const [allowPreview, setAllowPreview] = useState(false);
    const [pdfData, setPdfData] = useState(null);
    const [pdfPreview, setPdfPreview] = useState(null);

    const uploadButtonClasses = ({
        'px-14 py-24 flex-col justify-start items-center gap-4 inline-flex': true,
        'bg-neutral-50 bg-opacity-50': isHovering
    });

    const handleImageUpload = (event) => {
        const file = event.target.files[0];
        if (file && file.type.startsWith("image/")) {
            const reader = new FileReader();
            reader.onloadend = () => {
                // Update the status with this new image URL
                setCoverImage(reader.result);
            };
            reader.readAsDataURL(file);
        }
    };

    const uploadToAPI = () => {
        //const formData = new FormData();
        // `coverImageFile` must be the actual file selected, not the URL/base64.
        // This may require to store the file in the state in addition to its URL/base64.
        //formData.append("image", coverImageFile);
        // Later we should make the request to our API with formData
        // For example: axios.post('yourAPI/uploadImage', formData);
    };

    const saveDraft = () => {
        console.log("saving draft...");
        //todo: upload coverimage to ipfs
        uploadToAPI(coverImage);

        //todo: modify pdf and upload to ipfs
        //todo: do encryption and save key to user profile for project.item.encryptedfile and project.item.encryptionKey
        //todo: create html file at this step... no... we can do that later
    };

    const handleAllowPreviewChange = (event) => {
        setAllowPreview(!event.target.checked);
        console.log("allowPreview", allowPreview);
    }

    const modifyPdf = async function (pdfdata, coverImage, percentagePreview) {
        // switch this to use the data from parameter
        //const url = 'https://pdf-lib.js.org/assets/with_update_sections.pdf'
        const existingPdfBytes = await fetch(url).then(res => res.arrayBuffer())
      
        const pdfDoc = await PDFDocument.load(existingPdfBytes)
        const helveticaFont = await pdfDoc.embedFont(StandardFonts.HelveticaBold)
      
        const pages = pdfDoc.getPages()
        const previewLength = Math.round(pages.length * (percentagePreview / 100));
        console.log("previewLength", previewLength);
    
        const { width, height } = pages[0].getSize();
        const firstPage = pdfDoc.insertPage(0,[width,height]);
        firstPage.drawImage(coverImage);
    
        // removePages
        for (let i = previewLength; i < pages.length; i++) {
            pdfDoc.removePage(i);
        }
        const previewPage = pdfDoc.addPage([width, height]);
        previewPage.drawText('Owners can view this work in full at PageDAO.org', {
          x: 5,
          y: height / 2 + 300,
          size: 50,
          font: helveticaFont,
          color: rgb(0.95, 0.1, 0.1),
          rotate: degrees(-45),
        })
      
        const pdfBytes = await pdfDoc.save();
        return pdfBytes;
      }
    return (
        <>
            <div className="w-full bg-neutral-100">
                <div className="container mx-auto py-10 flex justify-between gap-4">
                    <div className="basis-3/4 flex-row justify-start items-start gap-8 inline-flex w-full">

                        <div className="flex-col justify-start items-start gap-4 inline-flex">
                            <div className="text-neutral-800 text-2xl font-bold font-['Arvo'] leading-normal">
                                Cover
                            </div>
                            <div
                                style={{'--image-url': `url(${coverImage})`}}
                                className={
                                    "relative bg-neutral-50 rounded-lg " +
                                    (!coverImage ? 'border-2 border-gray-300 border-dotted ' : 'border-none ') +
                                    "cursor-pointer w-[358px] h-[467px] " +
                                    "bg-[image:var(--image-url)] bg-no-repeat bg-cover bg-center " +
                                    "items-center justify-center flex "
                                }
                                onMouseEnter={() => setIsHovering(true)}
                                onMouseLeave={() => setIsHovering(false)}
                                onClick={() => document.getElementById('file-upload').click()}
                            >
                                <input
                                    id="file-upload"
                                    type="file"
                                    onChange={handleImageUpload}
                                    style={{display: "none"}}
                                    accept="image/*"
                                />
                                <div
                                    className={
                                        'w-full h-full flex-col justify-center items-center gap-4 inline-flex ' +
                                        (isHovering ? 'bg-neutral-50 bg-opacity-90' : '') +
                                        (coverImage && !isHovering ? 'hidden' : '')
                                    }
                                >
                                    <UploadCloud className="h-12 text-gray-400"/>
                                    <div className="text-center text-neutral-500">
                                        {!coverImage ? 'Upload' : 'Change'} your cover image
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="flex-col justify-start items-start gap-12 inline-flex w-full">
                            <div className="self-stretch flex-col justify-start items-start gap-8 flex">
                                <div className="self-stretch flex-col justify-start items-start gap-4 flex">
                                    <div
                                        className="text-neutral-800 text-2xl font-bold font-['Arvo'] leading-normal">Content
                                    </div>
                                    <div
                                        className="self-stretch rounded-lg flex-col justify-start items-start gap-2 flex">
                                        <div
                                            className="self-stretch px-4 py-3 bg-neutral-50 rounded-lg flex-col justify-start items-start gap-1 flex">
                                            <div
                                                className="self-stretch justify-start items-start gap-2.5 inline-flex">
                                                <div
                                                    className="text-neutral-500 text-sm font-normal font-['DM Sans'] leading-tight">
                                                    Book file <i>(PDF only)</i>
                                                </div>
                                            </div>
                                            <div
                                                className="self-stretch justify-start items-center gap-1 inline-flex">
                                                <div
                                                    className="justify-center items-center gap-1 flex">

                                                    <input
                                                        id="file"
                                                        type="file"
                                                        className="file:px-4 file:py-2 file:border-solid
                                                        file:rounded-lg file:border file:border-dao-primary
                                                        file:text-dao-primary file:text-sm file:font-bold
                                                        file:font-['DM Sans'] file:leading-tight file:bg-neutral-50
                                                        file:cursor-pointer file:focus:outline-none
                                                        file:outline-none file:appearance-none
                                                        text-zinc-700 text-sm font-normal font-['DM Sans'] leading-snug
                                                        "
                                                        accept=".pdf"

                                                    />
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
                                            className="self-stretch pl-4 pr-2 py-3 bg-neutral-50 rounded-lg flex-col justify-start items-start gap-1 flex">
                                            <div
                                                className="self-stretch justify-start items-start gap-2.5 inline-flex">
                                                <div
                                                    className="text-zinc-600 text-sm font-normal font-['DM Sans'] leading-tight">
                                                    Book name
                                                </div>
                                            </div>
                                            <div
                                                className="self-stretch justify-start items-start gap-1 inline-flex">
                                                <div
                                                    className="grow shrink basis-0 justify-start items-center gap-2.5 flex">
                                                    <input
                                                        className="bg-transparent py-2 text-black border-0 text-base font-normal font-['DM Sans'] leading-snug w-full focus:outline-none"
                                                        name="book_name"
                                                        type="text"
                                                        placeholder="Book name"
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div
                                        className="self-stretch rounded-lg flex-col justify-start items-start gap-1 flex">
                                        <div
                                            className="self-stretch grow shrink basis-0 pl-4 pr-2 py-3 bg-neutral-50 rounded-lg flex-col justify-start items-start gap-1 flex">
                                            <div
                                                className="self-stretch justify-start items-start gap-2.5 inline-flex">
                                                <div
                                                    className="text-zinc-600 text-sm font-normal font-['DM Sans'] leading-tight">
                                                    Description
                                                </div>
                                            </div>
                                            <div
                                                className="self-stretch grow shrink basis-0 justify-start items-start gap-1 inline-flex">
                                                <div
                                                    className="grow shrink basis-0 justify-start items-center gap-2.5 flex">
                                                    <textarea
                                                        className="bg-transparent py-2 text-black text-base font-normal font-['DM Sans'] leading-snug w-full focus:outline-none"
                                                        name="description"
                                                        placeholder="Write a good description"
                                                        rows="5"
                                                    ></textarea>
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
                                            className="self-stretch pl-4 pr-2 py-3 bg-neutral-50 rounded-lg flex-col justify-start items-start gap-1 flex">
                                            <div
                                                className="self-stretch justify-start items-start gap-2.5 inline-flex">
                                                <div
                                                    className="text-zinc-600 text-sm font-normal font-['DM Sans'] leading-tight">Supply
                                                </div>
                                            </div>
                                            <div
                                                className="self-stretch justify-start items-start gap-1 inline-flex">
                                                <input
                                                    className="bg-transparent py-2 text-black border-0 text-base font-normal font-['DM Sans'] leading-snug w-full focus:outline-none"
                                                    name="supply"
                                                    type="text"
                                                    placeholder="1000"
                                                />
                                            </div>
                                        </div>
                                        <div
                                            className="self-stretch px-4 justify-start items-start gap-2.5 inline-flex">
                                            <div
                                                className="grow shrink basis-0 text-gray-600 text-sm font-normal font-['DM Sans'] leading-tight">This
                                                will determine how many copy you are ready to sell for your readers.
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="flex-col justify-start items-start gap-4 inline-flex w-full">
                                <div
                                    className="text-neutral-800 text-2xl font-bold font-['Arvo'] leading-normal">Preview
                                </div>
                                <div className="self-stretch rounded-lg flex-col justify-start items-start flex">
                                    <div
                                        className="self-stretch px-4 pt-4 pb-2 bg-neutral-50 justify-between items-center inline-flex">
                                        <div className="justify-start items-center gap-2 flex">
                                            <div
                                                className="text-neutral-800 text-lg font-bold font-['DM Sans'] leading-relaxed">Allow
                                                reader to preview
                                            </div>
                                        </div>
                                        <div className="relative">
                                            <label htmlFor="allow_preview">
                                                <input id="allow_preview" onChange={handleAllowPreviewChange} type="checkbox" className="bigCheckBox"/>
                                            </label>
                                        </div>
                                    </div>
                                    <div
                                        className="self-stretch rounded-lg flex-col justify-start items-start gap-1 flex">
                                        <div
                                            className="self-stretch pl-4 pr-2 py-3 bg-neutral-50 flex-col justify-start items-start gap-1 flex">
                                            <div className="self-stretch justify-start items-start gap-2.5 inline-flex">
                                                <div
                                                    className="text-gray-600 text-sm font-normal font-['DM Sans'] leading-tight">Enter
                                                    the amount of book as sample for user to preview
                                                </div>
                                            </div>
                                            <div
                                                className="self-stretch justify-start items-start gap-1 inline-flex">
                                                <div className="relative mt-2 w-full">
                                                    <input
                                                        type="text"
                                                        name="preview_amount"
                                                        id="preview_amount"
                                                        className="bg-transparent block w-full py-1.5 pl-0 pr-20 text-black border-0 text-base font-normal font-['DM Sans'] leading-snug placeholder:text-gray-400 focus:outline-none "
                                                        placeholder="10"
                                                    />
                                                    <div className="absolute inset-y-0 right-0 flex items-center">
                                                        <span
                                                            className="text-gray-500 sm:text-sm bg-transparent py-0 pl-2 pr-4"><Percent/></span>
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
                                    <button
                                        className="px-16 py-3 rounded-lg border border-neutral-800 text-neutral-800 text-base font-bold font-['DM Sans'] leading-snug"
                                        onClick={saveDraft}>
                                        Save draft
                                    </button>
                                </div>
                                <div
                                    className="grow shrink basis-0 justify-center items-center gap-1 flex">
                                    {/* call save and then navigate to preview page */}
                                    <button
                                        className="px-8 py-3 bg-dao-primary rounded-lg text-center text-neutral-50 text-base font-bold font-['DM Sans'] leading-snug w-full">
                                        Next, Preview
                                    </button>
                                </div>
                            </div>
                        </div>

                    </div>


                    {/* Publishing Settings */}
                    <div className="basis-1/4 w-full">
                        <div
                            className="p-6 flex-col justify-start items-start gap-6 inline-flex">
                            <div className="flex-col justify-start items-start gap-4 inline-flex">
                                <div
                                    className="self-stretch text-neutral-800 text-2xl font-bold font-['Arvo'] leading-normal">
                                    Publishing Settings
                                </div>
                                <div className="self-stretch flex-col justify-start items-start gap-6 flex">
                                    <div
                                        className="self-stretch pb-2 border-b border-neutral-500 flex-col justify-start items-start gap-2 flex">
                                        <div
                                            className="text-neutral-800 text-xl font-normal font-['DM Sans'] leading-7">Network
                                        </div>
                                        <div
                                            className="text-right text-neutral-800 text-xl font-medium font-['DM Sans'] leading-7">Polygon
                                        </div>
                                    </div>
                                    <div
                                        className="self-stretch pb-2 border-b border-neutral-500 flex-col justify-start items-start gap-2 flex">
                                        <div
                                            className="text-neutral-800 text-xl font-normal font-['DM Sans'] leading-7">Minting
                                            schedule
                                        </div>
                                        <div
                                            className="text-right text-zinc-400 text-xl font-medium font-['DM Sans'] leading-7">Coming
                                            soon
                                        </div>
                                    </div>
                                    <div
                                        className="self-stretch pb-2 border-b border-neutral-500 flex-col justify-start items-start gap-2 flex">
                                        <div
                                            className="text-neutral-800 text-xl font-normal font-['DM Sans'] leading-7">Whitelist
                                        </div>
                                        <div
                                            className="text-right text-zinc-400 text-xl font-medium font-['DM Sans'] leading-7">Coming
                                            soon
                                        </div>
                                    </div>
                                    <div
                                        className="self-stretch pb-2 border-b border-neutral-500 flex-col justify-start items-start gap-2 flex">
                                        <div
                                            className="text-neutral-800 text-xl font-normal font-['DM Sans'] leading-7">Claim
                                        </div>
                                        <div
                                            className="text-right text-zinc-400 text-xl font-medium font-['DM Sans'] leading-7">Coming
                                            soon
                                        </div>
                                    </div>
                                    <div
                                        className="self-stretch pb-2 border-b border-neutral-500 flex-col justify-start items-start gap-2 flex">
                                        <div
                                            className="text-neutral-800 text-xl font-normal font-['DM Sans'] leading-7">Airdrop
                                        </div>
                                        <div
                                            className="text-right text-zinc-400 text-xl font-medium font-['DM Sans'] leading-7">Coming
                                            soon
                                        </div>
                                    </div>
                                    <div
                                        className="self-stretch pb-2 border-b border-neutral-500 flex-col justify-start items-start gap-2 flex">
                                        <div
                                            className="text-neutral-800 text-xl font-normal font-['DM Sans'] leading-7">Mint
                                            on demand
                                        </div>
                                        <div
                                            className="text-right text-zinc-400 text-xl font-medium font-['DM Sans'] leading-7">Coming
                                            soon
                                        </div>
                                    </div>
                                    <div
                                        className="p-4 bg-amber-100 rounded-lg justify-center items-center gap-2 inline-flex">
                                        <div
                                            className="grow shrink basis-0 text-neutral-800 text-lg font-normal font-['DM Sans'] leading-relaxed">
                                            Your content is stored and computed on encrypted data through Secret Network.
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default AddBookDetail;