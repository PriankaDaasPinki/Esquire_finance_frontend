import React from 'react';
import UserListComponent from './userComponent/UserListComponent';

const UserList = () => {

  return (
    <>
      <UserListComponent
        apiEndpoint={`drf-finance/users/`}
        detailsURL={`/users/`}
        // detailsPermissionCode={"3.5.6"}
      />
    </>
  );
};
 
 
export default UserList;