export interface ContactModel {
  email: string;
  password?: string;
  role: '' | 'admin' | 'user';
  phone: string;
  firstName: string;
  lastName: string;
  birthDate: '' | number;
}
