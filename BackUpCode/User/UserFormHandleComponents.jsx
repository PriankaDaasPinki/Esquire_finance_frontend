import React, { useEffect, useState } from 'react';
import { authAxios, baseURL } from '../../../../baseURL';
import { useNavigate } from 'react-router-dom';
import usePermissions from '../../../../hooks/usePermissions';
import ShowToast from '../../../../components/ShowToast';


function UserFormHandleComponents({id}) {
  const navigate = useNavigate();
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
  }, []);

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


//   edit

    
    const [currentPhoto, setCurrentPhoto] = useState([])
    const [getLoading, setGetLoading] = useState(true);

    const handleEditSubmit = async (e) => {
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

            
            setSelectedPrimaryRole(responseData.user_profile.role ? {
            value: responseData.user_profile.role.id,
            label: responseData.user_profile.role.name,
            } : null);
            handleSelectChange('role', responseData.user_profile.role.id);

            setSelectedRole(
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
    }, [id]);
    
  return (
    {

        groupedPermissions,
        hasPermission,
        inputErrorList,
        formData,
        loading,
        companyOptions,
        selectedCompany,
        secondaryCompanyOptions,
        selectedSecondaryCompany,
        departmentOptions,
        selectedDepartment,
        designationOptions,
        selectedDesignation,
        reportingOptions,
        selectedReporting,
        roleOptions,
        selectedRole,
        primaryRoleOptions,
        selectedPrimaryRole,
        helpdeskRoleOptions,
        selectedHelpdeskRole,
        errorMessage,
        permissions,
        handleChange,
        handleSelectChange,
        handleRoleChange,
        handleSecondaryCompanyChange,
        handlePrimaryRoleChange,
        handleReportingChange,
        handleCompanyChange,
        handleDepartmentChange,
        handleDesignationChange,
        handlePermissionChange,
        handleModelPermissionChange,
        handleHelpdeskRoleChange,
        handleSubmit,
        currentPhoto,
        getLoading,
        handleEditSubmit,
    }
  );
}

export default UserFormHandleComponents;
