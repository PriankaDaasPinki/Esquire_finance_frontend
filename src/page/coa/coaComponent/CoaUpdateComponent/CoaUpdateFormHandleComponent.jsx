import React from 'react'
import { useSelector } from 'react-redux';
import CoaFormSubmitHandler from '../CoaFormSubmitHandler';

const CoaUpdateFormHandleComponent = ({validateFormData,formData,fetchData,setFormData,
  setSelectedParentName,}) => {
    const user = useSelector((state) => state.user.user);
    const message = {
      confirmTitle: 'Confirm Data Update',
      confirmText: 'Are you sure you want to update the data?',
      confirmTextIcon: 'info',
      confirmButtonColor: '#3085d6',
      confirmButtonText: 'Yes, update data!', 
      success_message: 'Successfully Updated'
    }

    const { submitLoading, errorMessage, formValidationErrors, handleSubmit: handleUpdate} = CoaFormSubmitHandler({
        apiEndPoint:'drf-finance/coas', 
        formData:{
          p_id:  parseInt(formData.p_id, 10),
          p_account_name: formData.p_account_name,
          p_parent_id: parseInt(formData.p_parent_id, 10),
          p_is_subtype: false,
          p_subtype_id: null,
          p_is_active: formData.p_is_active,
          p_created_by: user.id,
          p_deleted_at: null
        }, 
        validateFormData,
        redirectURL:'coas-list',
        fetchData,
        setFormData,
        setSelectedParentName,
        message,
      });
  return (
    {
        submitLoading,
        errorMessage,
        formValidationErrors,
        handleUpdate,
    }
  )
}

export default CoaUpdateFormHandleComponent