import React from 'react';
import { sagaModal } from 'redux-saga-modal';
import { MODAL_TYPES } from 'saga';
import 'rc-dialog/assets/index.css';
import { Modal, Button } from 'antd';

const modalName = MODAL_TYPES.CONFIRM;

const ConfirmModal = (props) => {
  const {
    isOpen,
    text,
    title,
    click,
    hide,
    confirmBtn,
    cancelBtn,
    onCancel,
    onOk,
    ...rest
  } = props;

  return (
    <Modal
      visible={isOpen}
      title={title}
      onCancel={hide}
      animation='zoom'
      maskAnimation='fade'
      {...rest}
    >
      {text}
    </Modal>
  );
};
ConfirmModal.defaultProps = {
  confirmBtn: {},
  cancelBtn: {},
};

ConfirmModal.displayName = modalName;

ConfirmModal.Button = ({ showModal, ...rest }) => (
  <Button onClick={() => showModal(modalName)} {...rest} />
);

export default sagaModal({
  name: modalName,
  initProps: {
    text:
      'Click save for a long request and then immediatelly click cancel',
    title: 'Save changes?',
    okButtonProps: {
      title: 'Confirm',
      loading: false,
      htmlType: 'submit',
    },
    cancelButtonProps: {
      title: 'Cancel',
    },
  },
})(ConfirmModal);
