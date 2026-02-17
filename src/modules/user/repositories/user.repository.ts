import { Injectable } from '@nestjs/common';
import { AbstractUserRepository, IUser } from '../domain';
import { CreateUserDto } from '../model/dto/create-user.dto';
import { User, UserDocument } from '../model/user.schema';
import { InjectConnection, InjectModel } from '@nestjs/mongoose';
import { Connection, DeleteResult, Model } from 'mongoose';
import { UpdateUserDto } from '../model/dto/update-user.dto';

@Injectable()
export class UserRepository extends AbstractUserRepository {
  constructor(
    @InjectModel(User.name) private UserModel: Model<UserDocument>,
    @InjectConnection() private connection: Connection,
  ) {
    super();
  }

  private toIUser(user: UserDocument): IUser {
    const source = user.toObject();

    return {
      id: String(source._id),
      email: source.email,
      password: source.password,
      firstName: source.firstName,
      lastName: source.lastName,
    };
  }

  private toIUserOrNull(user: UserDocument | null): IUser | null {
    return user ? this.toIUser(user) : null;
  }

  public async getUniqUser(id: string): Promise<IUser | null> {
    const user = await this.UserModel.findById(id);

    return this.toIUserOrNull(user);
  }

  public async getUserByEmail(email: string): Promise<IUser | null> {
    const user = await this.UserModel.findOne({ email });

    return this.toIUserOrNull(user);
  }

  public async getUsers(): Promise<IUser[]> {
    const users = await this.UserModel.find();

    return users.map((user) => this.toIUser(user));
  }

  public async createUser(user: CreateUserDto): Promise<IUser> {
    const newUser = await this.UserModel.create(user);

    return this.toIUser(newUser);
  }

  public async updateUser(user: UpdateUserDto): Promise<IUser | null> {
    const updatedUser = await this.UserModel.findOneAndUpdate(
      { _id: user.id },
      user,
      { new: true },
    );

    return this.toIUserOrNull(updatedUser);
  }

  public async deleteUser(id: string): Promise<DeleteResult> {
    return this.UserModel.deleteOne({ _id: id });
  }
}
