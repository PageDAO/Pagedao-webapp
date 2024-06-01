import { useState, useEffect } from "react";
import { Percent, UploadCloud } from "lucide-react";
import { degrees, PDFDocument, rgb, StandardFonts } from "pdf-lib";
import {
  useDynamicContext,
  useUserUpdateRequest,
} from "@dynamic-labs/sdk-react-core";
import {
  generateBookFromTemplate,
  pinToIPFS,
  encryptAndStoreItem,
  fetchMetadata, saveMetadata
} from "../Utils";
import { Navigate } from "react-router-dom/dist";

function AddBookDetail({ project, projectIndex, itemIndex }) {
  const { isAuthenticated, user } = useDynamicContext() ;
  const { updateUser } = useUserUpdateRequest();
  const [coverImage, setCoverImage] = useState(null);
  const [isHovering, setIsHovering] = useState(false);
  const [allowPreview, setAllowPreview] = useState(false);
  const [percentagePreview, setPercentagePreview] = useState(10);
  const [bookName, setBookName] = useState("");
  const [description, setDescription] = useState("");
  const [supply, setSupply] = useState(1000);
  const [pdfData, setPdfData] = useState(null);
  const [pdfPreview, setPdfPreview] = useState(null);
  const [projects, setProjects] = useState([]);

  const uploadButtonClasses = {
    "px-14 py-24 flex-col justify-start items-center gap-4 inline-flex": true,
    "bg-neutral-50 bg-opacity-50": isHovering,
  };

  useEffect(() => {
    if (!isAuthenticated) {
      Navigate("/login");
    }
    async function fetchMeta() {
        const metadata = await fetchMetadata(user?.metadata.hash);
        console.log(metadata);
        setProjects(metadata.projects);
    }
    fetchMeta();
  }, [user?.metadata, isAuthenticated]);
  
  // todo: load form values if the itemIndex is not null
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

  const handlePdfUpload = (event) => {
    const file = event.target.files[0];
    if (file && file.type === "application/pdf") {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPdfData(reader.result);
      };
      reader.readAsDataURL(file);
    } else {
      console.log("didn't detect a file");
    }
  };

  const uploadToAPI = async (data, filename) => {
    console.log("uploadtoapi:", data.constructor.name, data);
    const result = await pinToIPFS(
      data,
      filename || "file",
      import.meta.env.VITE_APP_IPFS_API_URL
    );
    return result;
  };

  const goToCreate = async () => {
    // make sure all the variables are set to pass to the next page
    // set pdfPreview - just call saveDraft (todo: add a dirty flag if data has been changed since draft was saved)
    saveDraft();
    // set project index [ and item index? ] { projectIndex: projectIndex, itemIndex: itemIndex }
    // navigate to PreviewBook
  }

  const saveDraft = async () => {
    console.log("saving draft...");
  
    const coverImageFile = new File(
      [await fetch(coverImage).then((r) => r.blob())],
      "coverImage"
    );
    const coverImageURI = await uploadToAPI(
      new File([coverImageFile], coverImageFile.name)
    );

    const { modifiedPDF, pageCount, previewPages } = await modifyPdf(
      pdfData,
      coverImage,
      percentagePreview
    );
    const pdfURI = await uploadToAPI(new File([modifiedPDF], "modifiedPDF"));

    // will call util function to post pdf data to backend / fiftywei / save
    const encryptedPdfURI = encryptPdf(pdfData);

    const options = {
      title: bookName,
      image: "/ipfs/" + coverImageURI,
      authorTwitter: user.username,
      purchaseURL: "",
      pdfURL: "/ipfs/" + pdfURI,
      description: description,
      backgroundImage: "https://via.placeholder.com/150",
      baseHref: "/ipfs/QmdpqLgSWdfFHExp4c9ARUtPxExxRrsoAT8Ume2RMjmgkQ/",
    };

    const html = Buffer.from(generateBookFromTemplate(options), "utf8");
    const htmlURI = await uploadToAPI(html, "index.html");

    const projectItem = {
      "name": bookName,
      "description": description,
      "image": coverImageURI,
      "pdf": pdfURI,
      "video": "",
      "audio": "",
      "encryptedfile": encryptedPdfURI,
      "ERC721metadata": {},
      "interactiveURL": htmlURI,
      "previewPages": previewPages,
      "pages": pageCount,
      "genre": "Genre",
      "type": "Book",
      "releases": [
          {
              "chainId": 137,
              "contractAddress": "0x1234567890",
              "tokenStandard": "ERC721",
              "tokenId": "1234567890",
              "date": "dd/mm/yyyy",
              "price": 0,
              "currency": "ETH",
              "royalties": 0
          }
      ],
      "status": "Draft"
  }
  
    console.log("projectItem", projectItem);

    const contractMetadata = {
      name: projectItem.name,
      symbol: projectItem.name.toUpperCase().substring(0,5),
      description: projectItem.description,
      image:
          projectItem.image,
      seller_fee_basis_points: 1000,
      fee_recipient: user.wallet?.address,
      };
    const contractMetadataURI = await uploadToAPI(contractMetadata, "metadata.json");
    projectItem.contractMetadataURI = contractMetadataURI;
    
    if (!project.items) project.items = [];
    project.items?.push(projectItem);

    // load the user metadata and update the project
    updateUserMetadata(user, project, projectIndex);

    // also navigate to the project page
    //Navigate(`/project/${projectIndex}`);
  };

  const updateUserMetadata = (user, project, projectIndex) => {
    // Get the existing projects from user.metadata, or create an empty array if it doesn't exist
    const existingProjects = projects;
//      user.metadata && user.metadata.projects ? user.metadata.projects : [];

    // Add the new project to the existing projects
    existingProjects[projectIndex] = project;

    // Create the userFields object
    const userFields = {
      metadata: {
        projects: existingProjects,
      },
    };

    const handleSave = async (userFields) => {
      const metadataHash = await saveMetadata(userFields.metadata);

      const { updateUserProfileResponse } = await updateUser(
        {metadata: {'hash': metadataHash}},
        import.meta.env.VITE_APP_DYNAMIC_ENVIRONMENT_ID
      );

      // Handle successful update without email verification, e.g., show a success message or redirect
      console.log(
        "attempted to save profile",
        userFields,
        updateUserProfileResponse
      );
    };

    handleSave(userFields);
  };

  const handleAllowPreviewChange = (event) => {
    setAllowPreview(!event.target.checked);
    console.log("allowPreview", allowPreview);
  };

  const handleUpdatePreviewAmount = (event) => {
    setPercentagePreview(event.target.value);
  };

  const handleBookNameChange = (event) => {
    setBookName(event.target.value);
  };

  const handleDescriptionChange = (event) => {
    setDescription(event.target.value);
  };

  const handleSupplyChange = (event) => {
    setSupply(event.target.value);
  };

  const encryptPdf = async function (pdfData) {
    //todo post pdf data via axios to
    try {
      const result = await encryptAndStoreItem(pdfData);
      console.log("encryption result:", result);
      //const encryptedPdfURI = result.encryptedPdfURI, encryptionKey, tx } = 
      return "encryptedPdfURI";
    } catch (error) {
      console.log("error", error);
    }
    /*    // Generate local asymmetric keys as "anonymous" user
    const ECDHKeys = ECDHEncryption.generate();

    //console.log("ECDH Pubkey", ECDHKeys.publicKey);

    const sharedKey = ECDHEncryption.generateSharedKey(
      secretContractPublicKey,
      ECDHKeys.privateKey
    );
    //console.log("sharedKey", sharedKey);

    const encryptedMessage = await ECDHEncryption.encrypt(pdfData, sharedKey);
    console.log("encryptedMessage", encryptedMessage);
    return { encryptedMessage, sharedKey };
  */
  };

  const modifyPdf = async function (pdfData, coverImage, percentagePreview) {
    const existingPdfBytes = pdfData; //await fetch(pdfURL).then((res) =>res.arrayBuffer());
    const coverImageType = coverImage.match(/[^:/]\w+(?=;|,)/)[0];
    const coverImageBytes = await fetch(coverImage).then((res) =>
      res.arrayBuffer()
    );

    const pdfDoc = await PDFDocument.load(existingPdfBytes);
    const helveticaFont = await pdfDoc.embedFont(StandardFonts.HelveticaBold);

    const pages = pdfDoc.getPages();
    const previewLength = Math.round(pages.length * (percentagePreview / 100));
    console.log("previewLength", previewLength);

    const { width, height } = pages[0].getSize();
    console.log("width", width, "height", height);

    const firstPage = pdfDoc.insertPage(0, [width, height]);

    var cover;

    //embed the image
    if (coverImageType == "png") {
      cover = await pdfDoc.embedPng(coverImageBytes);
    } else {
      cover = await pdfDoc.embedJpg(coverImageBytes);
    }
    const aspectRatio = width / height;
    const coverWidth = width;
    const coverHeight = coverWidth / aspectRatio;
    firstPage.drawImage(cover, {
      width: coverWidth,
      height: coverHeight,
    });

    // removePages
    for (let i = pages.length; i > previewLength; i--) {
      pdfDoc.removePage(i);
    }
    const previewPage = pdfDoc.addPage([width, height]);
    previewPage.drawText("Owners can view this work in full at PageDAO.org", {
      x: 5,
      y: height / 2 + 300,
      size: 24,
      font: helveticaFont,
      color: rgb(0.95, 0.1, 0.1),
      rotate: degrees(-45),
    });
    const pdfBytes = await pdfDoc.save();
    return {
      modifiedPDF: pdfBytes,
      pageCount: pages.length,
      previewPages: previewLength,
    };
  };

  /*
  pdf-lib code to make a link - todo: make this point to the asset page on this site where a person can purchase or read
  const createPageLinkAnnotation = (page: PDFPage, uri: string) =>
  page.doc.context.register(
    page.doc.context.obj({
      Type: 'Annot',
      Subtype: 'Link',
      Rect: [0, 30, 40, 230],
      Border: [0, 0, 2],
      C: [0, 0, 1],
      A: {
        Type: 'Action',
        S: 'URI',
        URI: PDFString.of(uri),
      },
    }),
  );

(async () => {
  const pdfDoc = await PDFDocument.create();
  const helveticaFont = await pdfDoc.embedFont(StandardFonts.Helvetica);
  const page = pdfDoc.addPage();
  page.drawText('https://pdf-lib.js.org/', {
    x: 23,
    y: 43,
    size: 20,
    font: helveticaFont,
    color: rgb(0.95, 0.1, 0.1),
    rotate: degrees(90),
  });

  const link = createPageLinkAnnotation(page, 'https://pdf-lib.js.org/');
  page.node.set(PDFName.of('Annots'), pdfDoc.context.obj([link]));

  const pdfBytes = await pdfDoc.save();
})();
  */

  // default base href for code: https://ipfs.nftbookbazaar.com/ipfs/QmdpqLgSWdfFHExp4c9ARUtPxExxRrsoAT8Ume2RMjmgkQ/ < shorten to relative link
  // default backgroundImage https://ipfs.nftbookbazaar.com/ipfs/QmbB68XY3Vm761dNNpLZCSzKL8ZS5F5sV7mUhxgfxgNuVi",
  //title, image, authorTwitter, purchaseURL, pdfURL, description, backgroundImage, baseHref
  // const generateFlipbookHTML = (options) => {

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
                style={{ "--image-url": `url(${coverImage})` }}
                className={
                  "relative bg-neutral-50 rounded-lg " +
                  (!coverImage
                    ? "border-2 border-gray-300 border-dotted "
                    : "border-none ") +
                  "cursor-pointer w-[358px] h-[467px] " +
                  "bg-[image:var(--image-url)] bg-no-repeat bg-cover bg-center " +
                  "items-center justify-center flex "
                }
                onMouseEnter={() => setIsHovering(true)}
                onMouseLeave={() => setIsHovering(false)}
                onClick={() => document.getElementById("file-upload").click()}
              >
                <input
                  id="file-upload"
                  type="file"
                  onChange={handleImageUpload}
                  style={{ display: "none" }}
                  accept="image/*"
                />
                <div
                  className={
                    "w-full h-full flex-col justify-center items-center gap-4 inline-flex " +
                    (isHovering ? "bg-neutral-50 bg-opacity-90" : "") +
                    (coverImage && !isHovering ? "hidden" : "")
                  }
                >
                  <UploadCloud className="h-12 text-gray-400" />
                  <div className="text-center text-neutral-500">
                    {!coverImage ? "Upload" : "Change"} your cover image
                  </div>
                </div>
              </div>
            </div>
            <div className="flex-col justify-start items-start gap-12 inline-flex w-full">
              <div className="self-stretch flex-col justify-start items-start gap-8 flex">
                <div className="self-stretch flex-col justify-start items-start gap-4 flex">
                  <div className="text-neutral-800 text-2xl font-bold font-['Arvo'] leading-normal">
                    Content
                  </div>
                  <div className="self-stretch rounded-lg flex-col justify-start items-start gap-2 flex">
                    <div className="self-stretch px-4 py-3 bg-neutral-50 rounded-lg flex-col justify-start items-start gap-1 flex">
                      <div className="self-stretch justify-start items-start gap-2.5 inline-flex">
                        <div className="text-neutral-500 text-sm font-normal font-['DM Sans'] leading-tight">
                          Book file <i>(PDF only)</i>
                        </div>
                      </div>
                      <div className="self-stretch justify-start items-center gap-1 inline-flex">
                        <div className="justify-center items-center gap-1 flex">
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
                            onChange={handlePdfUpload}
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="self-stretch flex-col justify-start items-start gap-4 flex">
                  <div className="text-neutral-800 text-2xl font-bold font-['Arvo'] leading-normal">
                    Information & Metadata
                  </div>
                  <div className="self-stretch rounded-lg flex-col justify-start items-start gap-1 flex">
                    <div className="self-stretch pl-4 pr-2 py-3 bg-neutral-50 rounded-lg flex-col justify-start items-start gap-1 flex">
                      <div className="self-stretch justify-start items-start gap-2.5 inline-flex">
                        <div className="text-zinc-600 text-sm font-normal font-['DM Sans'] leading-tight">
                          Book name
                        </div>
                      </div>
                      <div className="self-stretch justify-start items-start gap-1 inline-flex">
                        <div className="grow shrink basis-0 justify-start items-center gap-2.5 flex">
                          <input
                            className="bg-transparent py-2 text-black border-0 text-base font-normal font-['DM Sans'] leading-snug w-full focus:outline-none"
                            name="book_name"
                            type="text"
                            placeholder="Book name"
                            onChange={handleBookNameChange}
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="self-stretch rounded-lg flex-col justify-start items-start gap-1 flex">
                    <div className="self-stretch grow shrink basis-0 pl-4 pr-2 py-3 bg-neutral-50 rounded-lg flex-col justify-start items-start gap-1 flex">
                      <div className="self-stretch justify-start items-start gap-2.5 inline-flex">
                        <div className="text-zinc-600 text-sm font-normal font-['DM Sans'] leading-tight">
                          Description
                        </div>
                      </div>
                      <div className="self-stretch grow shrink basis-0 justify-start items-start gap-1 inline-flex">
                        <div className="grow shrink basis-0 justify-start items-center gap-2.5 flex">
                          <textarea
                            className="bg-transparent py-2 text-black text-base font-normal font-['DM Sans'] leading-snug w-full focus:outline-none"
                            name="description"
                            placeholder="Write a good description"
                            rows="5"
                            onChange={handleDescriptionChange}
                          ></textarea>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="self-stretch flex-col justify-start items-start gap-4 flex">
                  <div className="text-neutral-800 text-2xl font-bold font-['Arvo'] leading-normal">
                    Distribution and Supply
                  </div>
                  <div className="self-stretch rounded-lg flex-col justify-start items-start gap-1 flex">
                    <div className="self-stretch pl-4 pr-2 py-3 bg-neutral-50 rounded-lg flex-col justify-start items-start gap-1 flex">
                      <div className="self-stretch justify-start items-start gap-2.5 inline-flex">
                        <div className="text-zinc-600 text-sm font-normal font-['DM Sans'] leading-tight">
                          Supply
                        </div>
                      </div>
                      <div className="self-stretch justify-start items-start gap-1 inline-flex">
                        <input
                          className="bg-transparent py-2 text-black border-0 text-base font-normal font-['DM Sans'] leading-snug w-full focus:outline-none"
                          name="supply"
                          type="text"
                          placeholder="25"
                          onChange={handleSupplyChange}
                        />
                      </div>
                    </div>
                    <div className="self-stretch px-4 justify-start items-start gap-2.5 inline-flex">
                      <div className="grow shrink basis-0 text-gray-600 text-sm font-normal font-['DM Sans'] leading-tight">
                        This will determine how many copies you are ready to
                        sell for your readers.
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="flex-col justify-start items-start gap-4 inline-flex w-full">
                <div className="text-neutral-800 text-2xl font-bold font-['Arvo'] leading-normal">
                  Preview
                </div>
                <div className="self-stretch rounded-lg flex-col justify-start items-start flex">
                  <div className="self-stretch px-4 pt-4 pb-2 bg-neutral-50 justify-between items-center inline-flex">
                    <div className="justify-start items-center gap-2 flex">
                      <div className="text-neutral-800 text-lg font-bold font-['DM Sans'] leading-relaxed">
                        Allow reader to preview
                      </div>
                    </div>
                    <div className="relative">
                      <label htmlFor="allow_preview">
                        <input
                          id="allow_preview"
                          onChange={handleAllowPreviewChange}
                          defaultChecked={allowPreview}
                          type="checkbox"
                          className="bigCheckBox"
                        />
                      </label>
                    </div>
                  </div>
                  <div className="self-stretch rounded-lg flex-col justify-start items-start gap-1 flex">
                    <div className="self-stretch pl-4 pr-2 py-3 bg-neutral-50 flex-col justify-start items-start gap-1 flex">
                      <div className="self-stretch justify-start items-start gap-2.5 inline-flex">
                        <div className="text-gray-600 text-sm font-normal font-['DM Sans'] leading-tight">
                          Enter the percentage as sample for user to preview
                        </div>
                      </div>
                      <div className="self-stretch justify-start items-start gap-1 inline-flex">
                        <div className="relative mt-2 w-full">
                          <input
                            type="text"
                            name="preview_amount"
                            id="preview_amount"
                            className="bg-transparent block w-full py-1.5 pl-0 pr-20 text-black border-0 text-base font-normal font-['DM Sans'] leading-snug placeholder:text-gray-400 focus:outline-none "
                            placeholder="10"
                            onChange={handleUpdatePreviewAmount}
                          />
                          <div className="absolute inset-y-0 right-0 flex items-center">
                            <span className="text-gray-500 sm:text-sm bg-transparent py-0 pl-2 pr-4">
                              <Percent />
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="self-stretch justify-start items-start gap-4 inline-flex">
                <div className="justify-center items-center gap-1 flex">
                  <button
                    className="px-16 py-3 rounded-lg border border-neutral-800 text-neutral-800 text-base font-bold font-['DM Sans'] leading-snug"
                    onClick={saveDraft}
                  >
                    Save draft
                  </button>
                </div>
                <div className="grow shrink basis-0 justify-center items-center gap-1 flex">
                  {/* call save and then navigate to preview page */}
                  <button 
                    className="px-8 py-3 bg-dao-primary rounded-lg text-center text-neutral-50 text-base font-bold font-['DM Sans'] leading-snug w-full"
                    onClick={goToCreate}
                  >
                    Next, Preview
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Publishing Settings */}
          <div className="basis-1/4 w-full">
            <div className="p-6 flex-col justify-start items-start gap-6 inline-flex">
              <div className="flex-col justify-start items-start gap-4 inline-flex">
                <div className="self-stretch text-neutral-800 text-2xl font-bold font-['Arvo'] leading-normal">
                  Publishing Settings
                </div>
                <div className="self-stretch flex-col justify-start items-start gap-6 flex">
                  <div className="self-stretch pb-2 border-b border-neutral-500 flex-col justify-start items-start gap-2 flex">
                    <div className="text-neutral-800 text-xl font-normal font-['DM Sans'] leading-7">
                      Network
                    </div>
                    <div className="text-right text-neutral-800 text-xl font-medium font-['DM Sans'] leading-7">
                      Polygon
                    </div>
                  </div>
                  <div className="self-stretch pb-2 border-b border-neutral-500 flex-col justify-start items-start gap-2 flex">
                    <div className="text-neutral-800 text-xl font-normal font-['DM Sans'] leading-7">
                      Minting schedule
                    </div>
                    <div className="text-right text-zinc-400 text-xl font-medium font-['DM Sans'] leading-7">
                      Coming soon
                    </div>
                  </div>
                  <div className="self-stretch pb-2 border-b border-neutral-500 flex-col justify-start items-start gap-2 flex">
                    <div className="text-neutral-800 text-xl font-normal font-['DM Sans'] leading-7">
                      Whitelist
                    </div>
                    <div className="text-right text-zinc-400 text-xl font-medium font-['DM Sans'] leading-7">
                      Coming soon
                    </div>
                  </div>
                  <div className="self-stretch pb-2 border-b border-neutral-500 flex-col justify-start items-start gap-2 flex">
                    <div className="text-neutral-800 text-xl font-normal font-['DM Sans'] leading-7">
                      Claim
                    </div>
                    <div className="text-right text-zinc-400 text-xl font-medium font-['DM Sans'] leading-7">
                      Coming soon
                    </div>
                  </div>
                  <div className="self-stretch pb-2 border-b border-neutral-500 flex-col justify-start items-start gap-2 flex">
                    <div className="text-neutral-800 text-xl font-normal font-['DM Sans'] leading-7">
                      Airdrop
                    </div>
                    <div className="text-right text-zinc-400 text-xl font-medium font-['DM Sans'] leading-7">
                      Coming soon
                    </div>
                  </div>
                  <div className="self-stretch pb-2 border-b border-neutral-500 flex-col justify-start items-start gap-2 flex">
                    <div className="text-neutral-800 text-xl font-normal font-['DM Sans'] leading-7">
                      Mint on demand
                    </div>
                    <div className="text-right text-zinc-400 text-xl font-medium font-['DM Sans'] leading-7">
                      Coming soon
                    </div>
                  </div>
                  <div className="p-4 bg-amber-100 rounded-lg justify-center items-center gap-2 inline-flex">
                    <div className="grow shrink basis-0 text-neutral-800 text-lg font-normal font-['DM Sans'] leading-relaxed">
                      Your content is stored and computed on encrypted data
                      through Secret Network.
                    </div>
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

export default AddBookDetail;
