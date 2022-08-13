import { reducer as modalsReducer } from 'redux-saga-modal';
import { createStore, applyMiddleware, combineReducers, compose } from 'redux';
import createSagaMiddleware from 'redux-saga';
import usersSlice from './users';
import DevTools from './devTools';
import rootSaga from './saga';

const reducer = combineReducers({
  // modalReducer should be mounted under 'modals' key,
  modals: modalsReducer,
  // ...your other reducers
  [usersSlice.name]: usersSlice.reducer,
});

const sagaMiddleware = createSagaMiddleware();
const connectReducer = compose(
  applyMiddleware(sagaMiddleware),
  DevTools.instrument()
)(createStore);

const store = {
  ...connectReducer(reducer),
  runSaga: sagaMiddleware.run(rootSaga),
};

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof reducer>;

export default store;
