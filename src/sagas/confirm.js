import { getModalEffects } from 'redux-saga-modal';
import { call, put, take, all, spawn } from 'redux-saga/effects';
import MODAL_TYPES from '../modalTypes';
import * as routines from 'routines';
import api from 'api';

export function* removeUser() {
  while (true) {
    const { payload } = yield take(routines.removeUser.TRIGGER);
    const { name: userName, key: userId } = payload;

    yield getModalEffects(MODAL_TYPES.CONFIRM).call(function*() {
      yield this.show({
        text: `Are you sure want to delete ${userName} ?`,
      });

      yield take(this.isConfirm());
    });
  }
}

function* remove(key, userName) {
  yield put(routines.removeUser.request(key));

  try {
    yield call(api.remove, 3000);
    yield put(routines.removeUser.success(key));
    return userName;
  } catch (err) {
    yield put(routines.removeUser.failure(key));
  }
}
