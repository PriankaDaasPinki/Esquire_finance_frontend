import { useState, useEffect } from 'react';
import { authAxios, baseURL } from '../baseURL';
import ShowToast from '../components/ShowToast';

const useFetchListDataWOPagination = (endpoint,{search, status, start_date, end_date}) => {
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchData = async () => {
    setIsLoading(true);
    try {
      // const response = await authAxios.get(`${baseURL}/${endpoint}`);

      const response = await authAxios.get(`${baseURL}/${endpoint}`, {
        params: { search, status, start_date, end_date },
      });

      console.log(`${endpoint}`,response)
      setData(response.data);
    } catch (error) {
      if(error.response.data.detail){
        ShowToast('error',`${error.response.data.detail}`)
        setError(error.response.data.detail);
      }else{
        ShowToast('error',`${error}`)
        setError(error);
      }
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  },[endpoint, search, status, start_date, end_date]);

  return { data, setData, isLoading, setIsLoading, error, fetchData };
};

export default useFetchListDataWOPagination;


