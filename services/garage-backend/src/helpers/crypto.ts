import crypto from 'crypto';

import config from '../config';

const algorithm = 'aes-256-ctr';
const secretKey = crypto
  .createHash('sha256')
  .update(config.cryptoSecret)
  .digest('base64')
  .substr(0, 32);

const iv = crypto.randomBytes(16);

export type Encrypted = {
  iv: string;
  content: string;
};

export const encrypt = (text: string) => {
  const cipher = crypto.createCipheriv(algorithm, secretKey, iv);

  const encrypted = Buffer.concat([cipher.update(text), cipher.final()]);

  return {
    iv: iv.toString('hex'),
    content: encrypted.toString('hex'),
  };
};

export const decrypt = (hash: Encrypted) => {
  const decipher = crypto.createDecipheriv(algorithm, secretKey, Buffer.from(hash.iv, 'hex'));

  const decrpyted = Buffer.concat([
    decipher.update(Buffer.from(hash.content, 'hex')),
    decipher.final(),
  ]);

  return decrpyted.toString();
};
