import React from 'react'
import LoadingSpinner from '../../../components/LoadingSpinner';
import InputFiledWC from '../../../components/FormWithoutClass/InputFiledWC';
import FinancialYearAddModalFormHandleCom from './FinancialYearAddModalFormHandleCom';
import TextareaInputWC from '../../../components/FormWithoutClass/TextareaInputWC';
import Checkbox from '../../../components/Form/Checkbox';
import DateInputWC from '../../../components/FormWithoutClass/DateInputWC';
//import LoadingSpinner from '../../../../../Components/LoadingSpinner';


function FinancialYearAddModalFormCom({
    id,
    ActionURL,
    redirectURL,
    setModalOpen,
    fetchDetailsData
}) {
    const {
        formData,
        handleInputChange,
        handleSubmit,
        loading,
        inputErrorList,

    } = FinancialYearAddModalFormHandleCom({
        id,
        ActionURL,
        redirectURL,
        setModalOpen,
        fetchDetailsData,
    });


    if (loading) {
        return <LoadingSpinner />
    }

    return (
        <div className='mt-[60px]'>
            <form onSubmit={handleSubmit}>
                <div className="grid md:grid-cols-1 gap-2">

                    <div className='my-2'>
                        <InputFiledWC type='text'
                            className='pl-3 py-[9.5px] h-[44px] mt-[1px] mb-[3px] appearance-none border-[1px] border-[#9d9c9c] w-[100%] focus:outline-none focus:bg-white focus:border-[#2e6da4]'
                            name='financial_year'
                            id='financial_year' label='Financial Year'
                            isRequired={false}
                            placeholder='name of year'
                            value={formData.financial_year}
                            onChange={handleInputChange}
                        />
                        <span className='text-[#9D3030]'>{inputErrorList.financial_year ? 'Financial year field can not be empty !' : ''}</span>
                    </div>

                    <div className='my-2'>
                        <InputFiledWC 
                            type='date'              
                            className='pl-3 py-[9.5px]  h-[44px] mt-[1px] mb-[3px] appearance-none border-[1px] border-[#9d9c9c] w-[100%] focus:outline-none focus:bg-white focus:border-[#2e6da4]'
                            name='start_date'
                            id='start_date' label='Start Date'
                            isRequired={false}
                            placeholder='year starting date'
                            value={formData.start_date}
                            onChange={handleInputChange}
                        />

                        <span className='text-[#9D3030] pb-[10px]'>{inputErrorList.start_date? 'Start date should be a valid date !' : ''}</span>
                    </div>

                    <div className='my-2'>
                        <InputFiledWC type='date'
                            className='pl-3 py-[9.5px] h-[44px] mt-[1px] mb-[3px] appearance-none border-[1px] border-[#9d9c9c] w-[100%] focus:outline-none focus:bg-white focus:border-[#2e6da4]'
                            name='end_date'
                            id='end_date' label='End Date'
                            isRequired={false}
                            placeholder='year ending date'
                            value={formData.end_date}
                            onChange={handleInputChange}
                        />
                        <span className='text-[#9D3030] pb-[10px]'>{inputErrorList.end_date? 'End date should be a valid date !' : ''}</span>
                    </div>
                    {id != null && (
                        <div>
                            <Checkbox
                                type='checkbox'
                                checked={formData.status}
                                onChange={handleInputChange}
                                name='status'
                                id='status'
                                label='Active'
                                isRequired={false}
                                placeholder='Status'
                            />
                        </div>
                    )}


                </div>
                <div className=" mt-4 bottom-0 flex justify-center">
                    <button type='submit' className='bg-[#2e6da4] text-[#fff] rounded-[5px] px-4 py-2 '>{!id ? 'Save' : 'Update'}</button>
                </div>
            </form>
        </div>
    )
}

export default FinancialYearAddModalFormCom;