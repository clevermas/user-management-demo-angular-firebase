export interface ContactModel {
  email: string;
  role: 'admin' | 'user';
  phone: string;
  firstName: string;
  lastName: string;
  birthDate: number;
}
