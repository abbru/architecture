import { User } from "../domain/User";
import { Click } from "../../click/domain/Click";
import { UserRepository } from "../domain/UserRepository";
import { ClickRepository } from "../../click/domain/ClickRepository";
import { LoggerInterface } from "../../shared/infrastructure/logger/LoggerInterface";

export class UserService {
  constructor(
    private userRepository: UserRepository,
    private logger: LoggerInterface,
    private clickRepository?: ClickRepository,
  ) {}

  async createUser(name: string, idClick?: string) {
    const user = new User(name);
    await this.userRepository.save(user);
    this.logger.log(`Usuario ${user.name} creado.`);

    if (idClick && this.clickRepository) {
      const click = new Click(idClick);
      await this.clickRepository.updateClickStatus(click);
    }
  }

  async getAllUsers(): Promise<User[]> {
    return this.userRepository.findAll();
  }
}
