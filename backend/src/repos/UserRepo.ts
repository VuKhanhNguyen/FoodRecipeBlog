/* eslint-disable max-len */
import { IUser, UserModel } from '@src/models/User';
import { IBaseRepo } from './BaseRepo';

export interface IUserRepo extends IBaseRepo<IUser> {
  getByEmail: (email: string) => Promise<IUser | null>;

  persistsByEmail: (email: string) => Promise<boolean>;

  getByUsername: (username: string) => Promise<IUser | null>;
}

export class UserRepo implements IUserRepo {
  private model = UserModel;

  public async getAll(): Promise<IUser[]> {
    return this.model.find({}).select('-password').exec() as Promise<IUser[]>;
  }

  public async getById(id: string): Promise<IUser | null> {
    return this.model.findById(id)
      .select('-password').exec() as Promise<IUser | null>;
  }

  public async add(data: Omit<IUser, '_id' | 'createdAt' | 'updatedAt'>): Promise<IUser> {
    const newUser = new this.model(data);
    const savedUser = await newUser.save();

    const userObject = savedUser.toObject() as IUser;
    delete (userObject as Partial<IUser>).password;

    return userObject;
  }

  public async update(id: string, data: Partial<IUser>): Promise<IUser | null> {
    return this.model.findByIdAndUpdate(id, data, { new: true }).select('-password').exec() as Promise<IUser | null>;
  }

  public async delete(id: string): Promise<boolean> {
    const result = await this.model.findByIdAndDelete(id).exec();

    return !!result;
  }

  public async getByEmail(email: string): Promise<IUser | null> {
    return this.model.findOne({ email }).exec() as Promise<IUser | null>;
  }

  public async persistsByEmail(email: string): Promise<boolean> {
    const count = await this.model.countDocuments({ email });

    return count > 0;
  }

  public async getByUsername(username: string): Promise<IUser | null> {
    return this.model.findOne({ username }).exec() as Promise<IUser | null>;
  }
}