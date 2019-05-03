import { getModalEffects, callModal } from 'redux-saga-modal';
import {
  call,
  put,
  take,
  all,
  spawn,
  delay,
} from 'redux-saga/effects';
import MODAL_TYPES from '../modalTypes';
import * as routines from 'routines';
import api from 'api';

export function* removeUser() {
  while (true) {
    const { payload } = yield take(routines.removeUser.TRIGGER);
    const { name: userName, key: userId } = payload;

    yield getModalEffects(MODAL_TYPES.CONFIRM).call(function*() {
      const modal = this;
      yield modal.show({
        text: `Are you sure want to delete ${userName} ?`,
      });

      yield modal.takeConfirm();
      yield spawn(remove, userId, userName);
    });
  }
}

export function* _removeUser() {
  while (true) {
    const { payload } = yield take(routines.removeUser.TRIGGER);
    const { name: userName, key: userId } = payload;

    yield callModal(MODAL_TYPES.CONFIRM, function*() {
      yield this.show({
        text: `Are you sure want to delete ${userName} ?`,
      });
      yield take(this.isConfirm());
      yield spawn(remove, userId, userName);
    });
  }
}

function* remove(key, userName) {
  yield put(routines.removeUser.request(key));

  try {
    yield call(api.remove, 3000);
    yield put(routines.removeUser.success(key));
    return userName;
  }
 catch (err) {
    yield put(routines.removeUser.failure(key));
  }
}
