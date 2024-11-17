import React, { useState } from 'react';
//import { authAxiosWithBearer, baseURL } from '../../../baseURL';
import ShowToast from '../../components/Form/ShowToast'
import { useNavigate } from 'react-router-dom';
import { authAxios, baseURL } from '../../baseURL';
import SectionTitle from '../../components/Form/SectionTitle';
import PasswordFiledSM100 from '../../components/Form/PasswordFiledSM100';
 
const PasswordChange = () => {
  const [formData, setFormData] = useState({
    old_password: '',
    new_password: ''
  });
  const [loading, setLoading] = useState(false);
  const [showError, setShowError] = useState(false);
  const navigate = useNavigate()
 
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
    setShowError('')
  };
 
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true)
    try {
      const response = await authAxios.put(`${baseURL}drf-finance/update-password/`,formData);
      console.log(response.data);
      setLoading(false)
      ShowToast('success',`Your Password Successfully Changed`)
      navigate('/')
    } catch (error) {
      console.error(error);
      setShowError(`${error.response.data.non_field_errors}`)
      ShowToast('error',`${error.response.data.non_field_errors}`)
      setLoading(false)
    }
  };
 
 
 
  return (
    <div className='flex justify-center '>
        <form onSubmit={handleSubmit} className='w-[100%] md:w-[370px] shadow-lg p-5 m-2'>
           
            <div className='pb-3 border-b'>
                <SectionTitle title='Password Change Form' />
                {showError && (
                  <p className='text-center text-red-600 mt-2'>{showError}</p>
                )}
            </div>
 
           
        <div className='my-8'>
            <PasswordFiledSM100 type='password' value={formData.old_password}
                onChange={handleChange} name='old_password' id='old_password'
                label='Old  Password *' isRequired={true}
                placeholder='Enter password'
            />
        </div>
 
        <div className='my-8'>
            <PasswordFiledSM100 type='password' value={formData.new_password}
                onChange={handleChange} name='new_password' id='new_password'
                label='New password *' isRequired={true}
                placeholder='Enter password'
                />
        </div>
 
        <div className="my-5">
        {loading?
            <button disabled className='bg-[#FA6669] text-[#fff] rounded-[5px] px-4 py-1'>
                Changing..
            </button>
            :
            <button type='submit' className='bg-[#FA6669] text-[#fff] rounded-[5px] px-4 py-1'>Change</button>
        }
        </div>
 
        </form>
    </div>
  );
};
 
export default PasswordChange;