import { useState, useEffect } from 'react';
import { authAxios, baseURL } from '../baseURL';
import ShowToast from '../components/ShowToast';

const useFetchDetailsData = (endpoint, { id }) => {
  const [detailsData, setDetailsData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchDetailsData = async () => {
    try {
        const response = await authAxios.get(`${baseURL}/${endpoint}/${id}/`);
        setDetailsData(response.data)
    } catch (error) {
      if(error.response.data.detail){
        ShowToast('error',`${error.response.data.detail}`)
        setError(error.response.data.detail);
      }else{
        ShowToast('error',`${error}`)
        setError(error);
      }
    }
    finally{
      setLoading(false)
    }
};

useEffect(() => {
  fetchDetailsData();
}, [id]); 

  return { detailsData, loading, error, fetchDetailsData };
};

export default useFetchDetailsData;
