export interface UserModel {
  id: number;
  firstName: string;
  lastName: string;
  phoneNumber: string;
  email: string;
  password?: string; 
  favoriteToy: string;
}