import React from 'react';
import { useSelector } from 'react-redux';
import './User.css'; 
import { useNavigate } from 'react-router-dom';
import usePermissions from '../../hooks/usePermissions';
import UserPermissionDetailsComponent from './userComponent/UserPermissionDetailsComponent';
import PageTitleComponent from '../../components/PageTitleComponent';
import ProfileDetailsComponent from './userComponent/UserProfileComponents/ProfileDetailsComponent';

const UserProfileView = () => {
  const user = useSelector((state) => state.user.user);
  const navigate = useNavigate();

  const {hasPermission} = usePermissions();

  console.log(user);

  if (!user) {
    return <p>No user data available</p>;
  }

  const fullName = `${user.first_name} ${user.last_name}`;

  return (
    <div className='user-details bg-[#fff]'>

      {/* user details  */}
      <PageTitleComponent title={'Profile Details'} closeURL={'home'}/>

      <ProfileDetailsComponent profileData={user} />

      
      {/* user permissions */}
      <UserPermissionDetailsComponent userData={user?.user} />


    </div>
  );
};

export default UserProfileView;
