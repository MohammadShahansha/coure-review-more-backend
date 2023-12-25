export interface TUserRegistration {
  username: string;
  email: string;
  password: string;
  role: 'user' | 'admin';
}
