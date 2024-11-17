import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { authAxios, baseURL } from '../baseURL';
import ShowToast from './ShowToast';

const FormSubmitHandler = ({
  apiEndPont, 
  formData, 
  validateFormData,
  redirectURL,
}) => {

  const navigate = useNavigate();
  const [submitLoading,setSubmitLoading] = useState(false)
  const [formValidationErrors, setFormValidationErrors] = useState({});
  const [errorMessage, setErrorMessage] = useState({});

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitLoading(true)

    const validationErrors = validateFormData();
    setFormValidationErrors(validationErrors);
  

    if (Object.keys(formValidationErrors).length === 0) {
      // No validation errors, proceed with form submission
      console.log("Form data is valid, submit the form");
      // Submit your form here
    } else {
      // There are validation errors
      console.log("Form validation failed", formValidationErrors);
      // Handle the errors (e.g., display error messages in the UI)
    }

    try {
        const response = await authAxios.post(`${baseURL}/${apiEndPont}/`, formData);
        if (response) {
            console.log(response);
            ShowToast('success', 'Successfully Submit');
            navigate(`/${redirectURL}`);
        }
    } catch (error) {
        console.log(error);
        setErrorMessage(error.response)
        ShowToast('error', 'Something went wrong');
    }finally{
        setSubmitLoading(false)
    }
};

  return { submitLoading, errorMessage, formValidationErrors, handleSubmit };
};

export default FormSubmitHandler;
