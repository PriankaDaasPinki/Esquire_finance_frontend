import React, { useEffect, useState } from 'react';
import { authAxios, baseURL } from '../../../../baseURL';
import { useNavigate } from 'react-router-dom';
import usePermissions from '../../../../hooks/usePermissions';
import ShowToast from '../../../../components/ShowToast';
import { useDispatch, useSelector } from 'react-redux';
import { loadUser } from '../../../Authentication/Login/authSlice';


function ProfileUpdateFormHandlerComponent() {
  const navigate = useNavigate();
  const { hasPermission } = usePermissions();
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user.user);
  const [inputErrorList, setInputErrorList] = useState({});

  const [formData, setFormData] = useState({
    user: {
        first_name: "",
        last_name: "",
        username: ""
    },

    department: null,
    company: null,
    designation: null,
    role: null,
    secondary_role: [],
    secondary_company: [],
    reporting_to: null,
    helpdesk_role: '',
    is_department_head: false,
    image: null,
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
  const [imagePreview, setImagePreview] = useState(null);


  const [helpdeskRoleOptions] = useState([
    { value: '1', label: 'Issuer' },
    { value: '2', label: 'Resolver' },
    { value: '3', label: 'Manager' },
    { value: '4', label: 'Department Head' },
  ]);
  const [selectedHelpdeskRole, setSelectedHelpdeskRole] = useState(null);
  const [errorMessage, setErrorMessage] = useState('');


  useEffect(() => {
    const fetchCompanyData = async () => {
      try {
        const response = await authAxios.get(`${baseURL}/drf-finance/company-short-list/`);
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
        const response = await authAxios.get(`${baseURL}/drf-finance/user-role-short-list/`);
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
        const response = await authAxios.get(`${baseURL}/drf-finance/user-short-list/`);
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
        const response = await authAxios.get(`${baseURL}/drf-finance/department-short-list`);
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
        const response = await authAxios.get(`${baseURL}/drf-finance/designation-short-list/`);
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
    
    let inputValue = value;
  
    if (type === 'checkbox') {
      inputValue = checked;
    } else if (type === 'file') {
      inputValue = files[0];
      if (name === 'image') {
        const previewUrl = URL.createObjectURL(files[0]);
        setImagePreview(previewUrl); // Update the image preview
      }
    }

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
    } else if (name in formData.user) {
      setFormData((prevFormData) => ({
        ...prevFormData,
        user: {
          ...prevFormData.user,
          [name]: inputValue,
        },
      }));
    }
  };

  const handleSelectChange = (name, value) => {
    setFormData((prevFormData) => ({
      ...prevFormData,
        [name]: value,
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



  // Handle helpdesk role dropdown change
  const handleHelpdeskRoleChange = (selectedOption) => {
    setSelectedHelpdeskRole(selectedOption);
    handleSelectChange('helpdesk_role', selectedOption ? selectedOption.value : '');
  };

    
    const [currentPhoto, setCurrentPhoto] = useState([])

        // fetchSingleUserData
        useEffect(() => {    

          setFormData((prevFormData) => ({
            ...prevFormData,
            user: {
              ...prevFormData.user,
              username: user?.user?.username,
              first_name: user?.user?.first_name,
              last_name: user?.user?.last_name,
            },
          }));

            setSelectedCompany(user.company ? {
            value: user.company.id,
            label: user.company.name,
            } : null);

            handleSelectChange('company', user?.company?.id);

            setSelectedSecondaryCompany(
            user.secondary_company
                ? user.secondary_company.map(company => ({
                value: company.id,
                label: company.name,
                }))
                : []
            );
            handleSelectChange('secondary_company', user?.secondary_company?.map(company => company?.id));

            setSelectedDepartment(user.department ? {
            value: user.department.id,
            label: user.department.name,
            } : null);
            handleSelectChange('department', user?.department?.id);

            setSelectedDesignation(user.designation ? {
            value: user.designation.id,
            label: user.designation.name,
            } : null);
            handleSelectChange('designation', user?.designation?.id);

            setSelectedReporting(user.reporting_to ? {
            value: user.reporting_to.id,
            label: user.reporting_to.username,
            } : null);
            handleSelectChange('reporting_to', user?.reporting_to?.id);
            
            setSelectedPrimaryRole(user.role ? {
            value: user.role.id,
            label: user.role.name,
            } : null);
            handleSelectChange('role', user?.role?.id);

            setSelectedRole(
            user.secondary_role
                ? user.secondary_role.map(secondaryRole => ({
                value: secondaryRole.id,
                label: secondaryRole.name,
                }))
                : []
            );
            handleSelectChange('secondary_role', user?.secondary_role?.map(secondary_role => secondary_role?.id));

            setSelectedHelpdeskRole(
            user.helpdesk_role
                ? user.helpdesk_role === '1'
                ? { value: '1', label: 'Issuer' }
                : user.helpdesk_role === '2'
                    ? { value: '2', label: 'Resolver' }
                    : user.helpdesk_role === '3'
                    ? { value: '3', label: 'Manager' }
                    : user.helpdesk_role === '4'
                        ? { value: '4', label: 'Department Head' }
                        : null
                : null
            );
            handleSelectChange('helpdesk_role', user?.helpdesk_role);

            setCurrentPhoto(user?.image);

    }, [user]);



    const handleEditSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

      // Validation: Check if the required fields are empty
        if (!formData.user.first_name || !formData.user.last_name || !formData.user.username ||
          !formData.company || !formData.department || !formData.designation || 
          !formData.reporting_to || !formData.role || 
          !formData.secondary_role.length || !formData.secondary_company.length || 
          !formData.helpdesk_role) {
        setInputErrorList((prevErrors) => ({
          ...prevErrors,
          user: {
            first_name: formData.user.first_name ? '' : 'First name cannot be empty',
            last_name: formData.user.last_name ? '' : 'Last name cannot be empty',
            username: formData.user.username ? '' : 'Email cannot be empty',
          },
          company: formData.company ? '' : 'Please select a company from the dropdown',
          department: formData.department ? '' : 'Please select a department',
          designation: formData.designation ? '' : 'Please select a designation',
          reporting_to: formData.reporting_to ? '' : 'Please select a reporting member',
          role: formData.role ? '' : 'Please select a role',
          secondary_role: formData.secondary_role.length ? '' : 'Please select a secondary role',
          secondary_company: formData.secondary_company.length ? '' : 'Please select a secondary company',
          helpdesk_role: formData.helpdesk_role ? '' : 'Helpdesk role cannot be empty',
        }));
        setLoading(false);
        return;
      }

        try {
          const formDataWithFile = new FormData();

          // Handle 'user' object separately
          Object.entries(formData.user).forEach(([key, value]) => {
              formDataWithFile.append(`user.${key}`, value);
          });

          for (const key in formData) {
            if (key === 'secondary_role' || key === 'secondary_company') {
                formData[key].forEach((id) => {
                    formDataWithFile.append(key, id);
                });
            } else if (key === 'image') {
                // Check if image is not null before appending
                if (formData.image) {
                    formDataWithFile.append(key, formData[key]);
                }
            } else {
                formDataWithFile.append(key, formData[key]);
            }
        }



        const response = await authAxios.put(`${baseURL}/drf-finance/profiles/me/`, formDataWithFile, {
            // headers: {
            // 'Content-Type': 'multipart/form-data',
            // },
        });
        if (response) {
            navigate('/profile');
            ShowToast('success', 'Successfully Updated');
            dispatch(loadUser());
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




  return (
    {
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
        handleChange,
        handleSelectChange,
        handleRoleChange,
        handleSecondaryCompanyChange,
        handlePrimaryRoleChange,
        handleReportingChange,
        handleCompanyChange,
        handleDepartmentChange,
        handleDesignationChange,
        handleHelpdeskRoleChange,
        currentPhoto,
        imagePreview,
        handleEditSubmit,
    }
  );
}

export default ProfileUpdateFormHandlerComponent;
