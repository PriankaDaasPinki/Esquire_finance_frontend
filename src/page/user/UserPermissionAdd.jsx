import React, { useEffect, useState } from 'react';
import { authAxios, authAxiosWithBearer, baseURL } from '../../baseURL';
import Select from 'react-select';
import { useNavigate } from 'react-router-dom';
import AddPageFormTitle from '../../Components/Form/FormPageTitle'
import { FaPlusCircle, FaMinusCircle } from 'react-icons/fa';
import { connect } from 'react-redux';
import { load_user } from '../../Redux/actions/auth';
import axios from 'axios';
import ShowToast from '../../components/ShowToast';

function PermissionCheckbox({ id, name, checked, onChange }) {
  return (
    <label>
      <input type="checkbox" name={name} id={id} checked={checked} onChange={onChange} />
      <span className='ml-1'>{name}</span>
    </label>
  );
}


function UserPermissionAdd({load_user}) {
  const navigate = useNavigate()
  const [checkedMenus, setCheckedMenus] = useState([]);
  const [checkedPermissions, setCheckedPermissions] = useState([]);
  const [expandedCategories, setExpandedCategories] = useState([]);
  const [expandedSubCategories, setExpandedSubCategories] = useState([]);
  const [userPermissionMenu, setUserPermissionMenu] = useState([]);
  const [errorMessage,setErrorMessage] = useState('')
  const [userData, setUserData] = useState([])
  const [selectedUser, setSelectedUser] = useState(null);
  const jwtToken = localStorage.getItem('token')
  const [userSearchInputValue,setUserSearchInputValue]=useState(null)

  useEffect(() => {
    const fetchUserPermissionMenu = async () => {
        try {
          const response = await authAxiosWithBearer.get(`${baseURL}/api/menu/`);
          setUserPermissionMenu(response.data);
            console.log(response.data)
        } catch (error) {
            console.log(error)
        }
    };
    fetchUserPermissionMenu();
}, []); 



const toggleCategory = (categoryId) => {
  setExpandedCategories((prevExpanded) =>
    prevExpanded.includes(categoryId)
      ? prevExpanded.filter((id) => id !== categoryId)
      : [...prevExpanded, categoryId]
  );
};

const toggleSubCategory = (categoryId, menuId) => {
  setExpandedSubCategories((prevExpanded) => ({
    ...prevExpanded,
    [categoryId]: {
      ...(prevExpanded[categoryId] || {}),
      [menuId]: !prevExpanded[categoryId]?.[menuId],
    },
  }));
};


const filterValuesByCount = (array, count) => {
  const valueCount = array.reduce((acc, value) => {
    acc[value] = (acc[value] || 0) + 1;
    return acc;
  }, {});

  return Object.keys(valueCount).filter(key => valueCount[key] === count);
};

const isAllMenusSelected = (categoryId) => {
  const menus = Object.keys(userPermissionMenu[categoryId]?.menu);
  return menus.every(menusID => checkedMenus.includes(`${categoryId}.${menusID}`));
};



const isAllPermissionsSelected = (categoryId, menuId) => {
  const permissions = Object.keys(userPermissionMenu[categoryId].menu[menuId].permission);
  return permissions.every(permissionId => checkedPermissions.includes(`${categoryId}.${menuId}.${permissionId}`));
};




const handleCategoryClick = (event, categoryId) => {
  const isChecked = event.target.checked;

  // Update checkedMenus state for all menus in the selected category
  const menuKeys = Object.keys(userPermissionMenu[categoryId].menu).map((menuId) => `${categoryId}.${menuId}`);
  setCheckedMenus((prevMenus) => (isChecked ? [...prevMenus, ...menuKeys] : prevMenus.filter((key) => !menuKeys.includes(key))));

  // Update checkedPermissions state for all permissions in the selected category
  const permissionKeys = Object.keys(userPermissionMenu[categoryId].menu).flatMap((menuId) =>
    Object.keys(userPermissionMenu[categoryId].menu[menuId].permission).map(
      (permissionId) => `${categoryId}.${menuId}.${permissionId}`
    )
  );
  setCheckedPermissions((prevPermissions) =>
    isChecked ? [...prevPermissions, ...permissionKeys] : prevPermissions.filter((key) => !permissionKeys.includes(key))
  );
};


const handleMenuClick = (event, menuId, categoryId) => {
  const menuKey = `${categoryId}.${menuId}`;
  const isChecked = !checkedMenus.includes(menuKey);

  setCheckedMenus((prevMenus) => (isChecked ? [...prevMenus, menuKey] : prevMenus.filter((key) => key !== menuKey)));

  const selectedMenu = userPermissionMenu[categoryId].menu[menuId];
  

  if (selectedMenu) {
    const menuPermissionIds = Object.keys(selectedMenu.permission).map(
      (permissionId) => `${categoryId}.${menuId}.${permissionId}`
    );

    // Update checkedPermissions state based on isChecked
    if (isChecked) {
      setCheckedPermissions((prevPermissions) => [...prevPermissions, ...menuPermissionIds]);
    } else {
      setCheckedPermissions((prevPermissions) =>
        prevPermissions.filter((permissionId) => !menuPermissionIds.includes(permissionId))
      );
    }
  }
};


const handlePermissionClick = (event, menuKey, permissionId) => {

  setCheckedPermissions((prevPermissions) => {
    const newPermissions = prevPermissions.includes(permissionId)
      ? prevPermissions.filter((id) => id !== permissionId)
      : [...prevPermissions, permissionId];
    
    // Calculate autoSelectedManu based on updated permissions
    const autoSelectedManu = newPermissions.map((userMenusId) => {
      const [categoryId, menuId] = userMenusId.split('.');
      return `${categoryId}.${menuId}`;
    });

    // Apply the filter function to autoSelectedManu
    const uniqueManusID = filterValuesByCount(autoSelectedManu, 6);


    // Update checkedMenus based on the new mm value
    setCheckedMenus((prevMenus) => {
      const newMenus = prevMenus.includes(menuKey)
        ? prevMenus.filter((key) => key !== menuKey)
        : [...prevMenus, ...uniqueManusID.filter((menu) => !prevMenus.includes(menu))];

      // Log newMenus to verify state update logic
      console.log('Updated Menus:', newMenus);

      return newMenus;
    });

    return newPermissions;
  });
};




useEffect(() => {
    const fetchUserData = async () => {
        try {
          const response = await authAxiosWithBearer.get(`${baseURL}/api/user-list/`);
            setUserData(response.data.results);
            console.log(response.data.results)
            
        } catch (error) {
            console.log('error',error)
        }
    };
    fetchUserData();
}, [jwtToken]); 


useEffect(() => {
  authAxiosWithBearer.get(`${baseURL}/api/user-list/?search=${userSearchInputValue}`)
      .then(response => {
        setUserData(response.data.results);
      })
      .catch(error => {
          console.error('Error fetching data:', error);
      });
}, [userSearchInputValue]);

const handleUserSearchInputChange = (value) => {
setUserSearchInputValue(value);
};



const handleUserChange = (selectedOption) => {
  setSelectedUser(selectedOption);
  setCheckedMenus([])
};



const selectedUserId = selectedUser?.value
const [selectedUserData, setSelectedUserData] = useState(null);


// ...
useEffect(() => {
  const fetchSelectUserData = async () => {
    try {
      const response = await authAxiosWithBearer.get(`${baseURL}/api/user/${selectedUserId}/`);
      setSelectedUserData(response.data);

      // Auto-select permissions when user data is received
      const permissions = response.data.menu_permissions || [];
      const autoSelectedPermissions = permissions.map((userPermissionId) => {
        const [categoryId, menuId, permissionId] = userPermissionId.split('.');
        return `${categoryId}.${menuId}.${permissionId}`;
      });
      setCheckedPermissions(autoSelectedPermissions);

      const manus = response.data.menu_permissions || [];
      const autoSelectedManu = manus.map((userMenusId) => {
        const [categoryId, menuId] = userMenusId.split('.');
        return `${categoryId}.${menuId}`;
      });
      setCheckedMenus(filterValuesByCount(autoSelectedManu,6));

    } catch (error) {
      console.log(error);
    }
  };

  fetchSelectUserData();
}, [selectedUserId,jwtToken]);


const updatePermissions = async () => {
  try {
    const updatedUserData = {
      ...selectedUserData,
      menu_permissions: checkedPermissions,  
    };

    const response = await axios.put(`${baseURL}/api/user_permissions/${selectedUserId}/`, updatedUserData,{
      headers: {
        Accept:'application/json',
        'Content-Type': 'application/x-www-form-urlencoded',
        Authorization: `Bearer ${jwtToken}`,
      }
    });

    setSelectedUserData(response.data);
    navigate('/user-list');
    ShowToast('success', 'Successfully Uppdated')
    load_user()
  } catch (error) {
    if(error.response.status === 404){
      ShowToast('error','User filed is required')
      setErrorMessage("User filed is required")
    }else{
      console.error('Error updating permissions', error);
    }
    
    // Handle errors, show error messages, etc.
  }
};



const InputLableStyle ={
  color: '#E74A3B',
  textAlign: 'center',
  fontFamily: 'Inter',
  fontSize: '15px',
  fontStyle: 'normal',
  fontWeight: '600',
  lineHeight: 'normal',
  borderRadius: '3px',
  background: '#FFF',
  boxShadow: '0px 2px 4px 0px rgba(0, 0, 0, 0.25)',
  padding:'2px'
}


return (
<div className='bg-[#fff] shadow-xl px-3 py-5 my-4 rounded-[5px]'>
  <AddPageFormTitle title='User Permission Update Form' FormPageRightSideButtonURL='/user-list' LinkName='Close' />


  <div className='mt-10 flex justify-between'>
      <div className="relative">
          <div className="w-full">
            <Select
              className="appearance-none border-[1px] w-[170px] md:w-[280px] lg:w-[330px] focus:outline-none focus:bg-white focus:border-[#2e6da4]"
              id="user"
              name="user"
              value={selectedUser}
              onChange={handleUserChange}
              onInputChange={handleUserSearchInputChange}
              options={userData.map((user) => ({ value: user.id, label: user.employee_id }))}
              required
              />
          </div>
          <div className="text-xl absolute top-[-25px] left-8 bg-[#fff] px-3">
              <label style={InputLableStyle} className="login-input-label mb-3">User*</label>
          </div>
          <p className='text-red-500'>{errorMessage !== ''? <>{errorMessage}</> :''}</p>
      </div>
      <div>
          <button className='bg-[#FA6669] text-[#fff] px-5 py-2 rounded' onClick={updatePermissions}>Save Permissions</button>
      </div>
  </div>

    <div className="user-permission-dropdown mt-5">
        <div className="grid grid-cols-2 lg:grid-cols-3 gap-y-4">
          {Object.keys(userPermissionMenu).map((categoryId) => (
            <div key={userPermissionMenu[categoryId].id} className="flex">
              <h3>
                <label className='text-[#FA6669] text-[20px] font-medium leading-none'>
                  <input
                    className='mr-2'
                    type="checkbox"
                    name={userPermissionMenu[categoryId].Name}
                    checked={isAllMenusSelected(categoryId) ? true : checkedMenus.includes(`${categoryId}`)}
                    onChange={(event) => handleCategoryClick(event, categoryId)}
                  />
                  {userPermissionMenu[categoryId].Name} {'  '}
                  </label>

                  <button className="dropdown-Btn" onClick={() => toggleCategory(categoryId)}>
                    {expandedCategories.includes(categoryId) ? <FaMinusCircle className='text-[14px] text-[#FA6669]' /> : <FaPlusCircle className='text-[14px] text-[#FA6669]' />}
                  </button>
                
              </h3>
              <div className='mt-8' style={{ display: expandedCategories.includes(categoryId) ? 'block' : 'none' }}>
                {Object.keys(userPermissionMenu[categoryId].menu).map((menuId) => (
                  <div key={menuId} className='mb-1 ml-[-30px]'>
                    <strong>
                      <label className='ml-[-10px] text-[#FA6669]'>
                        <input
                        className=''
                          type="checkbox"
                          name={userPermissionMenu[categoryId].menu[menuId].Name}
                          id={`${categoryId}.${menuId}`}
                          checked={isAllPermissionsSelected(categoryId, menuId) ? true : checkedPermissions.includes(`${categoryId}.${menuId}`)}   
                          onChange={(event) => handleMenuClick(event, menuId, categoryId)}
                        />
                        <span className='ml-1'>{userPermissionMenu[categoryId].menu[menuId].Name}</span>
                      </label>
                    </strong>
                      <button className="dropdown-Btn ml-1" onClick={() => toggleSubCategory(categoryId, menuId)}>
                      {expandedSubCategories[categoryId]?.[menuId] ? <FaMinusCircle className='text-[12px] text-[#FA6669]' /> : <FaPlusCircle className='text-[12px] text-[#FA6669]' />}
                    </button>
                    <div>

                    <div style={{ display: expandedSubCategories[categoryId]?.[menuId] ? 'block' : 'none' }}>
                      {Object.keys(userPermissionMenu[categoryId].menu[menuId].permission).map((permissionId) => {
                        const permission = userPermissionMenu[categoryId].menu[menuId].permission[permissionId];
                        return (
                          <div key={permissionId} className='ml-[10px]'>

                              <PermissionCheckbox
                                id={`${categoryId}.${menuId}.${permissionId}`}
                                name={permission ? permission.Name || permission.name : 'undefined'}
                                checked={checkedPermissions.includes(`${categoryId}.${menuId}.${permissionId}`)}
                                onChange={(event) => handlePermissionClick(event,`${categoryId}.${menuId}`,`${categoryId}.${menuId}.${permissionId}`)}
                              />
                          </div>
                        );
                      })}
                    </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
}

const mapStateToProps = (state) => ({
  user: state.auth.user,
});

export default connect(mapStateToProps,{ load_user })(UserPermissionAdd);

