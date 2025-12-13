/* eslint-disable max-len */
import bcrypt from 'bcrypt';
import { RouteError } from '@src/common/util/route-errors';
import HTTP_STATUS_CODES from '@src/common/constants/HTTP_STATUS_CODES';

import { UserRepo, IUserRepo } from '@src/repos/UserRepo';
import { IUser } from '@src/models/User';


/******************************************************************************
                                Constants
******************************************************************************/

export const USER_NOT_FOUND_ERR = 'User not found';
const SALT_ROUNDS = 10;

/******************************************************************************
                                Functions
******************************************************************************/
export class UserService {
  private userRepo: IUserRepo = new UserRepo();

  public async getAll(): Promise<IUser[]> {
    return this.userRepo.getAll();
  }

  public async getOne(id: string): Promise<IUser | null> {
    const user = await this.userRepo.getById(id);
    if (!user) {
      throw new RouteError(
        HTTP_STATUS_CODES.NotFound,
        USER_NOT_FOUND_ERR,
      );
    }
    return user;
  }

  public async getOneByUsername(username: string): Promise<IUser | null> {
    const user = await this.userRepo.getByUsername(username);
    if (!user) {
      throw new RouteError(
        HTTP_STATUS_CODES.NotFound,
        USER_NOT_FOUND_ERR,
      );
    }
    return user;
  }

  public async register(userData: Omit<IUser, '_id' | 'createAt' | 'updateAt' | 'role'> & Partial<Pick<IUser, 'role'>>): Promise<IUser> {
    const emailExists = await this.userRepo.persistsByEmail(userData.email);

    if (emailExists) {
      throw new RouteError(
        HTTP_STATUS_CODES.Conflict,
        'Email đã tồn tại.',
      );
    }

    const hashedPassword = await bcrypt.hash(userData.password, SALT_ROUNDS);

    const userToCreate = {
      ...userData,
      password: hashedPassword,
      role: userData.role ?? 'user',

    };

    return this.userRepo.add(userToCreate);
  }

  public async login(username: string, password: string): Promise<IUser> {
    const user = await this.userRepo.getByUsername(username);
    if (!user) {
      throw new RouteError(
        HTTP_STATUS_CODES.Unauthorized,
        'Tên đăng nhập hoặc mật khẩu không đúng.',
      );
    }
    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) {
      throw new RouteError(
        HTTP_STATUS_CODES.Unauthorized,
        'Tên đăng nhập hoặc mật khẩu không đúng.',
      );
    }
    return user;
  }


  public async updateOne(id: string, userData: Partial<IUser>): Promise<IUser> {
    const user = await this.userRepo.getById(id);
    if (!user) {
      throw new RouteError(
        HTTP_STATUS_CODES.NotFound,
        USER_NOT_FOUND_ERR,
      );
    }

    if (userData.password) {
      userData.password = await bcrypt.hash(userData.password, SALT_ROUNDS);
    }
    const updatedUser = await this.userRepo.update(id, userData);

    return updatedUser!;
  }


  public async delete(id: string): Promise<void> {
    const successs = await this.userRepo.delete(id);

    if (!successs) {
      throw new RouteError(
        HTTP_STATUS_CODES.NotFound,
        USER_NOT_FOUND_ERR,
      );
    }
  }
}
/******************************************************************************
                                Export default
******************************************************************************/

export default new UserService();
