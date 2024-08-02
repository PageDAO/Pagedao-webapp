import { useState, useRef, useContext, useEffect, useMemo } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Percent, UploadCloud } from "lucide-react";
import { degrees, PDFDocument, rgb, StandardFonts } from "pdf-lib";
import {
  useDynamicContext,
  useUserUpdateRequest,
} from "@dynamic-labs/sdk-react-core";
import {
  generatePDFBookFromTemplate,
  pinToIPFS,
  encryptAndStoreItem,
  updateUserMetadata,
  genreTags,
  itemTypeTags,
  descriptorTags,
} from "../Utils";
import {
  TasksContext,
  TasksDispatchContext,
} from "../Providers/TasksContext.js";
import * as Toast from "@radix-ui/react-toast";
import Select from "react-select";
import ReactWindowedSelect from "../../components/ReactWindowedSelect";
import ItemCreationModal from "./ItemCreationModal";
import { createThirdwebClient } from "thirdweb";
import { upload } from "thirdweb/storage";
import {
  BlockTypeSelect,
  BoldItalicUnderlineToggles,
  CreateLink,
  imagePlugin,
  InsertImage,
  linkDialogPlugin,
  MDXEditor,
  toolbarPlugin,
} from "@mdxeditor/editor";
import { headingsPlugin } from "@mdxeditor/editor";

import "@mdxeditor/editor/style.css";

const genreOptions = genreTags.map((item) => {
  return { value: item, label: item };
});

function AddBookDetail({ projectIndex, itemIndex }) {
  const { isAuthenticated, user } = useDynamicContext();
  const projects = useContext(TasksContext);
  const { updateUser } = useUserUpdateRequest();
  const [isModified, setIsModified] = useState(false);
  const [changes, setChanges] = useState({ coverImage: false, pdfData: false });
  const [coverImage, setCoverImage] = useState("");
  const [coverImageType, setCoverImageType] = useState("");
  const [isHovering, setIsHovering] = useState(false);
  const [allowPreview, setAllowPreview] = useState(false);
  const [addCover, setAddCover] = useState(true);
  const [percentagePreview, setPercentagePreview] = useState(10);
  const [bookName, setBookName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState(5); // todo: add price to the form and save it to the metadata
  const [supply, setSupply] = useState(1000);
  const [itemType, setItemType] = useState("");
  const [genre, setGenre] = useState([]);
  const [tags, setTags] = useState([]);
  const [pdfData, setPdfData] = useState(null);
  const [filename, setFilename] = useState("");
  const [open, setOpen] = useState(false);
  const [openProgress, setOpenProgress] = useState(false);
  const [progressMsg, setProgressMsg] = useState({ message: "", value: 0 });
  const [toastMessage, setToastMessage] = useState("");
  const timerRef = useRef(0);
  const dispatch = useContext(TasksDispatchContext);
  const navigate = useNavigate();
  const client = createThirdwebClient({
    clientId: import.meta.env.VITE_APP_THIRDWEB_CLIENT_ID,
  });

  useMemo(() => {
    // prepopulate things if itemindex is provided
    if (itemIndex) {
      setCoverImage(
        projects[projectIndex].items[itemIndex].image.startsWith("https://")
          ? projects[projectIndex].items[itemIndex].image
          : "https://ipfs.nftbookbazaar.com/ipfs/" +
              projects[projectIndex].items[itemIndex].image
      );
      setBookName(projects[projectIndex].items[itemIndex].name);
      // todo: set filename to let a person know it's saved and present (and they don't need to upload again)
      setFilename(projects[projectIndex].items[itemIndex].filename);
      setPercentagePreview(
        Math.round(
          (projects[projectIndex].items[itemIndex].previewPages /
            projects[projectIndex].items[itemIndex].pages) *
            100
        )
      );
      setDescription(projects[projectIndex].items[itemIndex].description);
      setSupply(projects[projectIndex].items[itemIndex].supply);
      if (projects[projectIndex].items[itemIndex].price)
        setPrice(projects[projectIndex].items[itemIndex].price);
      //setNewItemID(projects[projectIndex].nextItemID);
      setItemType(projects[projectIndex].items[itemIndex].type);
      setGenre(
        projects[projectIndex].items[itemIndex].genre
          .split(", ")
          .map((genre) => ({ value: genre, label: genre }))
      );
      setTags(
        projects[projectIndex].items[itemIndex].tags
          .split(", ")
          .map((tag) => ({ value: tag, label: tag }))
      );
    }
  }, [projects, projectIndex, itemIndex]);

  useEffect(() => {
    document.body.style.setProperty("--image-url", coverImage);
    console.log("setting cover image url css variable", coverImage);
  }, [coverImage]);

  const uploadButtonClasses = {
    "px-14 py-24 flex-col justify-start items-center gap-4 inline-flex": true,
    "bg-neutral-50 bg-opacity-50": isHovering,
  };

  function showToastMessage(message) {
    setOpen(false);
    window.clearTimeout(timerRef.current);
    timerRef.current = window.setTimeout(() => {
      setOpen(true);
      setToastMessage(message);
    }, 200);
  }

  // todo: load form values if the itemIndex is not null
  const handleImageUpload = async (event) => {
    const file = event.target.files[0];
    console.log("file", file);
    if (file && file.type.startsWith("image/")) {
      showToastMessage("Uploading cover image");
      const ipfsURI = await upload({ client: client, files: [file] });

      const uri =
        "https://f249a59bdff8d2da0eb19725b90c6904.ipfscdn.io/ipfs/" +
        ipfsURI.substring(7);
      setCoverImage(uri);
      setCoverImageType(file.type);

      console.log("set the cover image", coverImage);

      setChanges({ pdfData: true, coverImage: true });
      setIsHovering(false);
      setIsModified(true);

      /*
      const reader = new FileReader();
      reader.onloadend = () => {
        // Update the status with this new image URL
        setCoverImage(reader.result);
        console.log("set the cover image", reader);
        setChanges({ pdfData: changes.pdfData, coverImage: true });
        setIsHovering(false);
        setIsModified(true);
      };
      reader.readAsDataURL(file);
      */
    }
  };

  const handleAddCover = (event) => {
    setAddCover(event.target.checked);
  };

  const handlePdfUpload = (event) => {
    const file = event.target.files[0];
    if (file && file.type === "application/pdf") {
      const reader = new FileReader();
      reader.onloadend = () => {
        setFilename(file.name);
        setChanges({ pdfData: true, coverImage: changes.coverImage });
        setPdfData(reader.result);
        setIsModified(true);
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
    await saveDraft();

    navigate(
      "/book/preview/" +
        projectIndex +
        "/" +
        (itemIndex ? itemIndex : projects[projectIndex].items.length)
    );
  };

  async function createModifiedPdf() {
    const modifiedPDF = await modifyPdf(
      pdfData,
      coverImage,
      percentagePreview,
      addCover
    );
    return modifiedPDF;
  }

  async function saveDraftAndReturn() {
    setOpenProgress(true);
    const result = await saveDraft();
    console.log(result);
    if (result) navigate("/project/" + projectIndex);
  }

  const validateForm = () => {
    // check if it's already saved
    // todo: check all the form values and return false if any are missing
    let message = "";
    setOpenProgress(true);
    if (!isModified) {
      message += "No changes to save. ";
    }
    if (!bookName) {
      message += "Book name is missing. ";
    }
    if (!description) {
      message += "Description is missing. ";
    }
    if (!supply) {
      message += "Supply is missing. ";
    }
    if (!pdfData && !filename &&  !projects[projectIndex].items.length>0 && !projects[projectIndex].items[itemIndex].pdf) {
      message += "PDF data is missing. ";
    }
    if (!coverImage) {
      message += "Cover image is missing. ";
    }
    if (allowPreview && !percentagePreview) {
      message += "Percentage preview is missing. ";
    }

    if (message) {
      showToastMessage(message);
      return false;
    } else {
      return true;
    }
  };

  async function saveDraft() {
    if (!validateForm()) return false;
    const projectItem = await createProjectItem();
    if (!itemIndex) {
      dispatch({
        type: "projectItemAdded",
        id: projects[projectIndex].id,
        item: projectItem,
        metadata: user.metadata,
        userUpdateFunction: updateUser,
      });
    } else {
      dispatch({
        type: "projectItemChanged",
        id: projects[projectIndex].id,
        item: projectItem,
        metadata: user.metadata,
        userUpdateFunction: updateUser,
      });
    }

    setIsModified(false);
    return true;
  }

  const createProjectItem = async () => {
    setProgressMsg({ message: "Saving cover image", value: 20 });
    /*
    const coverImageFile =
      changes.coverImage || !itemIndex
        ? new File(
            [await fetch(coverImage).then((r) => r.blob())],
            "coverImage"
          )
        : null;
    const coverImageURI =
      changes.coverImage || !itemIndex
        ? await uploadToAPI(new File([coverImageFile], coverImageFile.name))
        : projects[projectIndex].items[itemIndex].image;
*/
    const coverImageURI = coverImage;

    // todo: do detection on filetype and add character
    setProgressMsg({ message: "Creating viewable PDF", value: 40 });
    const { modifiedPDF, pageCount, previewPages } =
      changes.pdfData || !itemIndex
        ? await modifyPdf(pdfData, coverImage, percentagePreview, addCover)
        : {
            modifiedPDF: null,
            pageCount: projects[projectIndex].items[itemIndex].pages,
            previewPages: projects[projectIndex].items[itemIndex].previewPages,
          };
    const pdfURI =
      changes.pdfData || !itemIndex
        ? await uploadToAPI(new File([modifiedPDF], "modifiedPDF"))
        : projects[projectIndex].items[itemIndex].pdf;

    setProgressMsg({ message: "Encrypting original content", value: 60 });
    const encryptedDocid =
      changes.pdfData || !itemIndex
        ? await encryptPdf(pdfData)
        : projects[projectIndex].items[itemIndex].encryptedfile;

    setProgressMsg({ message: "Saving metadata", value: 80 });
    // background image is a gradient designed to make it easier to read
    const options = {
      title: bookName,
      image: "/ipfs/" + coverImageURI,
      authorTwitter: user.username,
      purchaseURL: "",
      pdfURL: "/ipfs/" + pdfURI,
      description: description,
      backgroundImage: "/ipfs/QmY1RQ2AnRaSDMF2cewLbLZrZJEyojTB8C3gpLgVAZ6Buv",
      baseHref: "/ipfs/QmdpqLgSWdfFHExp4c9ARUtPxExxRrsoAT8Ume2RMjmgkQ/",
    };

    const html = Buffer.from(generatePDFBookFromTemplate(options), "utf8");
    const htmlURI = await uploadToAPI(html, "index.html");

    const suggestedItemId = itemIndex
      ? projects[projectIndex].items[itemIndex].id
      : projects[projectIndex].nextItemID;
    // todo: add tags, genre, and type as attributes
    const itemMetadata = {
      name: bookName,
      description: description,
      image: coverImageURI,
      external_link:
        "https://pagedao-v2.netlify.app/book/" +
        user.userId +
        "/" +
        projects[projectIndex].id +
        "/" +
        suggestedItemId,
      animation_url: "https://ipfs.nftbookbazaar.com/ipfs/" + htmlURI,
      attributes: [
        { trait_type: "Type", value: itemType },
        ...tags.map((tag) => ({ trait_type: "Tag", value: tag.value })),
        ...genre.map((genre) => ({ trait_type: "Genre", value: genre.value })),
        { trait_type: "Pages", value: pageCount },
        { trait_type: "Author", value: user.username },
        {
          display_type: "boost_percentage",
          trait_type: "Available Preview",
          value: percentagePreview,
        },
        { display_type: "number", trait_type: "Version", value: 1 },
      ],
      secret_contract: "secret1kzejyxq0kmecx2455crw78uwrqkwref35kd7a6",
      secret_hash:
        "0bbc0a2b7312513044f1ebc69e0f7f785963a00d488d160fd01d46acdff7cea6",
      secret_docid: encryptedDocid,
      seller_fee_basis_points: 1000,
      fee_recipient: user.wallet?.address,
    };

    const itemMetadataURI = await uploadToAPI(
      JSON.stringify(itemMetadata),
      "metadata.json"
    );

    const contractMetadata = {
      name: `${projects[projectIndex].title} - ${itemType}`,
      symbol: bookName.toUpperCase().substring(0, 5),
      image: coverImageURI, //"https://ipfs.nftbookbazaar.com/ipfs/" + coverImageURI,
      seller_fee_basis_points: 1000,
      fee_recipient: user.wallet?.address,
    };

    //note: try thirdweb ipfs upload here because ehhh it doesn't like our IPFS server?
    const contractMetadataURI = await upload({
      client: client,
      files: [new File([JSON.stringify(contractMetadata)], "0")],
    });
    /*
    const contractMetadataURI = await uploadToAPI(
      JSON.stringify(contractMetadata),
      "contract.json"
    );
    */
    setProgressMsg({ message: "Finalizing files", value: 90 });
    const projectItem = {
      id: suggestedItemId,
      name: bookName,
      description: description,
      image: coverImageURI,
      pdf: pdfURI,
      video: "",
      audio: "",
      filename: filename,
      encryptedfile: encryptedDocid,
      itemMetadataURI: itemMetadataURI,
      interactiveURL: htmlURI,
      previewPages: previewPages,
      pages: pageCount,
      genre: genre.map((option) => option.value).join(", "),
      tags: tags.map((option) => option.value).join(", "),
      type: itemType,
      dateCreated: new Date().toISOString(),
      dateModified: new Date().toISOString(),
      supply: supply,
      contracts: [
        {
          chainId: 137,
          contractMetadataHash: contractMetadataURI,
          contractAddress: "",
          tokenStandard: "ERC721",
          deployed: false,
          price: price,
        },
      ],
      status: "Draft",
    };

    setProgressMsg({ message: "Updating project", value: 100 });
    setOpenProgress(false);

    console.log("projectItem", projectItem);

    return projectItem;
  };

  const handleGenreChange = (selectedOption) => {
    setGenre(selectedOption);
    if (itemIndex)
      projects[projectIndex].items[itemIndex].genre = selectedOption
        .map((option) => option.value)
        .join(", ");
    setIsModified(true);
  };

  const handleTagsChange = (selectedOption) => {
    setTags(selectedOption);
    if (itemIndex)
      projects[projectIndex].items[itemIndex].tags = selectedOption
        .map((option) => option.value)
        .join(", ");
    setIsModified(true);
  };

  const handleItemTypeChange = (selectedOption) => {
    setItemType(selectedOption.value);
    setIsModified(true);
  };

  const handleAllowPreviewChange = (event) => {
    setAllowPreview(event.target.checked);
    setIsModified(true);
  };

  const handleUpdatePreviewAmount = (event) => {
    setPercentagePreview(event.target.value);
    setIsModified(true);
  };

  const handleBookNameChange = (event) => {
    setBookName(event.target.value);
    setIsModified(true);
  };

  const handleDescriptionChange = (event) => {
    setDescription(event.target.value);
    setIsModified(true);
  };

  const handleSupplyChange = (event) => {
    setSupply(event.target.value);
    setIsModified(true);
  };

  const handlePriceChange = (event) => {
    setPrice(event.target.value);
    setIsModified(true);
  };

  const encryptPdf = async function (pdfData) {
    //todo post pdf data via axios to
    try {
      // result format: { fileid, storeSecretResult, tx }
      const result = await encryptAndStoreItem(pdfData);
      console.log("encryption result:", result);

      return result.fileid;
    } catch (error) {
      console.log("error", error);
    }
  };

  const modifyPdf = async function (
    pdfData,
    coverImage,
    percentagePreview,
    addCover
  ) {
    const existingPdfBytes = pdfData; //await fetch(pdfURL).then((res) =>res.arrayBuffer());
    const coverType = coverImageType.substring("image/".length); //coverImage.match(/[^:/]\w+(?=;|,)/)[0];
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

    var cover;

    //embed the image and try the opposite if it doesn't work
    if (coverType == "png") {
      try {
        cover = await pdfDoc.embedPng(coverImageBytes);
      } catch (error) {
        cover = await pdfDoc.embedJpg(coverImageBytes);
        setCoverImageType("jpg");
      }
    } else {
      try {
        cover = await pdfDoc.embedJpg(coverImageBytes);
      } catch (error) {
        cover = await pdfDoc.embedPng(coverImageBytes);
        setCoverImageType("png");
      }
    }
    console.log("cover", cover);

    const coverImg = (img, page, pageObject, type) => {
      const imgRatio = (img.height * 1.0) / img.width;
      const pageRatio = (page.height * 1.0) / page.width;
      if (
        (imgRatio < pageRatio && type === "contain") ||
        (imgRatio > pageRatio && type === "cover")
      ) {
        const h = page.width * imgRatio;
        pageObject.drawImage(img, {
          x: 0,
          y: (page.height - h) / 2,
          width: page.width,
          height: h,
        });
      }
      if (
        (imgRatio > pageRatio && type === "contain") ||
        (imgRatio < pageRatio && type === "cover")
      ) {
        const w = (page.width * pageRatio) / imgRatio;
        pageObject.drawImage(img, {
          x: (page.width - w) / 2,
          y: 0,
          width: w,
          height: page.height,
        });
      }
    };
    if (addCover)
      coverImg(
        cover,
        { width: width, height: height },
        pdfDoc.insertPage(0, [width, height]),
        "cover"
      );

    // removePages
    for (let i = pages.length-1; i > previewLength; i--) {
      pdfDoc.removePage(i);
    }

    const addPreviewDetailPage = (pdfDoc) => {
      return pdfDoc.addPage([width, height]);
    };
    const previewPage = addPreviewDetailPage(pdfDoc);

    previewPage.drawText("Owners can view this work in full at PageDAO.org", {
      x: 5,
      y: height / 2 + 300,
      size: 16,
      font: helveticaFont,
      color: rgb(0.95, 0.1, 0.1),
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

  return (
    <>
      <div className="w-full bg-neutral-100">
        <div className="container mx-auto py-10 flex justify-between gap-4">
          <div className="basis-3/4 flex-row justify-start items-start gap-8 inline-flex w-full">
            <Toast.Provider>
              <Toast.Root
                className="ToastRoot"
                open={open}
                onOpenChange={setOpen}
              >
                <Toast.Title className="ToastTitle">{toastMessage}</Toast.Title>
                <Toast.Description asChild></Toast.Description>
                <Toast.Action className="ToastAction" asChild altText="undo">
                  <button className="Button small green">Undo</button>
                </Toast.Action>
              </Toast.Root>
              <Toast.Viewport className="ToastViewport" />
            </Toast.Provider>
            <div className="flex-col justify-start items-start gap-4 inline-flex">
              <div className="text-neutral-800 text-2xl font-bold font-['Arvo'] leading-normal">
                Cover
              </div>
              <style></style>
              <div
                key={coverImage}
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
                    "absolute inset-0 z-10 w-full h-full flex-col justify-center items-center gap-4 inline-flex " +
                    (isHovering ? "bg-neutral-50 bg-opacity-90" : "") +
                    (coverImage && !isHovering ? "hidden" : "")
                  }
                >
                  <UploadCloud className="h-12 text-gray-400" />
                  <div className="text-center text-neutral-500">
                    {!coverImage ? "Upload" : "Change"} your cover image
                  </div>
                </div>
                {coverImage && (<img src={coverImage} className="relative h-full w-full object-cover rounded-lg"/>)}

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
                          {filename ? (
                            filename
                          ) : (
                            <span>
                              Book file <i>(PDF only)</i>
                            </span>
                          )}
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
                            placeholder={filename}
                          />
                        </div>
                      </div>
                      <div className="relative">
                        <label htmlFor="add_cover">
                          Add cover image to preview pdf&nbsp;
                          <input
                            id="add_cover"
                            onChange={handleAddCover}
                            type="checkbox"
                            className="bigCheckBox"
                            checked={addCover}
                          />
                        </label>
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
                            value={bookName}
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
                            placeholder="Write a description"
                            rows="5"
                            onChange={handleDescriptionChange}
                            value={description}
                          ></textarea>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="self-stretch rounded-lg flex-col justify-start items-start gap-1 flex">
                    <div className="self-stretch grow shrink basis-0 pl-4 pr-2 py-3 bg-neutral-50 rounded-lg flex-col justify-start items-start gap-1 flex">
                      <div className="self-stretch justify-start items-start gap-2.5 inline-flex">
                        <div className="text-zinc-600 text-sm font-normal font-['DM Sans'] leading-tight">
                          Tags
                        </div>
                      </div>
                      <div className="self-stretch grow shrink basis-0 justify-start items-start gap-1 inline-flex">
                        <div className="grow shrink basis-0 justify-start items-center gap-2.5 flex">
                          Type
                          <br />
                          <Select
                            key={JSON.stringify(itemType)}
                            cacheOptions
                            className="w-full"
                            value={{ value: itemType, label: itemType }}
                            onChange={handleItemTypeChange}
                            options={itemTypeTags.map((itemtype) => {
                              return { value: itemtype, label: itemtype };
                            })}
                          />
                        </div>
                      </div>
                      <div className="self-stretch grow shrink basis-0 justify-start items-start gap-1 inline-flex">
                        <div className="grow shrink basis-0 justify-start items-center gap-2.5 flex">
                          Genre
                          <br />
                          <div className="w-full">
                            <ReactWindowedSelect
                              className="w-full"
                              isMulti
                              labelFilter={"includes"}
                              value={
                                itemIndex
                                  ? projects[projectIndex].items[itemIndex]
                                      .genre.length == 0
                                    ? null
                                    : projects[projectIndex].items[
                                        itemIndex
                                      ].genre
                                        .split(", ")
                                        .map((item) => {
                                          return { value: item, label: item };
                                        })
                                  : genre
                              }
                              onChange={handleGenreChange}
                              options={genreOptions}
                            />
                          </div>
                          {/*
                          <Select
                            className="w-full"
                            isMulti
                            value={
                              itemIndex
                                ? projects[projectIndex].items[itemIndex].genre
                                    .split(", ")
                                    .map((item) => {
                                      return { value: item, label: item };
                                    })
                                : genre
                            }
                            onChange={handleGenreChange}
                            options={genreTags.map((item) => {
                              return { value: item, label: item };
                            })}
                          />
                          */}
                        </div>
                      </div>
                      <div className="self-stretch grow shrink basis-0 justify-start items-start gap-1 inline-flex">
                        <div className="grow shrink basis-0 justify-start items-center gap-2.5 flex">
                          Tags
                          <br />
                          <Select
                            className="w-full"
                            isMulti
                            value={
                              itemIndex
                                ? projects[projectIndex].items[itemIndex].tags
                                    .length == 0
                                  ? null
                                  : projects[projectIndex].items[itemIndex].tags
                                      .split(", ")
                                      .map((item) => {
                                        return { value: item, label: item };
                                      })
                                : tags
                            }
                            onChange={handleTagsChange}
                            options={descriptorTags.map((itemtype) => {
                              return { value: itemtype, label: itemtype };
                            })}
                          />
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
                          value={supply}
                        />
                      </div>
                    </div>
                    <div className="self-stretch pl-4 pr-2 py-3 bg-neutral-50 rounded-lg flex-col justify-start items-start gap-1 flex">
                      <div className="self-stretch justify-start items-start gap-2.5 inline-flex">
                        <div className="text-zinc-600 text-sm font-normal font-['DM Sans'] leading-tight">
                          Price (USD)
                        </div>
                      </div>
                      <div className="self-stretch justify-start items-start gap-1 inline-flex">
                        <input
                          className="bg-transparent py-2 text-black border-0 text-base font-normal font-['DM Sans'] leading-snug w-full focus:outline-none"
                          name="price"
                          type="text"
                          placeholder="25"
                          onChange={handlePriceChange}
                          value={price}
                        />
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
                          type="checkbox"
                          className="bigCheckBox"
                          checked={allowPreview || percentagePreview > 0}
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
                            value={percentagePreview}
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
              {itemIndex &&
              projects &&
              projects[projectIndex] &&
              projects[projectIndex].items[itemIndex] &&
              projects[projectIndex].items[itemIndex].contracts[0]
                .contractAddress ? (
                <div className="grow shrink basis-0 justify-center items-center gap-1 flex">
                  {/* call save and then navigate to preview page */}
                  <Link
                    className="px-8 py-3 bg-dao-primary rounded-lg text-center text-neutral-50 text-base font-bold font-['DM Sans'] leading-snug w-full cursor-pointer"
                    to={
                      "/book/" +
                      user.userId +
                      "/" +
                      projects[projectIndex].id +
                      "/" +
                      itemIndex
                    }
                  >
                    View Published Item
                  </Link>
                </div>
              ) : (
                <div className="self-stretch justify-start items-start gap-4 inline-flex">
                    <div className="justify-center items-center gap-1 flex">
                    <button
                      className="px-16 py-3 rounded-lg border border-neutral-800 text-neutral-800 text-base font-bold font-['DM Sans'] leading-snug cursor-pointer"
                      onClick={createModifiedPdf}
                    >
                      Create Modified PDF
                    </button>
                  </div>
                  <div className="justify-center items-center gap-1 flex">
                    <button
                      className="px-16 py-3 rounded-lg border border-neutral-800 text-neutral-800 text-base font-bold font-['DM Sans'] leading-snug cursor-pointer"
                      onClick={saveDraftAndReturn}
                    >
                      Save draft
                    </button>
                  </div>
                  <div className="grow shrink basis-0 justify-center items-center gap-1 flex">
                    {/* call save and then navigate to preview page */}
                    <button
                      className="px-8 py-3 bg-dao-primary rounded-lg text-center text-neutral-50 text-base font-bold font-['DM Sans'] leading-snug w-full cursor-pointer"
                      onClick={goToCreate}
                    >
                      Next, Preview
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
          <ItemCreationModal
            modalIsOpen={openProgress}
            setIsOpen={setOpenProgress}
            stepProgress={progressMsg}
          />
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
                      Immediate
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
                      Claim Price ${price} USD
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
                      Activated
                    </div>
                  </div>
                  <div className="p-4 bg-amber-100 rounded-lg justify-center items-center gap-2 inline-flex">
                    <div className="grow shrink basis-0 text-neutral-800 text-lg font-normal font-['DM Sans'] leading-relaxed">
                      Your content is encrypted and secured by Decentralized
                      Confidential Computing (DeCC) through Secret Network.
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
