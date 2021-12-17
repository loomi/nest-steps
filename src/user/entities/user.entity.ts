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
