import jsonwebtoken from 'jsonwebtoken';
import ENV from '../constants/ENV';

const SECRET = ENV.JwtSecret || 'supersecretkey';

export function sign(payload: object): string {
  return jsonwebtoken.sign(payload, SECRET, { expiresIn: '1d' });
}

export function verify(token: string): string | jsonwebtoken.JwtPayload {
  return jsonwebtoken.verify(token, SECRET);
}