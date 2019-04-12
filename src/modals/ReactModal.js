import React from 'react';
import Modal from 'react-modal';

Modal.setAppElement('#root');

const style = {
  overlay: {
    zIndex: 10,
    padding: '30px',
    backgroundColor: 'rgba(0, 0, 0, 0.75)',
  },
  content: {
    border: 'none',
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
    textAlign: 'center',
  },
};

const ReactModal = (props) => {
  const { isOpen, onRequestClose, children, title, text } = props;

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      style={style}
      contentLabel='React Modal'
    >
      <h2>{title}</h2>
      <p>{text}</p>
      <p>{children}</p>
    </Modal>
  );
};

export default ReactModal;
