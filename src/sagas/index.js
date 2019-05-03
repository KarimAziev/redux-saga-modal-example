import { sagas as modalSagas } from 'redux-saga-modal';
import {
  all,
  call,
  fork,
  race,
  put,
  getContext,
  cancelled,
} from 'redux-saga/effects';
import api from 'api';
import confirmModal from './confirm';
import { removeUser } from './remover';
import MODAL_TYPES from '../modalTypes';
import cancelModal from './cancelModal';

export default function* rootAppSaga() {
  yield all([fork(removeUser)]);
}

