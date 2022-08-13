import {
  sagaModal,
  createModal,
  SagaModalInjectedProps,
} from 'redux-saga-modal';
import ReactModal from 'react-modal';
import { ReactNode } from 'react';

ReactModal.setAppElement('#root');

export interface ConfirmModalOwnProps {
  title: ReactNode;
  text: ReactNode;
}

const Confirm: React.FC<ConfirmModalOwnProps & SagaModalInjectedProps> = ({
  isOpen,
  submit,
  hide,
  title,
  text,
}) => {
  const handleSubmit = () => {
    submit();
  };
  return (
    <ReactModal
      isOpen={isOpen}
      onRequestClose={hide}
      closeTimeoutMS={500}
      className={'modal'}
    >
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
    </ReactModal>
  );
};

const modal = createModal('confirm');

const ConnectedConfirmModal = sagaModal({
  name: modal.name,
})(Confirm);

export { modal, ConnectedConfirmModal };
