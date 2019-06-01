import { createModal } from 'redux-saga-modal';
import {
  call,
  fork,
  delay,
  all,
  select,
  put,
  take,
  race,
} from 'redux-saga/effects';
import { routines } from './users';
import api from 'api';
import MODAL_TYPES from './modalTypes';

export default function* rootAppSaga() {
  yield all([fork(removeUser)]);
}

export function* confirmModal(initProps) {
  const modal = createModal(MODAL_TYPES.CONFIRM);

  yield modal.show(initProps);

  const winner = yield race({
    submit: modal.takeSubmit(),
    hide: modal.takeHide(),
  });

  if (winner.submit) {
    yield modal.hide();
    return modal;
  } else {
    yield modal.destroy();
  }
}

export function* removeUser() {
  while (true) {
    const { payload: userId } = yield take(
      routines.removeUser.TRIGGER
    );

    const userName = yield select(
      (state) => state.users[userId].name
    );

    const confirm = yield call(confirmModal, {
      title: `Remove ${userName}?`,
      text: `Are you sure want to remove ${userName}?`,
    });

    if (!confirm) {
      continue;
    }

    yield call(remove, userId);
    yield confirm.destroy();
  }
}

export function* remove(key) {
  yield put(routines.removeUser.request(key));

  try {
    yield call(api.remove);
    yield put(routines.removeUser.success(key));
  } catch (err) {
    yield put(routines.removeUser.failure(key));
  }
}
