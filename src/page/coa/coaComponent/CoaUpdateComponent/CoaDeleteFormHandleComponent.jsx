import React from 'react'
import { useSelector } from 'react-redux';
import CoaFormSubmitHandler from '../CoaFormSubmitHandler';

const getCurrentDateTime = () => {
  const date = new Date();
  const padZero = (num) => (num < 10 ? `0${num}` : num);
  const year = date.getFullYear();
  const month = padZero(date.getMonth() + 1); // Months are zero-based
  const day = padZero(date.getDate());
  const hours = padZero(date.getHours());
  const minutes = padZero(date.getMinutes());
  const seconds = padZero(date.getSeconds());

  return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
};

const CoaDeleteFormHandleComponent = ({validateFormData,formData,fetchData, setFormData,
  setSelectedParentName,}) => {
    const user = useSelector((state) => state.user.user);

    const message = {
      confirmTitle: 'Confirm Data Delete',
      confirmText: 'Are you sure you want to delete the data?',
      confirmTextIcon: 'warning',
      confirmButtonColor: '#ac0c0c',
      confirmButtonText: 'Yes, delete data!', 
      success_message: 'Successfully Deleted'
    }

    const { submitLoading:deleteSubmitLoading, errorMessage:deleteErrorMessage, formValidationErrors, handleSubmit: handleDelete} = CoaFormSubmitHandler({
        apiEndPoint:'drf-finance/coas', 
        formData:{
          
          p_id:  parseInt(formData.p_id, 10),
          p_account_name: formData.p_account_name,
          p_parent_id: parseInt(formData.p_parent_id, 10),
          p_is_subtype: false,
          p_subtype_id: null,
          p_is_active: formData.p_is_active,
          p_created_by: user.id,
          p_deleted_at: getCurrentDateTime(),
        }, 
        validateFormData,
        redirectURL:'coas-list',
        fetchData,
        setFormData,
        setSelectedParentName,
        message
      });
  return (
    {
        deleteSubmitLoading,
        deleteErrorMessage,
        handleDelete,
    }
  )
}

export default CoaDeleteFormHandleComponent