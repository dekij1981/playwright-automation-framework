import { randomUUID } from 'node:crypto';

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

export type RegistrationUser = AddressDetails & {
  name: string;
  email: string;
  password: string;
};

export function createRegistrationUser(): RegistrationUser {
  const uniqueId = randomUUID().slice(0, 8);

  return {
    name: `TestUser${uniqueId}`,
    email: `testuser.${uniqueId}@example.com`,
    password: 'Password123!',
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
