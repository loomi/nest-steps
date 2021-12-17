import * as faker from 'faker';

export const roleTypeArray = ['ADMIN', 'COMMON'] as const;
export type RoleType = typeof roleTypeArray[number];

export type User = {
  id: string;
  email: string;
  password: string;
  role: RoleType;
  name: string;
  aboutMe?: string;
};

export const mockCreateUserParams = () => ({
  email: faker.internet.email(),
  name: faker.name.firstName(),
  role: roleTypeArray[faker.datatype.number(roleTypeArray.length - 1)],
  password: faker.internet.password(),
});

export const mockListUserParams = () => ({
  id: faker.datatype.uuid(),
  email: faker.internet.email(),
  role: roleTypeArray[faker.datatype.number(roleTypeArray.length - 1)],
  name: faker.name.firstName(),
});

export const mockUpdateUserParams = () => ({
  id: faker.datatype.uuid(),
  email: faker.internet.email(),
  role: roleTypeArray[faker.datatype.number(roleTypeArray.length - 1)],
  name: faker.name.firstName(),
  password: faker.internet.password(),
});

export const mockCreateUserResult = (): User => ({
  id: faker.datatype.uuid(),
  email: faker.internet.email(),
  role: roleTypeArray[faker.datatype.number(roleTypeArray.length - 1)],
  name: faker.name.firstName(),
  password: faker.internet.password(),
});
