import { randomBytes } from "randombytes-pure";
import secp256k1 from "secp256k1";
import { SIV, PolyfillCryptoProvider } from "miscreant";
import { toUtf8 } from "@cosmjs/encoding";

function getPrivateKey() {
  while (true) {
    const privateKey = randomBytes(32);
    if (secp256k1.privateKeyVerify(privateKey)) {
      return Uint8Array.from(privateKey);
    }
  }
}

function generate() {
  const privateKey = getPrivateKey();
  const publicKey = secp256k1.publicKeyCreate(privateKey);

  return {
    privateKey: privateKey,
    publicKey: publicKey,
  };
}

/**
 * Generate a shared key from a public key and a private key destined for the smart contract.
 */
function generateSharedKey(
  publicKey,
  privateKey,
) {
  return secp256k1.ecdh(publicKey, privateKey);
}

async function encrypt(data, sharedKey) {
  const provider = new PolyfillCryptoProvider();
  const siv = await SIV.importKey(sharedKey, "AES-SIV", provider);
  const plaintext = toUtf8(JSON.stringify(data));

  return await siv.seal(plaintext, []);
}

const ECDHEncryption = {
  generate: generate,
  generateSharedKey: generateSharedKey,
  encrypt: encrypt,
};

export {ECDHEncryption};