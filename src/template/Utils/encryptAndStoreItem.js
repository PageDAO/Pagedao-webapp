import axios from "axios";

const encryptAndStoreItem = async (file) => {
  var result = undefined;

  try {
    const response = await axios.post(`${import.meta.env.VITE_APP_BACKEND_API_URL}/store`, {
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
