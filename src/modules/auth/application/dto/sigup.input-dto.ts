export interface SignupDTO {
  name:string
  email: string;
  password: string;
  role: 'USER' | 'ADMIN';
}