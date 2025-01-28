export interface getQueryUsersType {
  pageNumber: number;
  pageSize: number;
  sortBy: string;
  sortOrder: string;
  search: string;
}

export interface queryUserWithRoles {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  createdAt: Date;
  roles: string[];
}

export interface queriedUserResponse {
  items: queryUserWithRoles[];
  totalCount: number;
}
