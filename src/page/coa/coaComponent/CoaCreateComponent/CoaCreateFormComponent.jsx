import React from 'react'
import CoaCreateFromHangleComponent from './CoaCreateFromHangleComponent'
import CustomCreateButton from '../../../../components/Form/CustomCreateButton'
import HorizontalInputFiled from '../../../../components/Form/HorizontalInputFiled'
import { IoChevronBackCircle } from 'react-icons/io5'

const CoaCreateFormComponent = ({ 
    setModalOpen,   
    formData,
    validateFormData,
    handleInputChange,
    selectedParentName,
    setSelectedParentName ,
    handleParentNameChange,
    parentNameOptions,
    handleStatusChange,
    fetchData,
    setFormData,
    hndaleCreateFormClose,
    setCreateFormOpen,
}) => {
    const {
        submitLoading,
        errorMessage,
        formValidationErrors,
        handleSubmit,
    } = CoaCreateFromHangleComponent({
      setModalOpen,
      formData,
      validateFormData,
      fetchData,
      setFormData,
      setSelectedParentName,
      setCreateFormOpen,
      hndaleCreateFormClose,
      })

  return (
      <div>
        <div className="coa-form p-2">
          <div className='text-right'>
              <button 
                title='Back to view'
                aria-label="Back to view" 
                
                onClick={hndaleCreateFormClose}>
                <IoChevronBackCircle className='text-[30px] text-[#ac0c0c]'  />
            </button>
          </div>

        
        <form>
            <div className='my-3'>
              <HorizontalInputFiled 
                label={"Head Label*"}
                labelFontWeight={'font-semibold'}
                type="text"
                value={formData.head_label}
                placeholder={'Enter head label'}
              />
              {formValidationErrors.head_label && <p className='text-[#fa3232] text-right font-[Inter]'>{formValidationErrors.head_label}</p>}
            </div>

            <div className='my-3'>
              <HorizontalInputFiled 
                label={"Account Name*"}
                labelFontWeight={'font-semibold'}
                name="p_account_name"
                id="p_account_name"
                type="text"
                onChange={(e) => handleInputChange(e)}
                value={formData.p_account_name}
                placeholder={'Enter account name'}
              />
              {formValidationErrors.p_account_name && <p className='text-[#fa3232] text-right font-[Inter]'>{formValidationErrors.p_account_name}</p>}
            </div>

            <div className='flex my-3'>
              <div className='w-[30%] md:w-[35%]'>
                Active Status
              </div>
              <div className='w-[70%] md:w-[65%]'>
                <label className='mx-1'>
                  <input
                    type="radio"
                    name="p_is_active"
                    value="true" // Set value as string "true"
                    checked={formData.p_is_active === true} // Check if true
                    onChange={handleStatusChange}
                  />
                  <span className="ml-1">Active</span>
                </label>
                <label className='mx-1'>
                  <input
                    type="radio"
                    name="p_is_active"
                    value="false" // Set value as string "false"
                    checked={formData.p_is_active === false} // Check if false
                    onChange={handleStatusChange}
                  />
                  <span className="ml-1">Disable</span>
                </label>
              </div>
            </div>
          </form>
          <div className="flex gap-x-4 my-4">
            {formData.head_label != 6 && ( 
            <button className='bg-[#0c5509] text-[#fff] rounded-[5px] px-4 py-1' onClick={handleSubmit} disabled={submitLoading}>
              {submitLoading ? 'Adding...' : 'Add'}
            </button>
            )}

            </div>
        </div>
      </div>
  )
}

export default CoaCreateFormComponent