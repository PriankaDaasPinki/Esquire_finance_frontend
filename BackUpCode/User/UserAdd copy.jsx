import React, { useEffect, useState } from 'react';
import AddPageFormTitle from '../../components/Form/FormPageTitle';
import InputFiled from '../../components/Form/InputFiled';
import ShowToast from '../../components/ShowToast';
import { authAxios, baseURL } from '../../baseURL';
import { useNavigate } from 'react-router-dom';
import InputFiledWC from '../../components/FormWithoutClass/InputFiledWC';
import SelectInputWC from '../../components/FormWithoutClass/SelectInputWC';
import Checkbox from '../../components/Form/Checkbox';
import PasswordFiled from '../../components/Form/PasswordFiled';
import InputFile from '../../components/Form/InputFile';
import CheckboxPermissionModel from '../../components/Form/CheckboxPermissionModel';
import CheckboxPermissions from '../../components/Form/CheckboxPermissions';
import SelectMultipleInput from '../../components/FormWithoutClass/SelectMultipleInput';
import usePermissions from '../../hooks/usePermissions';


function UserAdd() {
  const navigate = useNavigate();
  const jwtToken = localStorage.getItem('token');
  const { hasPermission } = usePermissions();
  const [inputErrorList, setInputErrorList] = useState({});

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

  const [loading, setLoading] = useState(false);
  const [companyOptions, setCompanyOptions] = useState([]);
  const [selectedCompany, setSelectedCompany] = useState(null);
  const [secondaryCompanyOptions, setSecondaryCompanyOptions] = useState([]);
  const [selectedSecondaryCompany, setSelectedSecondaryCompany] = useState([]);
  const [departmentOptions, setDepartmentOptions] = useState([]);
  const [selectedDepartment, setSelectedDepartment] = useState(null);
  const [designationOptions, setDesignationOptions] = useState([]);
  const [selectedDesignation, setSelectedDesignation] = useState(null);
  const [reportingOptions, setReportingOptions] = useState([]);
  const [selectedReporting, setSelectedReporting] = useState(null);
  const [roleOptions, setRoleOptions] = useState([]);
  const [selectedRole, setSelectedRole] = useState([]);
  const [primaryRoleOptions, setPrimaryRoleOptions] = useState([]);
  const [selectedPrimaryRole, setSelectedPrimaryRole] = useState(null);
  const [helpdeskRoleOptions] = useState([
    { value: '1', label: 'Issuer' },
    { value: '2', label: 'Resolver' },
    { value: '3', label: 'Manager' },
    { value: '4', label: 'Department Head' },
  ]);
  const [selectedHelpdeskRole, setSelectedHelpdeskRole] = useState(null);
  const [errorMessage, setErrorMessage] = useState('');

  const [permissions, setPermissions] = useState([]); // State for permissions

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
        setPrimaryRoleOptions(
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

    if (name === 'username') {
      const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
      if (!emailPattern.test(value)) {
        setInputErrorList((prevErrors) => ({
          ...prevErrors,
          [name]: 'Please type a valid email address',
        }));
      } else {
        setInputErrorList((prevErrors) => ({
          ...prevErrors,
          [name]: '',
        }));
      }
    }

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

  const handleRoleChange = (selectedOptions) => {
    const roleIDs = selectedOptions ? selectedOptions.map((option) => option.value.toString()) : [];
    setSelectedRole(selectedOptions);
    handleSelectChange('secondary_role', roleIDs);
  };

  const handleSecondaryCompanyChange = (selectedOptions) => {
    const secondaryCompanyIDs = selectedOptions ? selectedOptions.map((option) => option.value.toString()) : [];
    setSelectedSecondaryCompany(selectedOptions);
    handleSelectChange('secondary_company', secondaryCompanyIDs);
  };

  const handlePrimaryRoleChange = (selectedOption) => {
    const primaryRoleID = selectedOption ? selectedOption.value : null;
    setSelectedPrimaryRole(selectedOption);
    handleSelectChange('role', primaryRoleID);
  };

  const handleReportingChange = (selectedOption) => {
    const reportingToID = selectedOption ? selectedOption.value : null;
    setSelectedReporting(selectedOption);
    handleSelectChange('reporting_to', reportingToID);
  };

  const handleCompanyChange = (selectedOption) => {
    const companyID = selectedOption ? selectedOption.value : null;
    setSelectedCompany(selectedOption);
    handleSelectChange('company', companyID);
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
      console.log(prevFormData);

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



  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);


    // Validation: Check if the first_name field is empty
        if (!formData.first_name || !formData.last_name || !formData.username || !formData.password
           || !formData.user_profile.employee_id  || !formData.user_profile.company  || !formData.user_profile.department
           || !formData.user_profile.designation  || !formData.user_profile.reporting_to  || !formData.user_profile.role
           || !formData.user_profile.secondary_role  || !formData.user_profile.secondary_company  || !formData.user_profile.helpdesk_role) {
          setInputErrorList((prevErrors) => ({
            ...prevErrors,
            first_name: 'First name field cannot be empty',
            last_name: 'Last name field cannot be empty',
            username: 'Email field cannot be empty',
            password: 'Password field cannot be empty',
            user_profile: {
              ...prevErrors.user_profile,
              employee_id: 'Employee ID cannot be empty',
              company: 'Please select a company from dropdown',
              department: 'Please select a department from dropdown',
              designation: 'Please select a designation from dropdown',
              reporting_to: 'Please select a member from dropdown',
              role: 'Please select a role from dropdown',
              secondary_role: 'Please select a secondary role from dropdown',
              secondary_company: 'Please select a secondary company from dropdown',
              helpdesk_role: 'Helpdesk role cannot be empty',
            },
          }));
          setLoading(false);
          return;
        }

    try {
      const formDataWithFile = new FormData();
      Object.entries(formData).forEach(([key, value]) => {
        if (key === 'user_profile') {
          Object.entries(value).forEach(([profileKey, profileValue]) => {
            if (Array.isArray(profileValue)) {
              profileValue.forEach((item) => formDataWithFile.append(`${key}.${profileKey}`, item));
            } else {
              formDataWithFile.append(`${key}.${profileKey}`, profileValue);
            }
          });
        }
        else if (key === 'user_permissions') {
          const formattedPermissions = formData.user_permissions.map(permissionId => parseInt(permissionId, 10));
          formattedPermissions.forEach(permission => {
            formDataWithFile.append(key, permission);
          });
        }

        else {
          // Handle files (like images) separately if they are included in the form data
          if (key === 'image' && value instanceof File) {
            formDataWithFile.append(key, value);
          } else {
            formDataWithFile.append(key, value);
          }
        }
      });

      const response = await authAxios.post(`${baseURL}drf-finance/users/`, formDataWithFile, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      if (response) {
        navigate('/users');
        ShowToast('success', 'Successfully Added');
      }
    } catch (error) {
      console.log(error);
      if (error.response.data) {
        setInputErrorList(error.response.data);
        console.log('inputErrorList',error.response.data);

      }
    } finally {
      setLoading(false);
    }
  };
  
  return (
    <div className='bg-[#fff] shadow-xl p-3 my-4 rounded-[5px]'>
      <AddPageFormTitle title='User Add Form' FormPageRightSideButtonURL='/users' LinkName='Close' />

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
             //  isRequired={true}
              placeholder='Enter first name'
            />
           <span className='text-[#9D3030] text-left'>{inputErrorList.first_name}</span>

          </div>
          <div className='my-4'>
            <InputFiledWC className='pl-3 py-[9px] appearance-none border-[1px] border-[#9d9c9c] w-[100%] focus:outline-none focus:bg-white focus:border-[#2e6da4]'
              type='text'
              value={formData.last_name}
              onChange={handleChange}
              name='last_name'
              id='last_name'
              label='Last Name *'
             //  isRequired={true}
              placeholder='Enter Last name'
            />
           <span className='text-[#9D3030] text-left'>{inputErrorList.last_name}</span>
          </div>
          <div className='my-4'>
            <InputFiledWC className='pl-3 py-[9px] appearance-none border-[1px] border-[#9d9c9c] w-[100%] focus:outline-none focus:bg-white focus:border-[#2e6da4]'
              type='text'
              value={formData.username}
              onChange={handleChange}
              name='username'
              id='username'
              label='Email *'
             //  isRequired={true}
              placeholder='Enter user name'
            />
           <span className='text-[#9D3030] text-left'>{inputErrorList.username}</span>

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
             //  isRequired={true}
              placeholder='Enter password'
            />
             <span className='text-[#9D3030] text-left'>{inputErrorList.password}</span>
          </div>
          <div className='my-4'>
            <InputFiledWC className='pl-3 py-[9px] appearance-none border-[1px] border-[#9d9c9c] w-[100%] focus:outline-none focus:bg-white focus:border-[#2e6da4]'
              type='text'
              value={formData.user_profile.employee_id}
              onChange={handleChange}
              name='employee_id'
              id='employee_id'
              label='Employee ID *'
             //  isRequired={true}
              placeholder='Enter employee id'
            />
             <span className='text-[#9D3030] text-left'>{inputErrorList.user_profile?.employee_id}</span>
            {/* {errorMessage?.employee_id && (
              <p className='text-red-500'>{errorMessage.employee_id}</p>
            )} */}
          </div>
          <div className='my-4'>
            <SelectInputWC className={`appearance-none border-[1px] w-[100%] focus:outline-none focus:bg-white focus:border-[#2e6da4] text-justify`}
              name='company'
              id='company'
              label='Company *'
              value={selectedCompany}
              onChange={handleCompanyChange}
              options={companyOptions}
              isRequired={false}
              isClearable={true}
            />
             <span className='text-[#9D3030] text-left'>{inputErrorList.user_profile?.company}</span>
          </div>
          <div className='my-4'>
            <SelectMultipleInput className={`appearance-none border-[1px] w-[100%] focus:outline-none focus:bg-white focus:border-[#2e6da4] text-justify`}
              name='secondary_company'
              id='secondary_company'
              label='Secondary Company *'
              value={selectedSecondaryCompany}
              onChange={handleSecondaryCompanyChange}
              options={secondaryCompanyOptions}
              isRequired={false}
              isMulti={true}
            />
             <span className='text-[#9D3030] text-left'>{inputErrorList.user_profile?.secondary_company}</span>

          </div>
          <div className='my-4'>
            <SelectInputWC className={`appearance-none border-[1px] w-[100%] focus:outline-none focus:bg-white focus:border-[#2e6da4] text-justify`}
              name='department'
              id='department'
              label='Department *'
              value={selectedDepartment}
              onChange={handleDepartmentChange}
              options={departmentOptions}
              isRequired={false}
              isClearable={true}
            />
             <span className='text-[#9D3030] text-left'>{inputErrorList.user_profile?.department}</span>
          </div>
          <div className='my-4'>
            <SelectInputWC className={`text-justify appearance-none border-[1px] w-[100%] focus:outline-none focus:bg-white focus:border-[#2e6da4]`}
              name='designation'
              id='designation'
              label='Designation *'
              value={selectedDesignation}
              onChange={handleDesignationChange}
              options={designationOptions}
              isRequired={false}
              isClearable={true}
            />
             <span className='text-[#9D3030] text-left'>{inputErrorList.user_profile?.designation}</span>

          </div>
          <div className="my-4">
            <SelectInputWC className={`text-justify appearance-none border-[1px] w-[100%] focus:outline-none focus:bg-white focus:border-[#2e6da4]`}
              name='role'
              id='role'
              label='Role *'
              value={selectedPrimaryRole}
              onChange={handlePrimaryRoleChange}
              options={primaryRoleOptions}
              isRequired={false}
              isClearable={true}
            />
             <span className='text-[#9D3030] text-left'>{inputErrorList.user_profile?.role}</span>

          </div>
          <div className='my-4'>
            <SelectMultipleInput className={`text-justify appearance-none border-[1px] w-[100%] focus:outline-none focus:bg-white focus:border-[#2e6da4] text-justify`}
              name='role'
              id='role'
              label='Secondary Role *'
              value={selectedRole}
              onChange={handleRoleChange}
              options={roleOptions}
              isRequired={false}
              isMulti={true}
            />
             <span className='text-[#9D3030] text-left'>{inputErrorList.user_profile?.secondary_company}</span>
          </div>
          <div className='my-4'>
            <SelectInputWC
              className={`text-justify appearance-none border-[1px] w-[100%] focus:outline-none focus:bg-white focus:border-[#2e6da4]`}
              name='helpdesk_role'
              id='helpdesk_role'
              label='Helpdesk Role *'
              value={selectedHelpdeskRole}
              onChange={handleHelpdeskRoleChange}
              options={helpdeskRoleOptions}
             //  isRequired={true}
              isClearable={true}
            />
             <span className='text-[#9D3030] text-left'>{inputErrorList.user_profile?.helpdesk_role}</span>
          </div>
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
             <span className='text-[#9D3030] text-left'>{inputErrorList.user_profile?.reporting_to}</span>

              </div>
              <div className='flex-1'>
                <InputFiledWC
                  className='pl-3 py-[9px] appearance-none border-[1px] border-[#9d9c9c] w-full focus:outline-none focus:bg-white focus:border-[#2e6da4]'
                  type='file'
                  onChange={handleChange}
                  name='image'
                  id='image'
                  label='Photo'
                  isRequired={false}
                  placeholder='Select photo'
                />
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
        {hasPermission('add_user') && (
          <div className="my-auto">
            <button
              type='submit'
              className='bg-[#2e6da4] text-[#fff] rounded-[5px] px-4 py-1'>
              {loading ? 'Submitting...' : 'Submit'}
            </button>
          </div>
        )}


        {/* </div> */}
      </form>
    </div>
  );
}

export default UserAdd;
