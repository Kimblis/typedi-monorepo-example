import { Service, Container } from 'typedi';
import { CryptographyService } from '#service1/services/Cryptography';

@Service()
export class AuthenticationService {
  cryptoService: CryptographyService;

  constructor() {
    this.cryptoService = Container.get(CryptographyService);
  }

  public async authenticate(name: string) {
    const hash = this.cryptoService.generateRandomHash(10);
    return hash ?? name;
  }
}
