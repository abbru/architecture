import { User } from "../../domain/models/User";
import { Click } from "../../domain/models/Click";
import { UserRepository } from "../../domain/repositories/UserRepository";
import { ClickRepository } from "../../domain/repositories/ClickRepository";
import { LoggerInterface } from "../../infrastructure/logger/LoggerInterface";

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
