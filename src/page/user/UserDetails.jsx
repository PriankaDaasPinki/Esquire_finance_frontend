import React from 'react'
import { useParams } from 'react-router-dom'
import LoadingSpinner from '../../components/LoadingSpinner';
import useFetchDetailsData from '../../customHook/useFetchDetailsData';
import PageTitleComponent from '../../components/PageTitleComponent';
import UserDetailsComponent from './userComponent/UserDetailsComponent';
import UserPermissionDetailsComponent from './userComponent/UserPermissionDetailsComponent';


function UserDetails() {
  const { id } = useParams()
  const { detailsData: userData, loading, error, fetchDetailsData } = useFetchDetailsData(`drf-finance/users`, { id })


  if (loading) {
    return <div><LoadingSpinner /></div>;
  }

  return (
    <div className='user-details bg-[#fff]'>

      {/* user details  */}
      <PageTitleComponent title={'User Details'} closeURL={'users'}/>

      <UserDetailsComponent userData={userData} id={id} />

      
      {/* user permissions */}
      <UserPermissionDetailsComponent userData={userData} />


    </div>

  )
}

export default UserDetails;