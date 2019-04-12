import React from 'react';
import ReactModal from './ReactModal';
import { Button } from 'antd';
import { sagaModal } from 'redux-saga-modal';
import { MODAL_TYPES } from 'saga';

const CancelModal = (props) => {
  const {
    isOpen,
    text,
    title,
    click,
    hide,
    confirmBtn,
    cancelBtn,
  } = props;

  return (
    <ReactModal
      isOpen={isOpen}
      title={title}
      text={text}
      onRequestClose={hide}
    >
      <Button {...cancelBtn} onClick={hide} />
      <Button
        {...confirmBtn}
        type={'secondary'}
        onClick={(e) => click('OK')}
      />
    </ReactModal>
  );
};
CancelModal.defaultProps = {
  confirmBtn: {},
  cancelBtn: {},
};

export default sagaModal({
  name: MODAL_TYPES.CANCEL,
  initProps: {
    text:
      'Click save for a long request and then immediatelly click cancel',
    title: 'Save changes?',
    confirmBtn: { title: 'Save' },
    cancelBtn: {
      title: 'Cancel',
    },
  },
})(CancelModal);
