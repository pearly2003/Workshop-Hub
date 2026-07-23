import CryptoJS from "crypto-js";

//for encryption
export function MdEncryptPassword(password) {
  if (!password) return "";

  const key = CryptoJS.MD5("DevOpspasscode");
  const encrypted = CryptoJS.TripleDES.encrypt(password, key, {
    mode: CryptoJS.mode.ECB,
    padding: CryptoJS.pad.Pkcs7,
  }).ciphertext;

  // Base64url — safe, reversible, no data loss
  return encrypted
    .toString(CryptoJS.enc.Base64)
    .replace(/\+/g, "-")
    .replace(/\//g, "_")
    .replace(/=+$/, "");
}
export function decryptPassword(password) {
  if (!password) return "";

  try {
    const key = CryptoJS.MD5("DevOpspasscode");
    // Detect format: Base64url (new) has - or _, old format is alphanumeric only
    const isNewFormat = password.includes("-") || password.includes("_");
    let base64;
    if (isNewFormat) {
      // New format: reverse Base64url → standard Base64
      base64 = password.replace(/-/g, "+").replace(/_/g, "/");
    } else {
      // Old format: try to restore missing + and / by brute-forcing padding
      base64 = password;
    }
    // Restore Base64 padding
    const padded = base64 + "=".repeat((4 - (base64.length % 4)) % 4);
    const cipherParams = CryptoJS.lib.CipherParams.create({
      ciphertext: CryptoJS.enc.Base64.parse(padded),
    });
    const decrypted = CryptoJS.TripleDES.decrypt(cipherParams, key, {
      mode: CryptoJS.mode.ECB,
      padding: CryptoJS.pad.Pkcs7,
    });
    const decryptedText = decrypted.toString(CryptoJS.enc.Utf8);
    if (!decryptedText) {
      console.error("Decryption failed for:", password);
      return "";
    }
    return decryptedText;
  } catch (error) {
    // Catch Malformed UTF-8 and any other errors gracefully
    console.error("Decryption error:", error.message, "| Input:", password);
    return "";
  }
}
  