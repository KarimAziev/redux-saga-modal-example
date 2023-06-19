import { ReactNode } from 'react';
import {
  sagaModal,
  createModal,
  SagaModalInjectedProps,
} from 'redux-saga-modal';

export interface ConfirmModalOwnProps {
  title: ReactNode;
  text: ReactNode;
}

const Confirm: React.FC<ConfirmModalOwnProps & SagaModalInjectedProps> = ({
  submit,
  hide,
  title,
  text,
}) => {
  const handleSubmit = () => {
    submit();
  };
  return (
    <div className="modal">
      <h3>{title}</h3>
      <p>{text}</p>
      <div>
        <button
          style={{ marginRight: 10 }}
          type={'button'}
          className={'button theme__secondary'}
          onClick={hide}
        >
          Cancel
        </button>
        <button
          type={'submit'}
          className={'button theme__primary'}
          onClick={handleSubmit}
        >
          Confirm
        </button>
      </div>
    </div>
  );
};

const modal = createModal('confirm');

const ConnectedConfirmModal = sagaModal({
  name: modal.name,
})(Confirm);

export { ConnectedConfirmModal, modal };
