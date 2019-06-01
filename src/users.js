import { createRoutine } from 'redux-saga-routines';

export const routines = {
  removeUser: createRoutine('REMOVE_USER'),
};

export const initialState = {
  '1': {
    key: '1',
    name: 'John Douglas',
    age: 12,
  },
  '2': {
    key: '2',
    name: 'Mark Ressler',
    age: 24,
  },
  '3': {
    key: '3',
    name: 'Edward Smith',
    age: 33,
  },
};

export default (state = initialState, action) => {
  switch (action.type) {
  case routines.removeUser.REQUEST:
    return {
      ...state,
      [action.payload]: {
        ...state[action.payload],
        loading: true,
      },
    };

  case routines.removeUser.SUCCESS:
    const users = { ...state };
    delete users[action.payload];
    return users;

  default:
    return state;
  }
};

export const usersSelector = (state) => Object.values(state.users);
