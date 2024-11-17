// UserList.jsx

import React, { useState } from 'react';
import {useNavigate } from 'react-router-dom';
import { connect } from 'react-redux';
import UserDataListComponent from './UserComponent/UserDataListComponent'; 

function UserList({user}) {
  const navigate = useNavigate();

  const [sortOrder, setSortOrder] = useState({});
  
  const columns = [
    {
      title: 'Name',
      dataIndex: 'name',
      key: '1',
      sorter: (a, b) => a?.name.localeCompare(b?.name),
      sortOrder: sortOrder['name'],
    },
    {
      title: 'Employee ID',
      dataIndex: 'employee_id',
      key: '2',
      sorter: (a, b) => a?.employee_id?.localeCompare(b?.employee_id),
      sortOrder: sortOrder['employee_id'],
    },
    {
      title: 'Phone',
      dataIndex: 'phone_no',
      key: '2',
      sorter: (a, b) => a?.phone_no?.localeCompare(b?.phone_no),
      sortOrder: sortOrder['phone_no'],
    },
    {
      title: 'Email',
      dataIndex: 'email',
      key: '3',
      sorter: (a, b) => a?.email?.localeCompare(b?.email),
      sortOrder: sortOrder['email'],
      responsive: ['md']
    },
    {
      title: 'Primary Role',
      dataIndex: 'primary_role_name',
      sorter: (a, b) => a?.primary_role_name?.localeCompare(b?.primary_role_name),
      sortOrder: sortOrder['primary_role_name'],
      responsive: ['md']
    },
  
  ];

  const addNewURL = user?.menu_permissions?.includes("1.1.1")? '/user-add':''
  const deleteURL = user?.menu_permissions?.includes("1.1.4")? '/user-delete':''
  const dataEditURL = user?.menu_permissions?.includes("1.1.3")? '/user-update':''


  
  return (
    <div className='bg-[#fff] shadow-xl p-3 my-4 rounded-[5px]'>
      <UserDataListComponent 
        apiEndpoint="/api/user-list/" 
        columnsConfig={columns}
        title="User List"
        SearchKey1='name'
        SearchKey2='email'
        SearchKey3='employee_id'
        SearchKey4='phone_no'
        sortOrder={sortOrder}
        setSortOrder={setSortOrder}
        expandableKey1='name'
        expandableKey2='email'
        expandableKey3='employee_id'
        expandableKey4='phone_no'
        addNewURL={addNewURL}
        dataEditURL={dataEditURL}
        deleteURL={deleteURL}
      />
    </div>
  );
}


const mapStateToProps = (state) => ({
  user: state.auth.user,
});

export default connect(mapStateToProps)(UserList);