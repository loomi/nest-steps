export enum RolesType {
  ADMIN,
  COMMON,
}

export type User = {
  id: string;
  email: string;
  password: string;
  role: RolesType;
  name: string;
  aboutMe?: string;
};
