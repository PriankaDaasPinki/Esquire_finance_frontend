import { useState, useEffect } from 'react';
import { authAxios, baseURL } from '../baseURL';
import ShowToast from '../components/ShowToast';

const useFetchListData = (endpoint, { page, search, status, start_date, end_date, username, employee_id }) => {
  const [data, setData] = useState(null);
  const [totalItems, setTotalItems] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchData = async () => {
    setIsLoading(true);
    try {
      const response = await authAxios.get(`${baseURL}/${endpoint}`, {
        params: { page, search, status, start_date, end_date, username, employee_id },
      });
      // console.log(response)
      const { results, count } = response.data;
      setTotalItems(count);
      setData(results);
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
  }, [endpoint, page, search, status, start_date, end_date, username, employee_id]);

  return { data, totalItems, isLoading, error, fetchData };
};

export default useFetchListData;
