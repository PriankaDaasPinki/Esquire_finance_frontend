import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { authAxiosWithBearer, baseURL } from '../../../../../baseURL';
import ShowToast from '../../../../../Components/ShowToast';

const TransportedProductRcvStatusFormHandleCom = ({
  id,
  ActionURL,
  redirectURL,
  setModalOpen,
  fetchDetailsData,
}) => {
    const navigate = useNavigate();
    const [loading,setLoading] = useState(false)

    const [formData,setFormData] = useState({
      product_received_with : '',
      product_received_without : '',
      product_received_note : '',
    })



  const handleInputChange = (e) => {
      const { name, value } = e.target;
      let inputValue = value;

      setFormData({
          ...formData,
          [name]: inputValue
      });
  };


  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true)
      const response = await authAxiosWithBearer.put(`${baseURL}/${ActionURL}/${id}/`, formData);

      if (response) {
        console.log(response);
        setModalOpen(false)
        ShowToast('success', 'Successfully Submit');
        fetchDetailsData()
        navigate(`/${redirectURL}/${id}`);
      }
    } catch (error) {
      console.log(error);
      if(error.response.data.error){
        ShowToast('error', `${error.response.data.error}`);
      }else{
        ShowToast('error', 'Something is wrong');
      }
    }
    finally{
      setLoading(false)
    }
  };
    

  return {
    formData,
    setFormData,
    loading,
    handleInputChange,
    handleSubmit,
  }
}

export default TransportedProductRcvStatusFormHandleCom