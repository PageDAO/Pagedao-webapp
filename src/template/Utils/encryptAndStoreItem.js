import axios from "axios";

const encryptAndStoreItem = async (file) => {
  var result = undefined;

  try {
    const response = await axios.post("http://localhost:3000/store", {
      file: file,
    });

    console.log(response.data);
    result = response.data;
  } catch (error) {
    console.log("error", error);
  }

  return result;
};

export { encryptAndStoreItem };
