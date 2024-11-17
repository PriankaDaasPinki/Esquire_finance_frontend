import React, { useEffect, useState } from 'react';
import { ImCancelCircle } from 'react-icons/im';
import Modal from 'react-modal';
import TransportedProductRcvStatusFormCom from './TransportedProductRcvStatusFormCom';

function TransportedProductRcvStatusModal(
  { 
    isOpen, 
    onClose,
    id,
    ActionURL,
    redirectURL,
    setModalOpen,
    fetchDetailsData,
}) 
  {

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onClose}
      contentLabel="Purchased Details Modal"
      className="modal"
      overlayClassName="overlay"
    >
      <div className='mb-2 w-[360px] md:w-[500px] lg:w-[500px] overflow-y-auto h-[350px]'>
        <div className='modal-title flex justify-between bg-[#fff] text-[#EB5757] text-[18px] px-3 py-2 rounded-[5px] mb-10 shadow fixed top-0 left-0 right-0 z-50'>
          <h1 className='font-semibold uppercase'>Product Receive Status Update Form</h1>
          <button className='text-[#000]' onClick={onClose}><ImCancelCircle /></button>
        </div>

          <div>
              <TransportedProductRcvStatusFormCom 
                  id={id}
                  ActionURL={ActionURL}
                  redirectURL={redirectURL}
                  setModalOpen={setModalOpen}
                  fetchDetailsData={fetchDetailsData}
              />
          </div>
      </div>
    </Modal>
  );
}

export default TransportedProductRcvStatusModal;