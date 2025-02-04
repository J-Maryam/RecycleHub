export interface User {
  id: number;
  name: string;
  email: string;
}

export interface UserState {
  users: User[];
}

export const initialUserState: UserState = {
  users: []
};
