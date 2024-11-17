import React from 'react'
import CoaUpdateFormHandleComponent from './CoaUpdateFormHandleComponent'
import HorizontalInputFiled from '../../../../components/Form/HorizontalInputFiled'
import HorizontalSelectField from '../../../../components/Form/HorizontalSelectField'
import CustomCreateButton from '../../../../components/Form/CustomCreateButton'
import CustomUpdateButton from '../../../../components/Form/CustomUpdateButton'
import CustomDeleteButton from '../../../../components/Form/CustomDeleteButton'
import CoaCreateModalButton from '../CoaCreateComponent/CoaCreateModalButton'
import CoaDeleteFormHandleComponent from './CoaDeleteFormHandleComponent'

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
}) => {
    const {
        submitLoading,
        errorMessage,
        formValidationErrors,
        handleUpdate,
    } = CoaUpdateFormHandleComponent({formData,validateFormData,fetchData, setFormData,
      setSelectedParentName,})

    const {
      deleteSubmitLoading,
      deleteErrorMessage,
      handleDelete,
  } = CoaDeleteFormHandleComponent({formData,validateFormData,fetchData,setFormData,
    setSelectedParentName,})


    console.log('formValidationErrors-pp:',formValidationErrors)
  return (
    <div className="coa-form p-2 border">
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
          label={"Ledger Name*"}
          labelFontWeight={'font-semibold'}
          name="p_account_name"
          id="p_account_name"
          type="text"
          onChange={(e) => handleInputChange(e)}
          value={formData.p_account_name}
          placeholder={'Enter ledger name'}
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
        <CoaCreateModalButton 
            formData={formData} 
            setFormData={setFormData}
            validateFormData={validateFormData} 
            handleInputChange={handleInputChange}
            selectedParentName={selectedParentName}
            setSelectedParentName ={setSelectedParentName }
            handleParentNameChange={handleParentNameChange}
            parentNameOptions={parentNameOptions}
            handleStatusChange={handleStatusChange}
            fetchData={fetchData}
        />
        <button onClick={handleUpdate} disabled={submitLoading}>
          {submitLoading ? 'Updating...' : 'Update'}
       </button>
       <button onClick={handleDelete} disabled={deleteSubmitLoading}>
          {deleteSubmitLoading ? 'Deleting...' : 'Delete'}
       </button>
      </div>
  </div>
  )
}

export default CoaUpdateFormComponent