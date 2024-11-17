import React, { useState } from 'react'
import TransportedProductRcvStatusModal from './FinancialYearAddModal';
import FinancialYearAddModal from './FinancialYearAddModal';
//import TransportedProductRcvStatusModal from './TransportedProductRcvStatusModal';

const FinancialYearAddModalButton = ({
  id,
  ActionURL,
  redirectURL,
  fetchDetailsData,
  buttonName,
}) => {
  const [isModalOpen, setModalOpen] = useState(false);
  const [selectedID, setSelectedID] = useState(null);

  const openModal = (id) => {
    setModalOpen(true);
    setSelectedID(id)
  };

  const closeModal = () => {
    setModalOpen(false);
    setSelectedID(null)
  };



  return (
    <div>
      <div className='flex justify-center '>
        <button
          onClick={() => openModal(id)}
          className='capitalize rounded-[4px] px-[2px] py-1 text-[#fff] text-sm'
        >
          {buttonName}
        </button>
      </div>

      <FinancialYearAddModal
        isOpen={isModalOpen}
        onClose={closeModal}
        id={id}
        ActionURL={ActionURL}
        redirectURL={redirectURL}
        setModalOpen={setModalOpen}
        fetchDetailsData={fetchDetailsData}
        buttonName={buttonName}
      />
    </div>
  )
}

export default FinancialYearAddModalButton;