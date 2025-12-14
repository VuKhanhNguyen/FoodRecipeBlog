import { JwtPayload } from 'jsonwebtoken';

export interface IJwtPayload extends JwtPayload {
  id: string;
  username: string;
  role: string;
}

export interface IRequestWithUser {
  user?: IJwtPayload;
}