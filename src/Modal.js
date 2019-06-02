import React from 'react';
import { sagaModal } from 'redux-saga-modal';
import MODAL_TYPES from './modalTypes';
import ReactModal from 'react-modal';

ReactModal.setAppElement('#root');

const Modal = ({
  modal: { name },
  isOpen,
  show,
  update,
  destroy,
  click,
  submit,
  hide,
  showModal,
  updateModal,
  submitModal,
  clickModal,
  hideModal,
  destroyModal,
  ...ownProps
}) => (
  <ReactModal
    isOpen={isOpen}
    onRequestClose={hide}
    closeTimeoutMS={500}
    className={'modal'}>
    <h3>
      {ownProps.title}
    </h3>
    <p>
      {ownProps.text}
    </p>
    <div>
      <button
        style={{ marginRight: 10 }}
        type={'button'}
        className={'button theme__secondary'}
        onClick={hide}>
        Cancel
      </button>
      <button
        type={'submit'}
        className={'button theme__primary'}
        onClick={() => submit()}>
        Confirm
      </button>
    </div>
  </ReactModal>
);

export default sagaModal({
  name: MODAL_TYPES.CONFIRM,
  destroyOnHide: false,
  keepComponentOnHide: true,
})(Modal);
