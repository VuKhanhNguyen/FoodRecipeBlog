export interface IRegisterReqBody {
  username: string;
  email: string;
  password: string;
  fullName?: string;
  avatar?: string;
}

export interface ILoginReqBody {
  username: string;
  password: string;
}