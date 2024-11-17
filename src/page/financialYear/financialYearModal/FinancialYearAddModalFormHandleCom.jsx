import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
//import { authAxiosWithBearer, baseURL } from '../../../../../baseURL';
//import ShowToast from '../../../../../Components/ShowToast';
import { authAxios, baseURL } from '../../../baseURL';
import ShowToast from '../../../components/Form/ShowToast';
import Swal from 'sweetalert2';


const FinancialYearAddModalFormHandleCom = ({
  id,
  ActionURL,
  redirectURL,
  setModalOpen,
  fetchDetailsData,
}) => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false)

  const [formData, setFormData] = useState({
    financial_year: '',
    start_date: '',
    end_date: '',
    status: '',
  })
   const jwtToken = localStorage.getItem('token');

   // fetchSingleFinancialYearData
    useEffect(() => {
      const fetchSingleFinancialData = async () => {
        try {
          setLoading(true);
          const response = await authAxios.get(`${baseURL}/drf-finance/financial-years/${id}/`);
  
          const responseData = response?.data;

          //console.log('responsePermissions', responseData.user_permissions);
          console.log('responseData', responseData);
          setFormData(responseData)
          console.log('formData', formData);
  
        } catch (error) {
          setLoading(false);
          console.log(error);
        }
        finally {
          setLoading(false);
          //setGetLoading(false)
        }
      };
  
      fetchSingleFinancialData();
    }, [id, jwtToken]);
   
  



  const [inputErrorList, setInputErrorList] = useState({});


  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    //let inputValue = value;
    let inputValue = type === 'checkbox' ? checked : value;

    setFormData({
      ...formData,
      [name]: inputValue
    });
  };


  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true)
      //alert(id);
      // if(id !== null){
      //   const response = await authAxios.put(`${baseURL}drf-finance/financial-years/${id}/`, formData);
      // }else{
      //   const response = await authAxios.post(`${baseURL}drf-finance/financial-years/`, formData);
      // }

      const response = id? await authAxios.put(`${baseURL}/drf-finance/financial-years/${id}/`, formData) : await authAxios.post(`${baseURL}/drf-finance/financial-years/`, formData);
      
      if (response) {
        console.log(response);
        setModalOpen(false)
        ShowToast('success', 'Successfully Submit');
        fetchDetailsData()
        navigate(`/financial-years/`);
      }
    } catch (error) {
      console.log(error);
      if (error?.response?.data) {
        setInputErrorList(error?.response?.data);
        //console.log('err',error.response.data.error)
        //ShowToast('error', `${error.response.data.end_date}`);
        ShowToast('error', `${error?.response?.data}`);
      }
      else {
        ShowToast('error', 'Something is wrong');
      }
    }
    finally {
      setLoading(false)
    }
  };

  return {
    formData,
    setFormData,
    loading,
    handleInputChange,
    handleSubmit,
    inputErrorList,
  }
}

export default FinancialYearAddModalFormHandleCom;