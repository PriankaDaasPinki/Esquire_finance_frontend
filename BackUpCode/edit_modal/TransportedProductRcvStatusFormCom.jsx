import React from 'react'
import TransportedProductRcvStatusFormHandleCom from './TransportedProductRcvStatusFormHandleCom';
import TextareaInputWC from '../../../../../Components/FormWithoutClass/TextareaInputWC';
import LoadingSpinner from '../../../../../Components/LoadingSpinner';


function TransportedProductRcvStatusFormFormCom({
    id,
    ActionURL,
    redirectURL,
    setModalOpen,
    fetchDetailsData,
}) {
    const {
        formData,
        handleInputChange,
        handleSubmit,
        loading,
    } = TransportedProductRcvStatusFormHandleCom({
        id,
        ActionURL,
        redirectURL,
        setModalOpen,
        fetchDetailsData,
    });


    if(loading){
        return <LoadingSpinner />
    }

    return (
        <div className='mt-[60px]'>
            <form onSubmit={handleSubmit}>
                <div className="grid md:grid-cols-1 gap-2">

                    <div className='my-2'>
                        <TextareaInputWC type='text' 
                            className='pl-3 py-[9.5px] h-[44px] mt-[1px] appearance-none border-[1px] border-[#9d9c9c] w-[100%] focus:outline-none focus:bg-white focus:border-[#2e6da4]'
                            name='product_received_with' 
                            id='product_received_with' label='Received With'
                            isRequired={false} 
                            placeholder='product received with'
                            value={formData.product_received_with}
                            onChange={handleInputChange}
                        />
                    </div>
                    <div className='my-2'>
                        <TextareaInputWC type='text' 
                            className='pl-3 py-[9.5px] h-[44px] mt-[1px] appearance-none border-[1px] border-[#9d9c9c] w-[100%] focus:outline-none focus:bg-white focus:border-[#2e6da4]'
                            name='product_received_without' 
                            id='product_received_without' label='Received Without'
                            isRequired={false} 
                            placeholder='product received without'
                            value={formData.product_received_without}
                            onChange={handleInputChange}
                        />
                    </div>
                    <div className='my-2'>
                        <TextareaInputWC type='text' 
                            className='pl-3 py-[9.5px] h-[44px] mt-[1px] appearance-none border-[1px] border-[#9d9c9c] w-[100%] focus:outline-none focus:bg-white focus:border-[#2e6da4]'
                            name='product_received_note' 
                            id='product_received_note' label='Received Note'
                            isRequired={false} 
                            placeholder='product received note'
                            value={formData.product_received_note}
                            onChange={handleInputChange}
                        />
                    </div>
                    
                </div>
                <div className=" mt-4 bottom-0">
                        <button type='submit' className='bg-[#FA6669] text-[#fff] rounded-[5px] px-4 py-2 w-[100%]'>Receive</button>
                    </div>
            </form>
        </div>
    )
}

export default TransportedProductRcvStatusFormFormCom