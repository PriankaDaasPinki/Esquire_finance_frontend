import React, { useState } from 'react'
import CoaCreateModal from './CoaCreateModal';

const CoaCreateModalButton = ({
  formData,
  setFormData,
  validateFormData,
  handleInputChange,
  selectedParentName,
  handleParentNameChange,
  parentNameOptions,
  handleStatusChange,
  fetchData,
  setSelectedParentName 
}) => {
    const [isModalOpen, setModalOpen] = useState(false);


    const openModal = () => {
      setModalOpen(true);
    };
  
    const closeModal = () => {
      setModalOpen(false);
    };



  return (
    <div>
        <div className='flex'>
              <button
                  onClick={() => openModal()}
                  className='bg-[#2e6da4] text-[#fff] rounded-[5px] px-4 py-1'
                  >
                    Create
              </button>
        </div>

          <CoaCreateModal
                isOpen={isModalOpen}
                onClose={closeModal}
                setModalOpen={setModalOpen}
                formData={formData} 
                setFormData={setFormData}
                fetchData={fetchData}
                validateFormData={validateFormData} 
                handleInputChange={handleInputChange}
                selectedParentName={selectedParentName}
                setSelectedParentName ={setSelectedParentName }
                handleParentNameChange={handleParentNameChange}
                parentNameOptions={parentNameOptions}
                handleStatusChange={handleStatusChange}
                
            />
    </div>
  )
}

export default CoaCreateModalButton