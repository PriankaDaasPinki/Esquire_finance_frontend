import React, { useEffect, useState } from 'react';
import { ImCancelCircle } from 'react-icons/im';
import Modal from 'react-modal';
import TransportedProductRcvStatusFormCom from './FinancialYearAddModalFormCom';
import FinancialYearAddModalFormCom from './FinancialYearAddModalFormCom';

function FinancialYearAddModal(
  { 
    isOpen, 
    onClose,
    id,
    ActionURL,
    redirectURL,
    setModalOpen,
    fetchDetailsData,
    buttonName
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
      <div className='mb-2 w-[360px] md:w-[400px] overflow-y-auto h-[100%]'>
        <div className='modal-title flex justify-between bg-[#f8f8f8] text-[#000] 
                       text-[18px] px-3 py-2 rounded-t-[5px] mb-10 shadow fixed top-0 
                       left-0 right-0 z-50 '
              >
          <h1 className='font-medium capitalize'>{!id? 'Add': 'Update'} Financial Year</h1>
          <button className='text-[#e41418]  rounded px-2' onClick={onClose}><ImCancelCircle /></button>
        </div>

          <div>
              <FinancialYearAddModalFormCom 
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

export default FinancialYearAddModal;