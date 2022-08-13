import { race, put, take } from 'redux-saga/effects';
import { createModalHelpers } from 'redux-saga-modal';
import { ConfirmModalOwnProps } from './Modal';

const modal = createModalHelpers('confirm');
const confirmModal = function*(initProps: ConfirmModalOwnProps) {
  yield put(modal.actions.show(initProps));

  const [submit]: boolean[] = yield race([
    take(modal.patterns.submit()),
    take(modal.patterns.hide()),
  ]);

  yield put(modal.actions.hide());

  return !!submit;
};
