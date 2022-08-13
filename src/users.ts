import { createSlice, createAction } from '@reduxjs/toolkit';
import { RootState } from './store';

export interface User {
  name: string;
  age: number;
  country: string;
  id: string;
}

export interface UsersData {
  [id: string]: User;
}

export interface InitialState {
  data: User[];
  status: 'idle' | 'loading' | 'failed';
  error?: string;
}

export const loadData = {
  trigger: createAction('users/load/trigger'),
  request: createAction('users/load/request'),
  success: createAction<User[]>('users/load/success'),
  failure: createAction<Error>('users/load/failure'),
  fulfill: createAction('users/load/fulfill'),
};

export const removeUser = {
  trigger: createAction<string>('users/remove/trigger'),
  request: createAction<string>('users/remove/request'),
  success: createAction<string>('users/remove/success'),
  failure: createAction<string>('users/remove/failure'),
  fulfill: createAction<string>('users/remove/fulfill'),
};

const initialState: InitialState = {
  data: [],
  status: 'loading',
};

const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(loadData.request, (state) => {
        state.status = 'loading';
      })
      .addCase(loadData.success, (state, action) => {
        state.data = action.payload || [];
      })
      .addCase(loadData.fulfill, (state) => {
        state.status = 'idle';
      })
      .addCase(removeUser.success, (state, { payload }) => {
        state.data = state.data.filter(({ id }: User) => id !== payload);
      });
  },
});

export const usersSelector = (state: RootState) => state.users.data;

export const usersLoadingSelector = (state: RootState) =>
  state.users.status === 'loading';

export default usersSlice;
