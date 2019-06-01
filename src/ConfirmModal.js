import React from 'react';
import { sagaModal } from 'redux-saga-modal';
import MODAL_TYPES from './modalTypes';
import 'rc-dialog/assets/index.css';
import { Modal } from 'antd';

const modalName = MODAL_TYPES.CONFIRM;

const ConfirmModal = (props) => {
  const {
    isOpen,
    text,
    title,
    submit,
    hide,
    loading,
    okButtonProps,
    ...rest
  } = props;

  return (
    <Modal
      visible={isOpen}
      title={title}
      onCancel={hide}
      onOk={({ target }) => submit(target.value)}
      animation={'zoom'}
      maskAnimation={'fade'}
      okButtonProps={{
        loading: loading,
        ...okButtonProps,
      }}
      {...rest}>
      {text}
    </Modal>
  );
};
ConfirmModal.defaultProps = {
  confirmBtn: {},
  cancelBtn: {},
};

ConfirmModal.displayName = modalName;

export default sagaModal({
  name: modalName,
  initProps: {
    text: '',
    title: 'Delete user?',
  },
  destroyOnHide: false,
  keepComponentOnHide: true,
})(ConfirmModal);
