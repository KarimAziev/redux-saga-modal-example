import { combineReducers } from 'redux';
import { reducer as modalsReducer } from 'redux-saga-modal';
import usersReducer from './users';

export default combineReducers({
  // you have to pass modalReducer under 'modals' key,
  // for custom keys use 'getModalsState'
  modals: modalsReducer,
  // ...your other reducers
  users: usersReducer,
});
