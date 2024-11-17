import React, { useEffect, useState } from 'react';
import { ImCancelCircle } from 'react-icons/im';
import Modal from 'react-modal';
import CoaCreateFormComponent from './CoaCreateFormComponent';


function CoaCreateModal(
  { 
    isOpen, 
    onClose,
    setModalOpen,
    formData,
    setFormData,
    validateFormData,
    handleInputChange,
    selectedParentName,
    handleParentNameChange,
    parentNameOptions,
    handleStatusChange,
    fetchData,
    setSelectedParentName,
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
      <div className='mb-2 w-[350px] md:w-[350px] lg:w-[450px] overflow-y-auto h-[350px]'>
        <div className='modal-title flex justify-between bg-[#fff] text-[#EB5757] text-[18px] px-3 py-2 rounded-[5px] mb-10 shadow fixed top-0 left-0 right-0 z-50'>
          <h1 className='font-semibold uppercase'>Create Form</h1>
          <button className='text-[#000]' onClick={onClose}><ImCancelCircle /></button>
        </div>

          <div>
              <CoaCreateFormComponent 
              setModalOpen={setModalOpen} 
              formData={formData} 
              setFormData={setFormData}
              fetchData={fetchData}
              validateFormData={validateFormData} 
              handleInputChange={handleInputChange}
              selectedParentName={selectedParentName}
              setSelectedParentName={setSelectedParentName }
              handleParentNameChange={handleParentNameChange}
              parentNameOptions={parentNameOptions}
              handleStatusChange={handleStatusChange}
              />
          </div>
      </div>
    </Modal>
  );
}

export default CoaCreateModal;