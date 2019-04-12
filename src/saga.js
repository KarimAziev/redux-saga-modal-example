import { sagas as modalSagas, createModal } from 'redux-saga-modal';
import {
  all,
  call,
  fork,
  race,
  getContext,
  cancelled,
} from 'redux-saga/effects';
import api from 'api';

export const MODAL_TYPES = {
  CONFIRM: 'ConfirmModal',
  CANCEL: 'CancelModal',
};

const modalSagasConfig = {
  [MODAL_TYPES.CANCEL]: cancelModal,
};

export default function* rootAppSaga() {
  yield all([
    fork(modalSagas, modalSagasConfig),
    fork(confirmModal),
    fork(confirmRemove),
    //another app sagas
  ]);
}

function* confirmModal() {
  const modal = createModal(MODAL_TYPES.CONFIRM);
  while (true) {
    yield modal.takeShow();

    const click = yield race({
      ok: modal.takeClick((value) => value === 'OK'),
      cancel: modal.takeHide(),
    });

    const props = yield modal.select();

    if (click.cancel) {
      return yield modal.destroy();
    }

    yield modal.update({
      title: 'Saving',
      confirmBtn: {
        ...props.confirmBtn,
        disabled: true,
        loading: true,
      },
    });

    yield call(api.save);

    yield modal.update({
      title: 'Changes saved',
      confirmBtn: { loading: false },
    });

    yield modal.destroy();
  }
}

function* cancelModal() {
  const modal = yield getContext(this.name);

  yield modal.takeClick('OK');

  try {
    const props = yield modal.select();

    yield modal.update({
      title: 'Saving',
      text:
        'By clicking cancel you will see how modal performs cleanup',
      confirmBtn: {
        ...props.confirmBtn,
        disabled: true,
        loading: true,
      },
    });

    yield call(api.save);

    yield modal.update({
      title: 'Changes saved',
      confirmBtn: { loading: false },
    });

    yield modal.hide({ destroy: false });
  } finally {
    if (yield cancelled()) {
      yield modal.show({
        title: 'Api call was cancelled! You can retry it',
        confirmBtn: {
          disabled: false,
          loading: false,
          title: 'Save again',
        },
        cancelBtn: {
          disabled: false,
          loading: false,
          title: 'Close modal',
        },
      });
    }
  }
}

export function* confirmRemove() {
  const modal = createModal(MODAL_TYPES.CONFIRM);
  const isConfirmed = yield modal.call({
    title: 'Are you sure want to delete this item?',
  });
}
