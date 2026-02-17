import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { UserRepository } from './repositories/user.repository';
import { IUser } from './domain';
import { CreateUserDto } from './model/dto/create-user.dto';
import { UpdateUserDto } from './model/dto/update-user.dto';

@Injectable()
export class UserService {
  constructor(private readonly userRepository: UserRepository) {}

  public async getUserById(id: string): Promise<IUser> {
    const user = await this.userRepository.getUniqUser(id);

    if (!user) {
      throw new NotFoundException(`User with id ${id} not found`);
    }

    return user;
  }

  public async getUserByEmail(email: string): Promise<IUser | null> {
    return this.userRepository.getUserByEmail(email);
  }

  public async getUsers(): Promise<IUser[]> {
    return this.userRepository.getUsers();
  }

  public async createUser(user: CreateUserDto): Promise<IUser> {
    return this.userRepository.createUser(user);
  }

  public async updateUser(
    id: string,
    user: UpdateUserDto,
  ): Promise<IUser | null> {
    await this.getUserById(id);

    return this.userRepository.updateUser(user);
  }

  public async deleteUser(id: string): Promise<IUser> {
    const user = await this.getUserById(id);

    const { acknowledged } = await this.userRepository.deleteUser(id);

    if (!acknowledged) {
      if (!user) {
        throw new InternalServerErrorException('Unknown error of delete user');
      }
    }

    return user;
  }
}
