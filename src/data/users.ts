export type UserCredentials = {
  email: string;
  password: string;
};

export type TestUser = UserCredentials & {
  username: string;
};

export const validUser: TestUser = {
  email: 'test1112226@yopmail.com',
  password: 'Password123!',
  username: 'Test',
};

export const invalidUser: UserCredentials = {
  email: 'incorrect@example.com',
  password: 'WrongPassword',
};
