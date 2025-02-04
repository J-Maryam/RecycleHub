import { createAction, props } from '@ngrx/store';
import {User} from './user.state';

export const addUser = createAction(
  '[User] Add User',
  props<{ user: User }>
);

export const deleteUser = createAction(
  '[User] Delete User',
  props<{ userId: number }>
)
