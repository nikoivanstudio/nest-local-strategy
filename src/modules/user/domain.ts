import { DeleteResult } from 'mongoose';
import { CreateUserDto } from './model/dto/create-user.dto';
import { UpdateUserDto } from './model/dto/update-user.dto';

export interface IUser {
  readonly id: string;
  readonly email: string;
  readonly password: string;
  readonly firstName: string;
  readonly lastName?: string;
}

export abstract class AbstractUserRepository {
  public abstract createUser(user: CreateUserDto): Promise<IUser>;

  public abstract getUniqUser(id: string): Promise<IUser | null>;

  public abstract getUsers(): Promise<IUser[]>;

  public abstract updateUser(user: UpdateUserDto): Promise<IUser | null>;

  public abstract deleteUser(id: string): Promise<DeleteResult>;
}
