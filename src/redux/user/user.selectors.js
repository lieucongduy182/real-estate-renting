import { createSelector } from 'reselect';

export const selectUser = (state) => state.user;
export const selectRoleUser = createSelector([selectUser], (user) => user.role);
