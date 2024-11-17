import React, { useState } from 'react'
import TransportedProductRcvStatusModal from './TransportedProductRcvStatusModal';

const TransportedProductRcvStatusModalButton = ({
  id,
  ActionURL,
  redirectURL,
  fetchDetailsData,
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
                  className='bg-[#FA6669] uppercase rounded-[4px] px-[5px] py-1 text-[#fff] mx-4'
                  >
                  Product Receive Status
              </button>
        </div>

          <TransportedProductRcvStatusModal
                isOpen={isModalOpen}
                onClose={closeModal}
                id={id}
                ActionURL={ActionURL}
                redirectURL={redirectURL}
                setModalOpen={setModalOpen}
                fetchDetailsData={fetchDetailsData}
            />
    </div>
  )
}

export default TransportedProductRcvStatusModalButton