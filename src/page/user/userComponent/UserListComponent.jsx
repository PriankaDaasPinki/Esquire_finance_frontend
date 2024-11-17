import React, { useState } from 'react';
import { Table} from 'antd';
import {  AiFillEdit, AiFillEye } from 'react-icons/ai';
import { useNavigate } from 'react-router-dom';
import CustomPaginator from '../../../components/CustomPaginator';
import LoadingSpinner from '../../../components/LoadingSpinner';
import { baseURL } from '../../../baseURL';
import usePermissions from '../../../hooks/usePermissions';
import UserListPageHeadComponent from './UserListPageHeadComponent';
import useFetchUserListData from '../../../customHook/useFetchUserListData';
import DefaultProfileImage from '../../../assest/Images/Default-Profile-Image.png'


const UserListComponent = ({ apiEndpoint, detailsURL, detailsPermissionCode }) => {
  const navigate = useNavigate();
  const [searchUsername, setSearchUsername] = useState('');
  const [searchEmployeeId, setSearchEmloyeeId] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const {hasPermission} = usePermissions();
  const params = {
    page: currentPage,
    username: searchUsername,
    employee_id: searchEmployeeId,
  };

  const { data, totalItems, isLoading, error, fetchData } = useFetchUserListData(`${apiEndpoint}`, params);


  const dataSource = data?.flatMap((data, index) => ({
    key: index,
    id: data?.id,
    name: data?.first_name + " " + data?.last_name,
    employee_id: data?.user_profile?.employee_id,
    username:data?.username,
    company_name: data?.user_profile.company?.name,
    department_name: data?.user_profile.department?.name,
    designation_name: data?.user_profile.designation?.name,
    role_name: data?.user_profile.role?.name,
    image: (data?.user_profile?.image)?.substring(1),
    is_active: data.is_active === false ? 
    <div className='bg-red-500 text-[#fff] w-[70px] text-center rounded-[10px] p-[1px]'>Inactive</div> 
    :<div className='bg-green-500 text-[#fff] w-[70px] text-center rounded-[10px] p-[1px]'>Active</div>,

  }))



  const columns = [
    {
      title: 'SN',
      key: 'key',
      render: (text, record, index) => {
        return (currentPage - 1) * 20 + index + 1;
      },
    },
    {
      title: 'Image',
      dataIndex: 'image',
      key: 'image',
      render: (image) => (
        <>{image?
          <img
            src={`${baseURL}/` + image}
            alt="User"
            className='border'
            style={{ width: '50px', height: '50px', borderRadius: '50%' }}
          />
          :
          <img
          src={DefaultProfileImage}
          alt="User"
          className='border'
          style={{ width: '50px', height: '50px', borderRadius: '50%' }}
          />
        }
        </>

      ),
    },
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Username',
      dataIndex: 'username',
      key: 'username',
    },
    {
      title: 'ID',
      dataIndex: 'employee_id',
      key: 'employee_id',
    },
    {
      title: 'Company',
      dataIndex: 'company_name',
      key: 'company_name',
    },
    {
      title: 'Department',
      dataIndex: 'department_name',
      key: 'department_name',
    },
    {
      title: 'Designation',
      dataIndex: 'designation_name',
      key: 'designation_name',
    },
    {
      title: 'Role',
      dataIndex: 'role_name',
      key: 'role_name',
    },
    {
      title: 'Status',
      dataIndex: 'is_active',
      key: 'is_active',
    },
    {
      title: 'ACTIONS',
      dataIndex: 'actions',
      render: (_, record) => (
        <div className='flex gap-2'>
          {hasPermission('view_user') && (
          <button onClick={() => navigate(`${detailsURL}${record.id}`)} className='rounded'>
            <AiFillEye className='text-[#2929ff] text-xl' title='Details' />
          </button>
          )}
           {hasPermission('change_user') && (
          <button onClick={() => navigate(`${detailsURL}${record.id}/edit`)} className='rounded'>
            <AiFillEdit className='text-[#2929ff] text-xl' title='Edit' />
          </button>
           )}
        </div>
      ),
    },

  ];



  return (
    <>
      <div className='container-fluid grid grid-cols-1 bg-[#fff]'>
        <UserListPageHeadComponent 
          // setSearchText={setSearchText}
          setSearchUsername={setSearchUsername}
          setSearchEmloyeeId={setSearchEmloyeeId}
        />

      {isLoading ? (
        <p><LoadingSpinner /></p>
      ) : (
        <>
          <div className='shadow-lg overflow-x-auto'>
            <Table
              columns={columns}
              dataSource={dataSource}
              rowClassName={(record, index) =>
                index % 2 === 0 ? 'bg-white' : 'bg-gray-100'
              }
              pagination={false}
            />
            <div className='my-5'>
              <CustomPaginator
                setCurrentPage={setCurrentPage}
                currentPage={currentPage}
                pageSize={20}
                totalItems={totalItems}
              />
            </div>
          </div>
        </>
      )}
      </div>
    </>
  );
};



export default UserListComponent;
