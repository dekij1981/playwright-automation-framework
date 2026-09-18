import { randomUUID } from 'node:crypto';

export type AccountDetails = {
  password: string;
  title: 'Mr' | 'Mrs';
  birthDay: string;
  birthMonth: string;
  birthYear: string;
  newsletter: boolean;
  specialOffers: boolean;
};

export type AddressDetails = {
  firstName: string;
  lastName: string;
  company: string;
  address1: string;
  address2: string;
  country: string;
  state: string;
  city: string;
  zipcode: string;
  mobile: string;
};

export type RegistrationUser = AccountDetails &
  AddressDetails & {
    name: string;
    email: string;
  };

export function createRegistrationUser(): RegistrationUser {
  const uniqueId = randomUUID().slice(0, 8);

  return {
    name: `TestUser${uniqueId}`,
    email: `testuser.${uniqueId}@example.com`,

    password: 'Password123!',
    title: 'Mr',
    birthDay: '1',
    birthMonth: 'January',
    birthYear: '1990',
    newsletter: true,
    specialOffers: true,

    firstName: 'Test',
    lastName: 'User',
    company: 'Test Company',
    address1: '123 Test St',
    address2: 'Suite 100',
    country: 'United States',
    state: 'Test State',
    city: 'Test City',
    zipcode: '12345',
    mobile: '1234567890',
  };
}
