
import React from 'react'
import { useSelector } from 'react-redux';
import CoaFormSubmitHandler from '../CoaFormSubmitHandler';

const CoaCreateFromHangleComponent = ({ 
    setModalOpen,formData,
    validateFormData,fetchData,
    setFormData,setSelectedParentName,
    hndaleCreateFormClose,
    setCreateFormOpen
  }) => {
  const user = useSelector((state) => state.user.user);

  const message = {
    confirmTitle: 'Confirm Data Create',
    confirmText: 'Are you sure you want to create the data?',
    confirmTextIcon: 'info',
    confirmButtonColor: '#0c5509',
    confirmButtonText: 'Yes, create data!', 
    success_message: 'Successfully Created'
  }

  const { submitLoading, errorMessage, formValidationErrors, handleSubmit } = CoaFormSubmitHandler({
      apiEndPoint:'drf-finance/coas', 
      formData:{
        p_id: null,
        p_account_name: formData.p_account_name,
        p_parent_id: parseInt(formData.p_id, 10),
        p_is_subtype: false,
        p_subtype_id: null,
        p_is_active: formData.p_is_active,
        p_created_by: user.id,
        p_deleted_at: null
      }, 
      validateFormData,
      redirectURL:'coas-list',
      setModalOpen,
      fetchData,
      setFormData,
      setSelectedParentName,
      message,
      hndaleCreateFormClose,
    });

  return (
    {
      submitLoading,
      errorMessage,
      formValidationErrors,
      handleSubmit,
    }
  )
}

export default CoaCreateFromHangleComponent