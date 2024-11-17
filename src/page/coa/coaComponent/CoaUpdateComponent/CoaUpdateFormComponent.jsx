import React, { useEffect, useState } from 'react'
import CoaUpdateFormHandleComponent from './CoaUpdateFormHandleComponent'
import HorizontalInputFiled from '../../../../components/Form/HorizontalInputFiled'
import HorizontalSelectField from '../../../../components/Form/HorizontalSelectField'
import CoaDeleteFormHandleComponent from './CoaDeleteFormHandleComponent'
import CoaCreateFormComponent from '../CoaCreateComponent/CoaCreateFormComponent'
import ShowToast from '../../../../components/ShowToast'
import { useSelector } from 'react-redux'
import usePermissions from '../../../../hooks/usePermissions'
import ScaleLoader from 'react-spinners/ScaleLoader'

const CoaUpdateFormComponent = ({
    formData,
    validateFormData,
    handleInputChange,
    selectedParentName,
    handleParentNameChange,
    parentNameOptions,
    handleStatusChange,
    fetchData,
    setFormData,
    setSelectedParentName,
    createFormOpen,
    setCreateFormOpen,
    hndaleCreateFormOpen,
    hndaleCreateFormClose,
    handleSelectLoading,
}) => {
    const user = useSelector((state) => state.user.user);
    const {hasPermission} = usePermissions();

    const {
        submitLoading,
        errorMessage,
        formValidationErrors,
        handleUpdate,
    } = CoaUpdateFormHandleComponent({formData,validateFormData,fetchData, setFormData,setSelectedParentName,})

    const {
      deleteSubmitLoading,
      deleteErrorMessage,
      handleDelete,
    } = CoaDeleteFormHandleComponent({formData,validateFormData,fetchData,setFormData,setSelectedParentName,})


    const handleItemSelectCheck = (event) => {
      ShowToast('info','Please select an item'); 
    };


  return (
    <div className="coa-form p-2 border">
        {handleSelectLoading && 
          <ScaleLoader color={'#2e6da4'} loading={handleSelectLoading} size={5} />
        } 
    {createFormOpen === false?
        <>
          <form>

            <div className='my-3'>
              <HorizontalInputFiled
                label={"Head Label*"}
                labelFontWeight={'font-semibold'}
                type="text"
                value={formData.head_label}
                placeholder={'Enter head label'}
                required={true}
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
                required={true}
              />
              {formValidationErrors.p_account_name && <p className='text-[#fa3232] text-right font-[Inter]'>{formValidationErrors.p_account_name}</p>}
            </div>


            <div className="my-3">
              <HorizontalSelectField
                name='parent_name'
                id='parent_name'
                label='Parent Name'
                value={selectedParentName}
                onChange={handleParentNameChange}
                options={parentNameOptions}
                isRequired={false}
              />
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
          {formData.head_label != 6 &&(
            <>
            {hasPermission('create_acc_coa') && (
              <button className='bg-[#2e6da4] text-[#fff] rounded-[5px] px-4 py-1' onClick={hndaleCreateFormOpen}>
                Create
              </button>
            )}
            </>
          )}

          {formData.head_label != 0 &&(
            <>
          {hasPermission('update_acc_coa') && (
            <>
            {formData?.p_id?
              <button className='bg-[#757575] text-[#fff] rounded-[5px] px-4 py-1' onClick={handleUpdate} disabled={submitLoading}>
                {submitLoading ? 'Updating...' : 'Update'}
              </button>
              :
              <button className='bg-[#757575] text-[#fff] rounded-[5px] px-4 py-1' onClick={handleItemSelectCheck}>
                Update
              </button>
              }
            </>
           )}
            {hasPermission('delete_acc_coa') && (
              <>
              {formData?.p_id?
              <button className='bg-[#ac0c0c] text-[#fff] rounded-[5px] px-4 py-1' onClick={handleDelete} disabled={deleteSubmitLoading}>
                {deleteSubmitLoading ? 'Deleting...' : 'Delete'}
              </button>
              :
              <button className='bg-[#ac0c0c] text-[#fff] rounded-[5px] px-4 py-1' onClick={handleItemSelectCheck}>
                Delete
              </button>
              }
              </>
            )}
            </>
          )}
            
          </div>
        </>
    :
    <CoaCreateFormComponent 
      formData={formData}
      setFormData={setFormData}
      validateFormData={validateFormData}
      handleInputChange={handleInputChange}
      selectedParentName={selectedParentName}
      setSelectedParentName={setSelectedParentName}
      handleParentNameChange={handleParentNameChange}
      parentNameOptions={parentNameOptions}
      handleStatusChange={handleStatusChange}
      fetchData={fetchData}
      hndaleCreateFormClose={hndaleCreateFormClose}
      setCreateFormOpen={setCreateFormOpen}
    />
    }
  </div>
  )
}

export default CoaUpdateFormComponent