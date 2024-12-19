import { Me } from "../interfaces/Me";

export const hasRole = (user: Me | null, roles: string[], userId?: string): boolean | undefined => {
  return user?.roles.some(r => r.toLocaleLowerCase() === 'admin') || (user?.roles.some(role => roles.includes(role)) && user?.id === userId);
};

export const hasRoleAdmin = (user: Me | null): boolean | undefined => {
  return user?.roles.some(role => role.toLocaleLowerCase() == 'admin');
};

export const hasRoleAuthor = (user: Me | null, userId?: string): boolean | undefined => {
  return user?.roles.some(role => role.toLocaleLowerCase() == 'author' && user?.id === userId);
};

export const hasRoleVisitor = (user: Me | null, userId?: string): boolean | undefined => {
  return user?.roles.some(role => role.toLocaleLowerCase() == 'visitor' && user?.id === userId);
};