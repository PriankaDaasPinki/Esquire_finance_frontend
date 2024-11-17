import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { authAxios, baseURL } from '../baseURL';
import ShowToast from './ShowToast';

const FormSubmitHandler = ({
  apiEndPoint, 
  formData, 
  validateFormData,
  redirectURL,
  setModalOpen,
  fetchData,
}) => {

  const navigate = useNavigate();
  const [submitLoading,setSubmitLoading] = useState(false)
  const [formValidationErrors, setFormValidationErrors] = useState({});
  const [errorMessage, setErrorMessage] = useState({});

  console.log('formValidationErrors--tt',formValidationErrors)


  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitLoading(true);

    const validationErrors = validateFormData();
    setFormValidationErrors(validationErrors);

    // Use validationErrors directly here
    if (Object.keys(validationErrors).length === 0) {
      try {
        const response = await authAxios.post(`${baseURL}/${apiEndPoint}/`, formData);
        if (response) {
          console.log(response);
          ShowToast('success', 'Successfully Submitted');
          navigate(`/${redirectURL}`);
          fetchData()
          setModalOpen(false);
        }
      } catch (error) {
        console.log(error);
        setErrorMessage(error.response);
        ShowToast('error', 'Something went wrong');
      } finally {
        setSubmitLoading(false);
      }
    } else {
      console.log("Form validation failed", validationErrors);
      setSubmitLoading(false);
    }
  };


  return { submitLoading, errorMessage, formValidationErrors, handleSubmit };
};

export default FormSubmitHandler;
