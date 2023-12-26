const userRole = {
  user: 'user',
  admin: 'admin',
} as const;

export type TUserRole = keyof typeof userRole;
