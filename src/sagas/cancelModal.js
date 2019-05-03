import {
  sagas as modalSagas,
  getModalEffects,
} from 'redux-saga-modal';
import {
  all,
  call,
  fork,
  race,
  getContext,
  cancelled,
} from 'redux-saga/effects';
import api from 'api';

export default function* cancelModal() {
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
