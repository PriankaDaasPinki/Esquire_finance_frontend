import React, { useEffect, useState } from 'react'
import AddPageFormTitle from '../../Components/Form/FormPageTitle'
import InputFiled from '../../Components/Form/InputFiled'
import ShowToast from '../../Components/ShowToast'
import { authAxios, authAxiosWithBearer, authAxiosWithBearerWithContentTypeXwwwformUrlencoded, baseURL } from '../../baseURL'
import { useNavigate, useParams } from 'react-router-dom'
import InputFile from '../../Components/Form/InputFile'
import Checkbox from '../../Components/Form/Checkbox'
import SelectInput from '../../Components/Form/SelectInput'
import Swal from 'sweetalert2';
import { MdLockReset } from "react-icons/md";
import LoadingSpinner from '../../Components/LoadingSpinner'

function UserEdit() {
    const navigate = useNavigate();
    const {id} = useParams()
    const jwtToken = localStorage.getItem('token')

    const [loading, setLoading] = useState(false);
    const [getLoading, setGetLoading] = useState(true);
    const [companyOptions, setCompanyOptions] = useState([])
    const [selectedCompany, setSelectedCompany] = useState(null);

    const [departmentOptions, setDepartmentOptions] = useState([])
    const [selectedDepartment, setSelectedDepartment] = useState(null);

    const [designationOptions, setDesignationOptions] = useState([])
    const [selectedDesignation, setSelectedDesignation] = useState(null);

    const [reportingOptions, setReportingOptions] = useState([])
    const [selectedReporting, setSelectedReporting] = useState(null);

    const [roleOptions, setRoleOptions] = useState([])
    const [selectedRole, setSelectedRole] = useState(null);
  
    const [primaryRoleOptions, setPrimaryRoleOptions] = useState([])
    const [selectedPrimaryRole, setSelectedPrimaryRole] = useState(null);

    const [districtOptions, setDistrictOptions] = useState([])
    const [selectedDistrict, setSelectedDistrict] = useState(null);
  
    const [secondaryCompanyOptions, setSecondaryCompanyOptions] = useState([]); 
    const [selectedSecondaryCompany, setSelectedSecondaryCompany] = useState(null); 

    const [formData, setFormData] = useState({
        name: '',
        employee_id: '',
        email: '',
        photo: '',
        signature:'',
        company : '',
        department : '',
        designation : '',
        phone_no:'',
        district:'',
        reporting_to : '',
        primary_role:1,
        role:[],
        secondary_company:[],
        status: false,
        is_department_head: false
      });
    const [currentPhoto,setCurrentPhoto] = useState([])
    const [currentSignature,setCurrentSignature] = useState([])
    const [errorMessage,setErrorMessage] = useState('')
    const [userSearchInputValue,setUserSearchInputValue]=useState(null)

    // fetchSingleUserData
    useEffect(() => {
      const fetchSingleUserData = async () => {
        try {
          const response = await authAxiosWithBearer.get(`${baseURL}/api/user/${id}/`);
    
          const responseData = response.data;
          console.log('responseData', responseData);
    
          setSelectedCompany(responseData.company_id ? {
            value: responseData.company_id,
            label: responseData.company,
          } : null);
    
          setSelectedDepartment(responseData.department_id ? {
            value: responseData.department_id,
            label: responseData.department,
          } : null);
    
          setSelectedDesignation(responseData.designation_id ? {
            value: responseData.designation_id,
            label: responseData.designation,
          } : null);

          setSelectedDistrict(responseData.district ? {
            value: responseData.district,
            label: responseData.district_text,
          } : null);
    
          setSelectedReporting(responseData.reporting_to ? {
            value: responseData.reporting_to,
            label: responseData.reporting_to_name,
          } : null);
    
          setSelectedPrimaryRole(responseData.primary_role ? {
            value: responseData.primary_role,
            label: responseData.primary_role_name,
          } : null);
    
          const roleData = responseData.role_ids?.map((roleId, index) => ({
            value: roleId,
            label: responseData.role[index],
          }));
          setSelectedRole(roleData);
    
          const secondaryCompany = responseData.secondary_company?.map((companyID, index) => ({
            value: companyID,
            label: responseData.secondary_company_names[index],
          }));
          setSelectedSecondaryCompany(secondaryCompany);
    
          setCurrentPhoto(responseData.photo);
          setCurrentSignature(responseData.signature);
    
          const {
            name,
            employee_id,
            email,
            status,
            phone_no,
            is_department_head,
          } = responseData;
    
          // Update formData with the fetched user data
          setFormData({
            name,
            employee_id,
            email,
            status,
            phone_no,
            is_department_head,
          });
        } catch (error) {
          console.log(error);
        }
        finally{
          setGetLoading(false)
        }
      };
    
      fetchSingleUserData();
    }, [id, jwtToken]);
    


  
    // fetchCompanyData
    useEffect(() => {
      const fetchCompanyData = async () => {
          try {
          const response = await authAxiosWithBearer.get(`${baseURL}/api/company_list/`);
          setSecondaryCompanyOptions(
                  response.data.map((company) => ({
                  value: company.id,
                  label: company.name,
                  }))
              );
          } catch (error) {
              console.log(error)
          }
      };
      fetchCompanyData();
  }, []); 

  // fetchPrimaryRoleData
    useEffect(() => {
      const fetchPrimaryRoleData = async () => {
        try {
          const response = await authAxiosWithBearer.get(`${baseURL}/api/role/`);
          const options = Object.entries(response.data).map(([value, label]) => ({
            value: parseInt(value),
            label,
          }));
          setPrimaryRoleOptions(options);
        } catch (error) {
          console.log(error);
        }
      };
    
      fetchPrimaryRoleData();
    }, []);

    // fetchRoleData
    useEffect(() => {
      const fetchRoleData = async () => {
        try {
          const response = await authAxiosWithBearer.get(`${baseURL}/api/role/`);
          const options = Object.entries(response.data).map(([value, label]) => ({
            value: parseInt(value),
            label,
          }));
          setRoleOptions(options);
        } catch (error) {
          console.log(error);
        }
      };
    
      fetchRoleData();
    }, []);



    // fetchReportingData
    useEffect(() => {
      authAxiosWithBearer.get(`${baseURL}/api/user-list/?search=${userSearchInputValue}`)
          .then(response => {
              setReportingOptions(
                response.data.results.map((user) => ({
                value: user.id,
                label: `${user.name} | ${user.employee_id}`,
                }))
            );
          })
          .catch(error => {
              console.error('Error fetching data:', error);
          });
      }, [userSearchInputValue]);

    const handleUserSearchInputChange = (value) => {
      setUserSearchInputValue(value);
    };




    // fetchCompanyData
    useEffect(() => {
        const fetchCompanyData = async () => {
            try {
            const response = await authAxiosWithBearer.get(`${baseURL}/api/company_list/`);
            setCompanyOptions(
                    response.data.map((company) => ({
                    value: company.id,
                    label: company.name,
                    }))
                );
            } catch (error) {
                console.log(error)
            }
        };
        fetchCompanyData();
    }, []); 

    // fetchDepartmentData
    useEffect(() => {
      const fetchDepartmentData = async () => {
          try {
          const response = await authAxiosWithBearer.get(`${baseURL}/api/department_list/`);
          console.log(response)
          setDepartmentOptions(
                  response.data.map((dp) => ({
                  value: dp.id,
                  label: dp.name,
                  }))
              );
          } catch (error) {
              console.log(error)
          }
      };
      fetchDepartmentData();
    }, []); 


    // fetchDesignationData
    useEffect(() => {
      const fetchDesignationData = async () => {
          try {
          const response = await authAxiosWithBearer.get(`${baseURL}/api/designation_list/`);
          console.log(response)
          setDesignationOptions(
                  response.data.map((dp) => ({
                  value: dp.id,
                  label: dp.name,
                  }))
              );
          } catch (error) {
              console.log(error)
          }
      };
      fetchDesignationData();
    }, []); 



      // district 
      useEffect(() => {
        const fetchDistrictData = async () => {
            try {
            const response = await authAxiosWithBearer.get(`${baseURL}/api/get_district/`);
            // console.log(response)
            setDistrictOptions( response.data.map((data) => ({
                value: data.id,
                label: data.name,
            })));

            } catch (error) {
                console.log(error)
            }
        };
        fetchDistrictData();
      }, []);


      const handleDistrictChange = (selectedOption) => {
        const districtId = selectedOption ? selectedOption.value : ''; 
        setSelectedDistrict(selectedOption);
        setFormData({
          ...formData,
          district: districtId,
        });
      };

    const handleChange = (e) => {
      const { name, value, type, checked, files } = e.target;
    
      let inputValue = value;
    
      if (name === 'phone_no') {
        // Remove non-numeric characters and limit to 11 digits
        inputValue = value.replace(/\D/g, '').slice(0, 11);
    
        // Ensure the phone number starts with "01"
        if (inputValue.length >= 2 && inputValue.slice(0, 2) !== '01') {
          // If it doesn't start with "01," prepend it
          inputValue = '01' + inputValue.slice(2);
        }
      } else if (type === 'checkbox') {
        inputValue = checked;
      } else if (type === 'file') {
        inputValue = files[0];
      }
    
      setFormData((prevFormData) => ({
        ...prevFormData,
        [name]: inputValue,
      }));
    };
    

    const handleRoleChange = (selectedOptions) => {
      const roleIDs = selectedOptions ? selectedOptions.map((option) => option.value.toString()) : [];
      setSelectedRole(selectedOptions);
      setFormData({
        ...formData,
        role: roleIDs,
      });
    };

    const handleSecondaryCompanyChange = (selectedOptions) => {
      const secondaryCompanyIDs = selectedOptions ? selectedOptions.map((option) => option.value.toString()) : [];
      setSelectedSecondaryCompany(selectedOptions)
      setFormData({
        ...formData,
        secondary_company: secondaryCompanyIDs,
      });
    };

    const handlePrimaryRoleChange = (selectedOption) => {
      const primary_role = selectedOption ? selectedOption.value : 1;
      setSelectedPrimaryRole(selectedOption);
      setFormData({
        ...formData,
        primary_role: primary_role,
      });
    };

    const handleReportingChange = (selectedOption) => {
      const reportingtoId = selectedOption ? selectedOption.value : '';
      setSelectedReporting(selectedOption);
      setFormData({
        ...formData,
        reporting_to: reportingtoId,
      });
    };

    const handleComapnyChange = (selectedOption) => {
      const companyID = selectedOption ? selectedOption.value : '';
      setSelectedCompany(selectedOption);
      setFormData({
        ...formData,
        company: companyID,
      });
    };

    const handleDepartmentChange = (selectedOption) => {
      const departmentID = selectedOption ? selectedOption.value : ''; 
      setSelectedDepartment(selectedOption);
      setFormData({
        ...formData,
        department: departmentID,
      });
    };

    const handleDesignationChange = (selectedOption) => {
      const designationID = selectedOption ? selectedOption.value : ''; 
      setSelectedDesignation(selectedOption);
      setFormData({
        ...formData,
        designation: designationID,
      });
    };

    const handleSubmit = async (e) => {
      e.preventDefault();
      try {
        setLoading(true);
  
        const formDataWithFile = new FormData();
  
        for (const key in formData) {
          if (key === 'role' || key === 'secondary_company') {
            formData[key].forEach((id) => {
              formDataWithFile.append(key, id);
            });
          } else {
            formDataWithFile.append(key, formData[key]);
          }
        }
  
        console.log('formDataWithFile:', formDataWithFile);
  
        const response = await authAxiosWithBearerWithContentTypeXwwwformUrlencoded.put(`${baseURL}/api/user_list/${id}/`, formDataWithFile);
        if (response) {
          console.log(response);
          navigate('/user-list');
          ShowToast('success', 'Successfully Updated');
        }
      } catch (error) {
        if(error.response.data){
          setErrorMessage(error.response.data)
          if(error.response.data.employee_id){
            ShowToast('error', `${error.response.data.employee_id}`)
          }
        }else{
          console.log(error);
          ShowToast('error', 'Something is wrong');
        }
      } finally {
        setLoading(false);
      }
    };


    const handlePasswordReset = async (userId) => {
      const result = await Swal.fire({
        title: 'Confirm Reset',
        text: 'Are you sure you want to reset the password??',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#d33',
        cancelButtonColor: '#3085d6',
        confirmButtonText: 'Yes, reset it!',
      });
    
      if (result.isConfirmed) {
        try {
          const response = await authAxiosWithBearer.put(`${baseURL}/api/password_reset/${userId}/`);
    
          if (response.status === 200) {
            Swal.fire('Password Reset!', `Password reset Successfully`, 'success');
            console.log(response.data);
          } else {
            console.log(response);
            Swal.fire('Error', 'An error occurred while resetting the password.', 'error');
          }
        } catch (error) {
          console.error(error);
          Swal.fire('Error', 'An error occurred while resetting the password.', 'error');
        }
      }
    };


  if (getLoading) {
    return <div><LoadingSpinner /></div>;
  }

  return (
    <div className='bg-[#fff] shadow-xl p-3 my-4 rounded-[5px]'>



        <AddPageFormTitle title='User Information Update Form' FormPageRightSideButtonURL='/user-list' LinkName='Close' />

            <form onSubmit={handleSubmit}>
             <div className="grid grid-cols-2 lg:grid-cols-3">
                <div className='my-4'>
                    <InputFiled type='text' value={formData.name} onChange={handleChange} name='name' id='name'  label='User Name *' isRequired={true} placeholder='Enter user name'  />
                </div>
                <div className='my-4'>
                    <InputFiled type='text' value={formData.employee_id} onChange={handleChange} name='employee_id' id='employee_id' label='Employee ID *' isRequired={true} placeholder='Enter employee id'  />
                    {errorMessage?.employee_id && (
                        <p className='text-red-500'>{errorMessage.employee_id}</p>
                    )}
                </div>
                {/* <div className='my-4'>
                    <InputFiled type='text' value={formData.password} onChange={handleChange} name='password' id='password' label='User password *' isRequired={true} placeholder='Enter password'/>
                </div> */}
                <div className="my-4">
                    <InputFiled type='text' 
                      value={formData.phone_no} onChange={handleChange}
                      name='phone_no' id='phone_no' label='Phone Number'
                      isRequired={false} placeholder='Enter phone no'
                      minlength='11'
                      maxLength='11'
                    />
                  </div> 
                <div className='my-4'>
                    <InputFiled type='email' value={formData.email} onChange={handleChange} name='email' id='email' label='Email' isRequired={false} placeholder='Enter email'  />
                </div>
                <div className='my-4'> 
                <InputFile type='file' className='py-1' onChange={handleChange} name='photo' id='photo' label='Photo' isRequired={false} placeholder='Select photo'/>
                      {currentPhoto && <img src={`${baseURL}/static${currentPhoto}`} alt="Phone" className='w-[30px]' />}
                </div>
                <div className='my-4'>  
                    <InputFile  type='file'  className='py-1'  onChange={handleChange}  name='signature'  id='signature'  label='Signature'  isRequired={false}  placeholder='Select signature'/>
                    {currentSignature && <img src={`${baseURL}/static${currentSignature}`} alt=" Signature" className='w-[30px]' />}
                </div>


                <div className='my-4'>  
                  <SelectInput
                          name='district'  
                          id='district'  
                          label='District'
                          value={selectedDistrict}
                          onChange={handleDistrictChange}
                          options={districtOptions}
                          isRequired={false} 
                      />
                  </div>
          
          
                <div className='my-4'>  
                <SelectInput
                        name='company'  
                        id='company'  
                        label='Company'
                        value={selectedCompany}
                        onChange={handleComapnyChange}
                        options={companyOptions}
                        isRequired={false} 
                        isClearable={true}
                    />
                </div>

                <div className='my-4'>  
                <SelectInput
                        name='department'  
                        id='department'  
                        label='Department'
                        value={selectedDepartment}
                        onChange={handleDepartmentChange}
                        options={departmentOptions}
                        isRequired={false} 
                        isClearable={true}
                    />
                </div>
                <div className='my-4'>  
                <SelectInput
                        name='designation'  
                        id='designation'  
                        label='Designation'
                        value={selectedDesignation}
                        onChange={handleDesignationChange}
                        options={designationOptions}
                        isRequired={false} 
                        isClearable={true}
                    />
                </div>

                <div className='my-4'>  
                <SelectInput
                        name='reporting_to'  
                        id='reporting_to'  
                        label='Reporting To'
                        value={selectedReporting}
                        onInputChange={handleUserSearchInputChange}
                        onChange={handleReportingChange}
                        options={reportingOptions}
                        isRequired={false} 
                        isClearable={true}
                    />
                </div>

                <div className="my-4">
                  <SelectInput
                          name='primary_role'  
                          id='primary_role'  
                          label='Primary Role'
                          value={selectedPrimaryRole}
                          onChange={handlePrimaryRoleChange}
                          options={primaryRoleOptions}
                          isRequired={false} 
                          isClearable={true}
                      />
                </div>

                <div className='my-4'>  
                <SelectInput
                        name='role' 
                        id='role'  
                        label='Role'
                        value={selectedRole}
                        onChange={handleRoleChange}
                        options={roleOptions}
                        isRequired={false}
                        isMulti={true}
                        isClearable={true}
                    />
                </div>

                <div className='my-4'>
                  <SelectInput
                    name='secondary_company'
                    id='secondary_company'
                    label='Secondary Company'
                    value={selectedSecondaryCompany}
                    onChange={handleSecondaryCompanyChange}
                    options={secondaryCompanyOptions}
                    isRequired={false}
                    isMulti={true}
                    isClearable={true}
                  />
                </div>

                <div className="my-4">
                  <div className="flex justify-between mx-7">    
                  
                  {selectedDepartment &&(            
                  <div className=''>
                      <Checkbox type='checkbox'  checked={formData.is_department_head} onChange={handleChange} name='is_department_head' id='is_department_head' label='Department_head' isRequired={false} placeholder='is_department_head'
                      />
                  </div>
                  )}

                  <div className=''>
                      <Checkbox type='checkbox'  checked={formData.status} onChange={handleChange} name='status' id='status' label='Active Status' isRequired={false} placeholder='status'
                      />
                  </div>
            </div>
                </div>

             </div>


              
            <div className='flex'>
                <div className='mx-2'>
                    <button type='submit' className='bg-[#FA6669] text-[#fff] rounded-[5px] px-4 py-1'>{loading ? 'Submitting...' : 'Submit'}</button>

                </div>
                <div className='mx-2'>
                  <button type='button' className='flex text-[#ffffff] bg-[#ff4747] rounded-[5px]  px-4 py-1 shadow' onClick={() => handlePasswordReset(id)}>
                      Password Reset <MdLockReset className='text-[25px] text-[#ffffff] ml-2' />
                  </button>
                </div>
            </div>
            </form>


    </div>
  )
}

export default UserEdit