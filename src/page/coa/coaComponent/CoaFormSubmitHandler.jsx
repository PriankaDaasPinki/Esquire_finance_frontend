import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { authAxios, baseURL } from '../../../baseURL';
import ShowToast from '../../../components/ShowToast';
import Swal from 'sweetalert2';

const CoaFormSubmitHandler = ({
  apiEndPoint, 
  formData, 
  validateFormData,
  redirectURL,
  setModalOpen,
  fetchData,
  setFormData,
  setSelectedParentName,
  message,
  hndaleCreateFormClose,
}) => {

  const navigate = useNavigate();
  const [submitLoading,setSubmitLoading] = useState(false)
  const [formValidationErrors, setFormValidationErrors] = useState({});
  const [errorMessage, setErrorMessage] = useState({});
  

  const handleSubmit = async (e) => {
    e.preventDefault();
    const result = await Swal.fire({
      title: message?.confirmTitle,
      text: message?.confirmText,
      icon: message?.confirmTextIcon,
      showCancelButton: true,
      confirmButtonColor: message?.confirmButtonColor,
      cancelButtonColor: '#d33',
      confirmButtonText: message?.confirmButtonText,
    });

    if (result.isConfirmed) {
    
    setSubmitLoading(true);

    const validationErrors = validateFormData();
    setFormValidationErrors(validationErrors);

    // Use validationErrors directly here
    if (Object.keys(validationErrors).length === 0) {
      try {
        const response = await authAxios.post(`${baseURL}/${apiEndPoint}/`, formData);
        if (response.data.success === true) {
          console.log(response.data);
          ShowToast('success', message?.success_message);
          navigate(`/${redirectURL}`);
          fetchData()
          if(message?.success_message === 'Successfully Deleted'){
            setFormData({
              head_label: '',
              p_id: null,
              p_account_name: "",
              p_parent_id: null,
              p_is_active: false,
            });
            setSelectedParentName(null);
          }


          if(hndaleCreateFormClose){
            hndaleCreateFormClose()
          }
          // setModalOpen(false);
          console.log('formData',formData)
        }
      } catch (error) {
        if(error.response.data.detail){
          ShowToast('error', `${error.response.data.detail}`)
          setErrorMessage(error.response.data.detail);

        }else if(error.response.data.message){
          ShowToast('error', `${error.response.data.message}`)
          setErrorMessage(error.response.data.message);

        }else if(error.response.data.error){
          ShowToast('error', `${error.response.data.error}`)
          setErrorMessage(error.response.data.error);

        }else if(error.response.data.errors){
          ShowToast('error', `${error.response.data.errors}`)
          setErrorMessage(error.response.data.errors);

        }else{
          console.log(error);
          setErrorMessage(error.response);
          ShowToast('error', 'Something went wrong');
        }

      } finally {
        setSubmitLoading(false);
      }
    } else {
      console.log("Form validation failed", validationErrors);
      setSubmitLoading(false);
    }
  };
};


  return { submitLoading, errorMessage, formValidationErrors, handleSubmit };
};

export default CoaFormSubmitHandler;
