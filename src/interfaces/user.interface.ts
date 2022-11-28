import { JwtPayload } from 'jsonwebtoken';

export interface UserRegisterInfo {
  fullname: string;
  email: string;
  phone: string;
  username: string;
  password: string;
}
export interface User extends UserRegisterInfo {
  id: string;
}

export interface UserPayload extends JwtPayload {
  user: {
    id: string;
    username: string;
  };
}
