// Nodejs encryption with CTR
const crypto = require("crypto");
const fs = require("fs");

const algorithm = "aes-256-cbc";

const key = crypto.randomBytes(32);
const iv = fs.readFileSync("iv.key");

// function guardarIv() {
//   let iv = crypto.randomBytes(16);
//   fs.writeFileSync("iv.key", iv);
// }

function encrypt(text) {
  let cipher = crypto.createCipheriv(algorithm, Buffer.from(key), iv);
  let encrypted = cipher.update(text);
  encrypted = Buffer.concat([encrypted, cipher.final()]);
  return encrypted.toString("hex");
}

function decrypt(text) {
  let _iv = iv;
  let encryptedText = Buffer.from(text, "hex");
  let decipher = crypto.createDecipheriv(algorithm, Buffer.from(key), _iv);
  let decrypted = decipher.update(encryptedText);
  decrypted = Buffer.concat([decrypted, decipher.final()]);
  return decrypted.toString();
}

var hw = encrypt("Mi texto cifrado");
console.log(hw);

console.log(decrypt(hw));
// guardarIv();
