import { createCipheriv, randomBytes, scrypt } from 'crypto';
import { promisify } from 'util';
import { createDecipheriv } from 'crypto';

const iv = randomBytes(16);
const password = process.env.PASSWORD_ENCRYPT;

export default class Crypt {
  static async encryptItem(textToEncrypt: string) {
    const key = (await promisify(scrypt)(password, 'salt', 32)) as Buffer;
    const cipher = createCipheriv('aes-256-ctr', key, iv);

    const encryptedText = Buffer.concat([
      cipher.update(textToEncrypt),
      cipher.final(),
    ]);

    return encryptedText.toString();
  }

  static async decryptItem(encryptedText: Buffer) {
    const key = (await promisify(scrypt)(password, 'salt', 32)) as Buffer;
    const decipher = createDecipheriv('aes-256-ctr', key, iv);

    return Buffer.concat([decipher.update(encryptedText), decipher.final()]);
  }
}
