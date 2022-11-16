import { Service } from 'typedi';
import crypto from 'crypto';

@Service()
export class CryptographyService {
  public hash(plainString: string, salt?: string) {
    let hashSalt = salt;
    if (!hashSalt) {
      hashSalt = this.generateRandomHash(16);
    }

    return crypto.pbkdf2Sync(plainString, hashSalt, 1000, 64, 'sha512').toString('hex');
  }

  public compare(plainString: string, hashedString: string, salt: string) {
    const hash = crypto.pbkdf2Sync(plainString, salt, 1000, 64, `sha512`).toString(`hex`);
    return hash === hashedString;
  }

  public generateRandomHash(length: number) {
    return crypto.randomBytes(length).toString('hex');
  }
}
