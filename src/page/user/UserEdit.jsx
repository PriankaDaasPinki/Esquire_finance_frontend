import React from 'react'
import UserFormComponents from './userComponent/UserAddEditFromComponents/UserFormComponents'
import { useParams } from 'react-router-dom'

const UserEdit = () => {
  const {id} = useParams()
  return (
    <>
      <UserFormComponents id={id} />
    </>
  )
}

export default UserEdit