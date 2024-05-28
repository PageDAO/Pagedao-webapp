import axios from "axios";

const pinToIPFS = async (file, filename, ipfsFileApiUrl) => {
  try {
    let data = new FormData();
    data.append("file", file);
    const res = await axios.post(ipfsFileApiUrl, data, {
      headers: {
        "Content-Type": `multipart/form-data; boundary= ${data._boundary}`,
      },
    });
    console.log(res.data);

    const resHashToPin = res.data.Hash;

    return `${resHashToPin}`;
  } catch (error) {
    console.log("error", error);
    return null;
  }
};

export {pinToIPFS};
