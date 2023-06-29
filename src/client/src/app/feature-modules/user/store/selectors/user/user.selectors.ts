import { createFeatureSelector, createSelector } from '@ngrx/store';
import * as fromUser from '../../reducers/user.reducer';

const userFeatureSelector = createFeatureSelector<fromUser.State>(fromUser.userFeatureKey);

export const usersSelector = createSelector(
  userFeatureSelector,
  (state) => state.users
);

export const selectedUserSelector = createSelector(
  userFeatureSelector,
  (state) => state.selectedUser
)



