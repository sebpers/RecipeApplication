import { Me } from "../interfaces/me";

export const hasRole = (user: Me | null, roles: string[], userId?: string): boolean | undefined => {
  return user?.roles.some(r => r === 'Admin') || (user?.roles.some(role => roles.includes(role)) && user?.id === userId);
};

export const hasRoleAdmin = (user: Me | null): boolean | undefined => {
  return user?.roles.some(role => role == 'Admin');
};

export const hasRoleAuthor = (user: Me | null, userId?: string): boolean | undefined => {
  return user?.roles.some(role => role == 'Author' && user?.id === userId);
};

export const hasRoleVisitor = (user: Me | null, userId?: string): boolean | undefined => {
  return user?.roles.some(role => role == 'Visitor' && user?.id === userId);
};