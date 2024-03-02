// define ipfsstorage class using the istorage interface (similar to the fakestorage implementation)
import IStorage from "./IStorage";
import IEncryptedData from "../Encryption/IEncryptedData";
import IUploadOptions from "./IUploadOptions";

class IPFSStorage implements IStorage {
  async upload(
    encryptedData: IEncryptedData,
    options: IUploadOptions,
  ): Promise<any> {

  }
}

export default IPFSStorage;