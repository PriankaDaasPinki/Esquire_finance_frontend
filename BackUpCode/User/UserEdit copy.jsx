import React, { useEffect, useState } from 'react';
import AddPageFormTitle from '../../components/Form/FormPageTitle';
import InputFiled from '../../components/Form/InputFiled';
import ShowToast from '../../components/ShowToast';
import { authAxios, baseURL } from '../../baseURL';
import { useNavigate, useParams } from 'react-router-dom';
import InputFiledWC from '../../components/FormWithoutClass/InputFiledWC';
import SelectInputWC from '../../components/FormWithoutClass/SelectInputWC';
import Checkbox from '../../components/Form/Checkbox';
import PasswordFiled from '../../components/Form/PasswordFiled';
import InputFile from '../../components/Form/InputFile';
import Swal from 'sweetalert2';
import LoadingSpinner from '../../components/LoadingSpinner';
import { MdLockReset } from "react-icons/md";
import CheckboxPermissionModel from '../../components/Form/CheckboxPermissionModel';
import CheckboxPermissions from '../../components/Form/CheckboxPermissions';
import SelectMultipleInput from '../../components/FormWithoutClass/SelectMultipleInput';
import usePermissions from '../../hooks/usePermissions';

function UserEdit() {
  const navigate = useNavigate();
  const { id } = useParams()
  const jwtToken = localStorage.getItem('token');
  const { hasPermission } = usePermissions();

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

  const [secondaryRoleOptions, setSecondaryRoleOptions] = useState([])
  const [selectedSecondaryRole, setSelectedSecondaryRole] = useState(null);

  const [secondaryCompanyOptions, setSecondaryCompanyOptions] = useState([]);
  const [selectedSecondaryCompany, setSelectedSecondaryCompany] = useState(null);

  const [helpdeskRoleOptions] = useState([
    { value: '1', label: 'Issuer' },
    { value: '2', label: 'Resolver' },
    { value: '3', label: 'Manager' },
    { value: '4', label: 'Department Head' },
  ]);
  const [selectedHelpdeskRole, setSelectedHelpdeskRole] = useState(null);

  const [permissions, setPermissions] = useState([]);

  const [formData, setFormData] = useState({
    username: '',
    password: '',
    first_name: '',
    last_name: '',
    is_superuser: false,
    is_active: false,
    user_permissions: [],

    user_profile: {
      employee_id: '',
      company: null,
      secondary_company: [],
      department: null,
      designation: null,
      role: null,
      secondary_role: [],
      helpdesk_role: '',
      is_department_head: false,
      reporting_to: null,
      image: null,
    },
  });
  const [currentPhoto, setCurrentPhoto] = useState([])
  const [errorMessage, setErrorMessage] = useState('')

  // fetchSingleUserData
  useEffect(() => {
    const fetchSingleUserData = async () => {
      try {
        const response = await authAxios.get(`${baseURL}drf-finance/users/${id}/`);

        const responseData = response.data;


        console.log('responsePermissions', responseData.user_permissions);
        console.log('responseData', responseData);
        setFormData(responseData)
        console.log('formData', formData);

        console.log('responseData.user_profile.company.id', responseData.user_profile.company.id)

        setSelectedCompany(responseData.user_profile.company ? {
          value: responseData.user_profile.company.id,
          label: responseData.user_profile.company.name,
        } : null);

        handleSelectChange('company', responseData.user_profile.company.id);

        setSelectedSecondaryCompany(
          responseData.user_profile.secondary_company
            ? responseData.user_profile.secondary_company.map(company => ({
              value: company.id,
              label: company.name,
            }))
            : []
        );
        handleSelectChange('secondary_company', responseData.user_profile.secondary_company.map(company => company.id));

        setSelectedDepartment(responseData.user_profile.department ? {
          value: responseData.user_profile.department.id,
          label: responseData.user_profile.department.name,
        } : null);
        handleSelectChange('department', responseData.user_profile.department.id);


        setSelectedDesignation(responseData.user_profile.designation ? {
          value: responseData.user_profile.designation.id,
          label: responseData.user_profile.designation.name,
        } : null);
        handleSelectChange('designation', responseData.user_profile.designation.id);


        setSelectedReporting(responseData.user_profile.reporting_to ? {
          value: responseData.user_profile.reporting_to.id,
          label: responseData.user_profile.reporting_to.first_name + " " + responseData.user_profile.reporting_to.last_name,
        } : null);
        handleSelectChange('reporting_to', responseData.user_profile.reporting_to.id);


        setSelectedRole(responseData.user_profile.role ? {
          value: responseData.user_profile.role.id,
          label: responseData.user_profile.role.name,
        } : null);
        handleSelectChange('role', responseData.user_profile.role.id);

        setSelectedSecondaryRole(
          responseData.user_profile.secondary_role
            ? responseData.user_profile.secondary_role.map(secondaryRole => ({
              value: secondaryRole.id,
              label: secondaryRole.name,
            }))
            : []
        );
        handleSelectChange('secondary_role', responseData.user_profile.secondary_role.map(secondary_role => secondary_role.id));

        setSelectedHelpdeskRole(
          responseData.user_profile.helpdesk_role
            ? responseData.user_profile.helpdesk_role === '1'
              ? { value: '1', label: 'Issuer' }
              : responseData.user_profile.helpdesk_role === '2'
                ? { value: '2', label: 'Resolver' }
                : responseData.user_profile.helpdesk_role === '3'
                  ? { value: '3', label: 'Manager' }
                  : responseData.user_profile.helpdesk_role === '4'
                    ? { value: '4', label: 'Department Head' }
                    : null
            : null
        );
        handleSelectChange('helpdesk_role', responseData.user_profile.helpdesk_role);


        //setCurrentPhoto(responseData.user_profile.image);

        //Set image preview
        if (responseData.user_profile.image) {
          const imageResponse = await fetch(responseData.user_profile.image);
          const imageBlob = await imageResponse.blob();
          const file = new File([imageBlob], "profile.jpg", { type: imageBlob.type });

          const fileInput = document.getElementById('image');
          const dataTransfer = new DataTransfer();
          dataTransfer.items.add(file);
          fileInput.files = dataTransfer.files;

          setCurrentPhoto(responseData.user_profile.image);
        }

        // Set user permissions
        responseData.user_permissions.forEach(permissionId => {
          //console.log(permissionId.id);
          handlePermissionChange(permissionId.id);
        });

      } catch (error) {
        console.log(error);
      }
      finally {
        setGetLoading(false)
      }
    };

    fetchSingleUserData();
  }, [id, jwtToken]);


  // Fetch permissions from API
  useEffect(() => {
    const fetchPermissions = async () => {
      try {
        const response = await authAxios.get(`${baseURL}drf-finance/permissions/`);
        setPermissions(response.data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchPermissions();
  }, []);

  // Grouping permissions by model name
  const groupedPermissions = permissions.reduce((groups, permission) => {
    const model = permission.content_type.model;
    if (!groups[model]) {
      groups[model] = [];
    }
    groups[model].push(permission);
    return groups;
  }, {});

  // fetchCompanyData
  useEffect(() => {
    const fetchCompanyData = async () => {
      try {
        const response = await authAxios.get(`${baseURL}drf-finance/company-short-list/`);
        setCompanyOptions(
          response.data.map((company) => ({
            value: company.id,
            label: company.name,
          }))
        );
        setSecondaryCompanyOptions(
          response.data.map((company) => ({
            value: company.id,
            label: company.name,
          }))
        );
      } catch (error) {
        console.log(error);
      }
    };
    fetchCompanyData();
  }, []);

  // fetchSecondaryRoleData
  useEffect(() => {
    const fetchRoleData = async () => {
      try {
        const response = await authAxios.get(`${baseURL}drf-finance/user-role-short-list/`);
        setRoleOptions(
          response.data.map((role) => ({
            value: role.id,
            label: role.name,
          }))
        );
        setSecondaryRoleOptions(
          response.data.map((role) => ({
            value: role.id,
            label: role.name,
          }))
        );
      } catch (error) {
        console.log(error);
      }
    };
    fetchRoleData();
  }, []);

  //fetch user data
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await authAxios.get(`${baseURL}drf-finance/user-short-list/`);
        setReportingOptions(
          response.data.map((user) => ({
            value: user.id,
            label: `${user.first_name} ${user.last_name}`,
          }))
        );
      } catch (error) {
        console.log(error);
      }
    };
    fetchUserData();
  }, [jwtToken]);


  // fetchDepartmentData
  useEffect(() => {
    const fetchDepartmentData = async () => {
      try {
        const response = await authAxios.get(`${baseURL}drf-finance/department-short-list`);
        setDepartmentOptions(
          response.data.map((dp) => ({
            value: dp.id,
            label: dp.name,
          }))
        );
      } catch (error) {
        console.log(error);
      }
    };
    fetchDepartmentData();
  }, []);

  // fetchDDesignationData
  useEffect(() => {
    const fetchDesignationData = async () => {
      try {
        const response = await authAxios.get(`${baseURL}drf-finance/designation-short-list/`);
        setDesignationOptions(
          response.data.map((dp) => ({
            value: dp.id,
            label: dp.name,
          }))
        );
      } catch (error) {
        console.log(error);
      }
    };
    fetchDesignationData();
  }, []);


  const handleChange = (e) => {
    const { name, value, type, checked, files } = e.target;
    let inputValue = type === 'checkbox' ? checked : type === 'file' ? files[0] : value;

    if (name in formData) {
      setFormData((prevFormData) => ({
        ...prevFormData,
        [name]: inputValue,
      }));
    } else if (name in formData.user_profile) {
      setFormData((prevFormData) => ({
        ...prevFormData,
        user_profile: {
          ...prevFormData.user_profile,
          [name]: inputValue,
        },
      }));
    }
  };

  const handleSelectChange = (name, value) => {
    setFormData((prevFormData) => ({
      ...prevFormData,
      user_profile: {
        ...prevFormData.user_profile,
        [name]: value,
      },
    }));
  };

  const handleCompanyChange = (selectedOption) => {
    const companyID = selectedOption ? selectedOption.value : null;
    setSelectedCompany(selectedOption);
    handleSelectChange('company', companyID);
  };

  const handleSecondaryCompanyChange = (selectedOptions) => {
    const secondaryCompanyIDs = selectedOptions ? selectedOptions.map((option) => option.value.toString()) : [];
    setSelectedSecondaryCompany(selectedOptions);
    handleSelectChange('secondary_company', secondaryCompanyIDs);
  };

  const handleRoleChange = (selectedOption) => {
    const primaryRoleID = selectedOption ? selectedOption.value : null;
    setSelectedRole(selectedOption);
    handleSelectChange('role', primaryRoleID);
  };

  const handleSecondaryRoleChange = (selectedOptions) => {
    const roleIDs = selectedOptions ? selectedOptions.map((option) => option.value.toString()) : [];
    setSelectedSecondaryRole(selectedOptions);
    handleSelectChange('secondary_role', roleIDs);
  };



  const handleReportingChange = (selectedOption) => {
    const reportingToID = selectedOption ? selectedOption.value : null;
    setSelectedReporting(selectedOption);
    handleSelectChange('reporting_to', reportingToID);
  };

  const handleDepartmentChange = (selectedOption) => {
    const departmentID = selectedOption ? selectedOption.value : null;
    setSelectedDepartment(selectedOption);
    handleSelectChange('department', departmentID);
  };

  const handleDesignationChange = (selectedOption) => {
    const designationID = selectedOption ? selectedOption.value : null;
    setSelectedDesignation(selectedOption);
    handleSelectChange('designation', designationID);
  };

  const handlePermissionChange = (permissionId) => {
    const permissionIdInt = parseInt(permissionId, 10); // Convert to integer
    setFormData((prevFormData) => {
      const user_permissions = prevFormData.user_permissions.includes(permissionIdInt)

        ? prevFormData.user_permissions.filter(id => id !== permissionIdInt)
        : [...prevFormData.user_permissions, permissionIdInt];
      //console.log('user_permissions',user_permissions);
      //console.log(prevFormData);

      return { ...prevFormData, user_permissions };
    });
  };

  const handleModelPermissionChange = (model) => {
    const permissionIds = groupedPermissions[model].map(permission => permission.id);
    setFormData((prevFormData) => {
      const allSelected = permissionIds.every(id => prevFormData.user_permissions.includes(id));

      const newPermissions = allSelected
        ? prevFormData.user_permissions.filter(id => !permissionIds.includes(id)) // Unselect all
        : [...prevFormData.user_permissions, ...permissionIds.filter(id => !prevFormData.user_permissions.includes(id))]; // Select all

      return { ...prevFormData, user_permissions: newPermissions };
    });
  };

  // Handle helpdesk role dropdown change
  const handleHelpdeskRoleChange = (selectedOption) => {
    setSelectedHelpdeskRole(selectedOption);
    handleSelectChange('helpdesk_role', selectedOption ? selectedOption.value : '');
  };


  // const handleSubmit = async (e) => {
  //   e.preventDefault();
  //   setLoading(true);

  //   try {
  //     const formDataWithFile = new FormData();
  //     Object.entries(formData).forEach(([key, value]) => {
  //       if (key === 'user_profile') {
  //         Object.entries(value).forEach(([profileKey, profileValue]) => {
  //           if (Array.isArray(profileValue)) {
  //             profileValue.forEach((item) => formDataWithFile.append(`${key}.${profileKey}`, item));
  //           } else {
  //             formDataWithFile.append(`${key}.${profileKey}`, profileValue);
  //           }
  //         });
  //       }
  //       // else if (key === 'user_permissions') {
  //       //   const formattedPermissions = formData.user_permissions.map(permissionId => parseInt(permissionId, 10));
  //       //   //console.log('permission',formattedPermissions);
  //       //   if(formattedPermissions !== NaN){
  //       //     formattedPermissions.forEach(permission => {
  //       //       formDataWithFile.append(key, permission);
  //       //     });
  //       //   }

  //       // }
  //       else if (key === 'user_permissions') {
  //         const formattedPermissions = formData.user_permissions
  //           .map(permissionId => parseInt(permissionId, 10))
  //           .filter(permissionId => Number.isInteger(permissionId)); // Filter out NaN and non-integer values

  //         formattedPermissions.forEach(permission => {
  //           formDataWithFile.append(key, permission);
  //         });
  //       }
  //       else {
  //         // Handle files (like images) separately if they are included in the form data
  //         if (key === 'image' && value instanceof File) {
  //           formDataWithFile.append(key, value);
  //         } else {
  //           formDataWithFile.append(key, value);
  //         }
  //       }
  //     });


  //     console.log('formDataWithFile', formDataWithFile);

  //     const response = await authAxios.put(`${baseURL}drf-finance/users/${id}/`, formDataWithFile, {
  //       headers: {
  //         'Content-Type': 'multipart/form-data',
  //       },
  //     });

  //     if (response) {
  //       navigate('/users');
  //       ShowToast('success', 'Successfully Added');
  //     }
  //   } catch (error) {
  //     if (error.response && error.response.data && typeof error.response.data === 'object') {
  //       setErrorMessage(error.response.data);
  //       if (error.response.data.employee_id) {
  //         ShowToast('error', `${error.response.data.employee_id}`);
  //       }
  //     } else {
  //       ShowToast('error', 'Something went wrong');
  //     }
  //   } finally {
  //     setLoading(false);
  //   }
  // };
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const formDataWithFile = new FormData();

      Object.entries(formData).forEach(([key, value]) => {
        if (key === 'user_profile') {
          Object.entries(value).forEach(([profileKey, profileValue]) => {
            if (Array.isArray(profileValue)) {
              profileValue.forEach((item) => formDataWithFile.append(`${key}.${profileKey}`, item));
            } else if (profileKey === 'image' && profileValue instanceof File) {
              // Only append image if it's a File object
              formDataWithFile.append(`${key}.${profileKey}`, profileValue);
            } else if (profileKey !== 'image') {
              // Skip the image if it's not a File
              formDataWithFile.append(`${key}.${profileKey}`, profileValue);
            }
          });
        } else if (key === 'user_permissions') {
          const formattedPermissions = formData.user_permissions
            .map(permissionId => parseInt(permissionId, 10))
            .filter(permissionId => Number.isInteger(permissionId)); // Filter out NaN and non-integer values

          formattedPermissions.forEach(permission => {
            formDataWithFile.append(key, permission);
          });
        } else {
          formDataWithFile.append(key, value);
        }
      });

      console.log('formDataWithFile', formDataWithFile);

      const response = await authAxios.put(`${baseURL}drf-finance/users/${id}/`, formDataWithFile, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      if (response) {
        navigate('/users');
        ShowToast('success', 'Successfully Added');
      }
    } catch (error) {
      if (error.response && error.response.data && typeof error.response.data === 'object') {
        setErrorMessage(error.response.data);
        if (error.response.data.employee_id) {
          ShowToast('error', `${error.response.data.employee_id}`);
        }
      } else {
        ShowToast('error', 'Something went wrong');
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
        const response = await authAxios.put(`${baseURL}/api/password_reset/${userId}/`);

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



      <AddPageFormTitle title='Update Information' FormPageRightSideButtonURL='/users' LinkName='Close' />

      <form onSubmit={handleSubmit}>


        <div className="grid grid-cols-2 lg:grid-cols-3 gap-x-3">
          <div className='my-4'>
            <InputFiledWC className='pl-3 py-[9px] appearance-none border-[1px] border-[#9d9c9c] w-[100%] focus:outline-none focus:bg-white focus:border-[#2e6da4]'
              type='text'
              value={formData.first_name}
              onChange={handleChange}
              name='first_name'
              id='first_name'
              label='First Name *'
              isRequired={true}
              placeholder='Enter first name'
            />
          </div>
          <div className='my-4'>
            <InputFiledWC className='pl-3 py-[9px] appearance-none border-[1px] border-[#9d9c9c] w-[100%] focus:outline-none focus:bg-white focus:border-[#2e6da4]'
              type='text'
              value={formData.last_name}
              onChange={handleChange}
              name='last_name'
              id='last_name'
              label='Last Name *'
              isRequired={true}
              placeholder='Enter Last name'
            />
          </div>
          <div className='my-4'>
            <InputFiledWC className='pl-3 py-[9px] appearance-none border-[1px] border-[#9d9c9c] w-[100%] focus:outline-none focus:bg-white focus:border-[#2e6da4]'
              type='text'
              value={formData.username}
              onChange={handleChange}
              name='username'
              id='username'
              label='Email *'
              isRequired={true}
              placeholder='Enter user name'
            />
          </div>
          <div className='my-4'>
            <InputFiledWC
              className='pl-3 py-[9px] appearance-none border-[1px] border-[#9d9c9c] w-[100%] focus:outline-none focus:bg-white focus:border-[#2e6da4]'
              type='password'
              value={formData.password}
              onChange={handleChange}
              name='password'
              id='password'
              label='Password *'
              isRequired={true}
              placeholder='Enter password'
              readOnly={true}
            />
          </div>
          <div className='my-4'>
            <InputFiledWC className='pl-3 py-[9px] appearance-none border-[1px] border-[#9d9c9c] w-[100%] focus:outline-none focus:bg-white focus:border-[#2e6da4]'
              type='text'
              value={formData.user_profile.employee_id}
              onChange={handleChange}
              name='employee_id'
              id='employee_id'
              label='Employee ID *'
              isRequired={true}
              placeholder='Enter employee id'
            />
            {errorMessage?.employee_id && (
              <p className='text-red-500'>{errorMessage.employee_id}</p>
            )}
          </div>
          <div className='my-4'>
            <SelectInputWC className={`text-justify appearance-none border-[1px] w-[100%] focus:outline-none focus:bg-white focus:border-[#2e6da4]`}
              name='company'
              id='company'
              label={'Company'}
              value={selectedCompany}
              onChange={handleCompanyChange}
              options={companyOptions}
              isRequired={false}
              isClearable={true}
            />
          </div>
          <div className='my-4'>
            <SelectMultipleInput className={`text-justify appearance-none border-[1px] w-[100%] focus:outline-none focus:bg-white focus:border-[#2e6da4]`}
              name='secondary_company'
              id='secondary_company'
              label='Secondary Company'
              value={selectedSecondaryCompany}
              onChange={handleSecondaryCompanyChange}
              options={secondaryCompanyOptions}
              isRequired={false}
              isMulti={true}
            />
          </div>
          <div className='my-4'>
            <SelectInputWC className={`text-justify appearance-none border-[1px] w-[100%] focus:outline-none focus:bg-white focus:border-[#2e6da4]`}
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
            <SelectInputWC className={`text-justify appearance-none border-[1px] w-[100%] focus:outline-none focus:bg-white focus:border-[#2e6da4]`}
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
          <div className="my-4">
            <SelectInputWC className={`text-justify appearance-none border-[1px] w-[100%] focus:outline-none focus:bg-white focus:border-[#2e6da4]`}
              name='role'
              id='role'
              label='Role'
              value={selectedRole}
              onChange={handleRoleChange}
              options={secondaryRoleOptions}
              isRequired={false}
              isClearable={true}
            />
          </div>
          <div className='my-4'>
            <SelectMultipleInput className={`text-justify appearance-none border-[1px] w-[100%] focus:outline-none focus:bg-white focus:border-[#2e6da4]`}
              name='secondary_role'
              id='secondary_role'
              label='Secondary Role'
              value={selectedSecondaryRole}
              onChange={handleSecondaryRoleChange}
              options={secondaryRoleOptions}
              isRequired={false}
              isMulti={true}
            />
          </div>

          {/* <div className='my-4'>
            <InputFiledWC className='pl-3 py-[9px] appearance-none border-[1px] border-[#9d9c9c] w-[100%] focus:outline-none focus:bg-white focus:border-[#2e6da4]'
              type='number'
              value={formData.user_profile.helpdesk_role}
              onChange={handleChange}
              name='helpdesk_role'
              id='helpdesk_role'
              label='Helpdesk Role *'
              isRequired={true}
              placeholder='Enter helpdesk role'
            />
          </div> */}
          <div className='my-4'>
            <SelectInputWC
              className={`text-justify appearance-none border-[1px] w-[100%] focus:outline-none focus:bg-white focus:border-[#2e6da4]`}
              name='helpdesk_role'
              id='helpdesk_role'
              label='Helpdesk Role'
              value={selectedHelpdeskRole}
              onChange={handleHelpdeskRoleChange}
              options={helpdeskRoleOptions}
              isRequired={true}
              isClearable={true}
            />
          </div>
          {/* <div className='my-4'>
            <SelectInputWC 
            className={`text-justify appearance-none border-[1px] w-[100%] focus:outline-none focus:bg-white focus:border-[#2e6da4]`}
              name='reporting_to'
              id='reporting_to'
              label='Reporting To'
              value={selectedReporting}
              onChange={handleReportingChange}
              options={reportingOptions}
              isRequired={false}
              isClearable={true}
            />
          </div>
          <div className='my-4'> 
          <InputFiledWC
           className='pl-3 py-[9px] appearance-none border-[1px] border-[#9d9c9c] w-[100%] focus:outline-none focus:bg-white focus:border-[#2e6da4]'
           type='file'
          onChange={handleChange} 
          name='image'
           id='image' 
          label='Photo' 
          isRequired={false}
          placeholder='Select photo'/>
          {currentPhoto && <img src={currentPhoto} alt="Phone" className='w-[30px]' />}
          </div> */}
          <div className='my-4 col-span-2 lg:col-span-3'>
            <div className='flex gap-3'>
              <div className='flex-1'>
                <SelectInputWC
                  className={`text-justify appearance-none border-[1px] w-full focus:outline-none focus:bg-white focus:border-[#2e6da4]`}
                  name='reporting_to'
                  id='reporting_to'
                  label='Reporting To'
                  value={selectedReporting}
                  onChange={handleReportingChange}
                  options={reportingOptions}
                  isRequired={false}
                  isClearable={true}
                />
              </div>
              <div className='flex-1'>
                <InputFiledWC
                  className='pl-3 py-[9px] appearance-none border-[1px] border-[#9d9c9c] w-[100%] focus:outline-none focus:bg-white focus:border-[#2e6da4]'
                  type='file'
                  onChange={handleChange}
                  name='image'
                  id='image'
                  label='Photo'
                  isRequired={false}
                  placeholder='Select photo' />
                {currentPhoto && <img src={currentPhoto} alt="Phone" className='w-[30px] h-[30px]' />}
              </div>
            </div>
          </div>
          <div className="my-2">
            <Checkbox
              type='checkbox'
              checked={formData.user_profile.is_department_head}
              onChange={handleChange}
              name='is_department_head'
              id='is_department_head'
              label='Is department head?'
              isRequired={false}
              placeholder='is_department_head?'
            />
          </div>
          <div className="my-2">
            <Checkbox
              type='checkbox'
              checked={formData.is_active}
              onChange={handleChange}
              name='is_active'
              id='is_active'
              label='Is active?'
              isRequired={false}
              placeholder='status'
            />
          </div>
          <div className="my-2">
            <Checkbox
              type='checkbox'
              checked={formData.is_superuser}
              onChange={handleChange}
              name='is_superuser'
              id='is_superuser'
              label='Is superuser?'
              isRequired={false}
              placeholder='Is superuser'
            />
          </div>
        </div>
        {/* <div className='my-4'>
            <label>Permissions</label>
            <div className="permissions-grid">
              {permissions.map((permission) => (
                <div key={permission.id} className="permission-item">
                  <Checkbox
                    type='checkbox'
                    id={`permission_${permission.id}`}
                    label={permission.content_type.model}
                  />
                  <Checkbox
                    type='checkbox'
                    checked={formData.user_permissions.includes(permission.id)}
                    onChange={() => handlePermissionChange(permission.id)}
                    name='user_permissions'
                    id={`permission_${permission.id}`}
                    label={permission.name}
                  />
                </div>
              ))}
            </div>
          </div> */}

        {/* <div className='my-4'>
    <label>Permissions</label>
    <div className="permissions-grid">
        {Object.keys(groupedPermissions).map((model) => (
            <div key={model} className="model-group">
                <div className="model-name">
                    <Checkbox
                        type='checkbox'
                        id={`model_${model}`}
                        label={model}
                        // Handle main checkbox logic here
                    />
                </div>
                {groupedPermissions[model].map((permission) => (
                    <div key={permission.id} className="permission-item">
                        <Checkbox
                            type='checkbox'
                            checked={formData.user_permissions.includes(permission.id)}
                            onChange={() => handlePermissionChange(permission.id)}
                            name='user_permissions'
                            id={`permission_${permission.id}`}
                            label={permission.name}
                        />
                    </div>
                ))}
            </div>
        ))}
    </div>
</div> */}

        {/* <AddPageFormTitle title='User Information Update Form' FormPageRightSideButtonURL='/user-list' LinkName='Close' /> */}
        {hasPermission('view_permission') && hasPermission('change_permission') && (
          <div className='shadow-lg p-4 my-5 border'>
            <div className="user-details-page-title mb-5 shadow" style={{ padding: '0px' }}>
              <div className="my-auto py-2">
                <h1 className='uppercase'>User Permissions</h1>
              </div>
            </div>
            <div className="flex flex-wrap">
              {Object.keys(groupedPermissions).map((model) => (
                <div key={model} className='flex-shrink-0 my-4 w-full md:w-auto'>
                  <div className="permissions-grid">
                    <div className="model-group">
                      <div className="model-name capitalize">
                        <CheckboxPermissionModel
                          type='checkbox'
                          id={`model_${model}`}
                          label={model}
                          checked={groupedPermissions[model].every(permission =>
                            formData.user_permissions.includes(permission.id)
                          )}
                          onChange={() => handleModelPermissionChange(model)}
                        />
                      </div>
                      <div className="flex flex-col ml-5">
                        {groupedPermissions[model].map((permission) => (
                          <div key={permission.id} className="permission-item capitalize">
                            <CheckboxPermissions
                              type='checkbox'
                              checked={formData.user_permissions.includes(permission.id)}
                              onChange={() => handlePermissionChange(permission.id)}
                              name='user_permissions'
                              id={`permission_${permission.id}`}
                              label={permission.name}
                            />
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

          </div>
        )}

        <div className='flex'>
          {hasPermission('change_user') && (
            <div className='mx-2'>
            <button type='submit' className='bg-[#2e6da4] text-[#fff] rounded-[5px] px-4 py-1'>{loading ? 'Updating...' : 'Update'}</button>

          </div>
          )}
          
          {/* <div className='mx-2'>
            <button type='button' className='flex text-[#ffffff] bg-[#ff4747] rounded-[5px]  px-4 py-1 shadow' onClick={() => handlePasswordReset(id)}>
              Password Reset <MdLockReset className='text-[25px] text-[#ffffff] ml-2' />
            </button>
          </div> */}
        </div>
      </form>


    </div>
  )
}

export default UserEdit