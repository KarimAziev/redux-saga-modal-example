import { configureStore, combineReducers } from '@reduxjs/toolkit';
import createSagaMiddleware from 'redux-saga';
import { reducer as modalsReducer } from 'redux-saga-modal';
import DevTools from './devTools';
import { rootAppSaga } from './saga';
import usersSlice from './users';

const sagaMiddleware = createSagaMiddleware();
const rootReducer = combineReducers({
  // modalReducer should be mounted under 'modals' key,
  modals: modalsReducer,
  // ...your other reducers
  [usersSlice.name]: usersSlice.reducer,
});
export type RootState = ReturnType<typeof rootReducer>;
export const store = configureStore({
  reducer: rootReducer,
  devTools: false,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().prepend(sagaMiddleware),
  enhancers: (e) => [...e, DevTools.instrument()],
});

sagaMiddleware.run(rootAppSaga);

export type AppDispatch = typeof store.dispatch;

export default store;
