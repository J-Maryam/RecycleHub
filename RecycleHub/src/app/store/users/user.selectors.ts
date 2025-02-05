import { createSelector } from '@ngrx/store';
import { UserState } from './user.state';

export const selectUserState = (state: { users: UserState }) => state.users;
export const selectAllUsers = createSelector(selectUserState, (state) => state.users);
