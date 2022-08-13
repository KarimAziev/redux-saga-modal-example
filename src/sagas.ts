import { race, call, fork, all } from 'redux-saga/effects';
import {
  sagas as modalsSaga,
  SagaModalInstance,
  SagaModalAction,
} from 'redux-saga-modal';

interface CommentData {
  id: number;
  comment: string;
}

const saveComment = (data: CommentData) =>
  new Promise((resolve) => setTimeout(() => resolve({ ok: true }), 1000));

const saveCommentWorker = function*(this: SagaModalInstance) {
  const [submitAction]: SagaModalAction<CommentData>[] = yield race([
    this.takeSubmit(),
    this.takeHide(),
  ]);

  if (submitAction) {
    yield this.update({
      title: 'Saving',
      loading: true,
    });

    yield call(saveComment, submitAction.payload as CommentData);
    yield this.update({
      title: 'Changes saved',
      loading: false,
    });
  }

  yield this.hide();
};

const modalsTasks = {
  saveComment: saveCommentWorker,
};

export default function* rootSaga() {
  yield all([fork(modalsSaga, modalsTasks)]);
}
