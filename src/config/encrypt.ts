import { createCipheriv, createDecipheriv, randomBytes, scrypt } from 'crypto';
import { promisify } from 'util';

export class Crypt {
  // private static iv = randomBytes(16);
  private static iv: Buffer = Buffer.from([
    0x91, 0xf9, 0x2e, 0x87, 0x5c, 0x43, 0x7d, 0x6a, 0x3e, 0x9b, 0x28, 0x15,
    0x0f, 0x8a, 0xd4, 0x69,
  ]);

  static async encryptItem(textToEncrypt: string, password: string) {
    if (!password) {
      throw new Error('PASSWORD_ENCRYPT environment variable is not defined');
    }

    const key = (await promisify(scrypt)(password, 'salt', 32)) as Buffer;
    const cipher = createCipheriv('aes-256-ctr', key, this.iv);

    const encryptedText = Buffer.concat([
      cipher.update(textToEncrypt),
      cipher.final(),
    ]);

    return encryptedText.toString('hex');
  }

  static async decryptItem(encryptedText: string, password: string) {
    if (!password) {
      throw new Error('PASSWORD_ENCRYPT environment variable is not defined');
    }

    const key = (await promisify(scrypt)(password, 'salt', 32)) as Buffer;
    const decipher = createDecipheriv('aes-256-ctr', key, this.iv);

    const encryptedBuffer = Buffer.from(encryptedText, 'hex');
    return Buffer.concat([
      decipher.update(encryptedBuffer),
      decipher.final(),
    ]).toString();
  }
}
