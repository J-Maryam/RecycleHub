import { createReducer, on } from '@ngrx/store';
import { addUser, deleteUser } from './user.actions';
import { UserState, initialUserState } from './user.state';
import { LocalStorageService } from '../meta-reducer';

export const userReducer = createReducer(
  initialUserState,

  on(addUser, (state, { user }) => {
    const updatedUsers = [...state.users, user];
    new LocalStorageService().saveUsers(updatedUsers); // Sauvegarder dans localStorage
    return { ...state, users: updatedUsers };
  }),
  on(deleteUser, (state, { userId }) => {
    const updatedUsers = state.users.filter((user) => user.id !== userId);
    new LocalStorageService().saveUsers(updatedUsers); // Sauvegarder dans localStorage
    return { ...state, users: updatedUsers };
  })
);
