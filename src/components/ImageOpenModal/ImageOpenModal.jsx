// ModalImage.js
import React from 'react';
import { Modal } from 'antd';

const ImageOpenModal = ({ visible, onClose, imageSrc }) => {
  return (
    <Modal
      visible={visible}
      footer={null}
      onCancel={onClose}
      width="100%"
      style={{ maxWidth: '1000px' }}
    >
      <img src={imageSrc} alt="Full Size" style={{ width: '100%' }} />
    </Modal>
  );
};

export default ImageOpenModal;