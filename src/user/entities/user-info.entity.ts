export const roleTypeArray = ['ADMIN', 'COMMON'] as const;
export type RoleType = typeof roleTypeArray[number];

export type UserInfo = {
  userId: string;
  role: RoleType;
  name: string;
  aboutMe?: string;
};
