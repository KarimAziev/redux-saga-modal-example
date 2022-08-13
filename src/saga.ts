import {
  call,
  fork,
  all,
  select,
  put,
  take,
  race,
  takeLatest,
} from 'redux-saga/effects';
import { loadData, removeUser, User } from './users';
import api from './api';
import { modal, ConfirmModalOwnProps } from './Modal';
import { RootState } from './store';

export const confirmModal = function*(initProps: ConfirmModalOwnProps) {
  yield modal.show(initProps);

  const [submit]: boolean[] = yield race([
    modal.takeSubmit(),
    modal.takeHide(),
  ]);

  yield modal.hide();

  return !!submit;
};

export const removeUserWatcher = function*() {
  while (true) {
    const { payload: userId } = yield take(removeUser.trigger.toString());

    const user: User = yield select((state: RootState) =>
      state.users.data.find(({ id }) => id === userId)
    );
    if (!user) {
      continue;
    }
    const confirm: boolean = yield call(confirmModal, {
      title: `Remove ${user.name}?`,
      text: `Are you sure want to remove ${user.name}?`,
    });

    if (!confirm) {
      continue;
    }

    yield call(removeWorker, userId);
  }
};

export const removeWorker = function* remove(key: string) {
  try {
    yield put(removeUser.request(key));
    yield call(api.remove, key, { ok: true });
    yield put(removeUser.success(key));
  } catch (err) {
    yield put(removeUser.failure(key));
  } finally {
    yield put(removeUser.fulfill(key));
  }
};

export const fetchUsers = function* remove() {
  try {
    yield put(loadData.request());
    const users: User[] = yield call(api.fetchUsers);
    yield put(loadData.success(users));
  } catch (err) {
    yield put(loadData.failure(err as Error));
  } finally {
    yield put(loadData.fulfill());
  }
};

export default function* rootAppSaga() {
  yield all([
    fork(removeUserWatcher),
    takeLatest(loadData.trigger, fetchUsers),
  ]);
}
