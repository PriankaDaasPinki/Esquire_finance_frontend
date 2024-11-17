import React from 'react'
import { useNavigate } from 'react-router-dom';
import noImage from '../../../../assest/Images/blank_profile_image.png'
import { AiFillEdit } from 'react-icons/ai';
import usePermissions from '../../../../hooks/usePermissions';

const ProfileDetailsComponent = ({profileData}) => {
    const navigate = useNavigate()
    const { hasPermission } = usePermissions();

  return (
    <div className="shadow-xl my-2 p-4 border">
    <div className="md:flex md:flex-wrap">
      <div className="md:w-[30%] my-auto">

        <div className="user-img flex justify-center items-center px-4">
          {profileData?.image !== null ?
            <img src={profileData?.image} alt="" className="max-w-full max-h-100%" style={{ borderRadius: '12px' }} />
            :
            <img src={noImage} alt="" className="max-w-full max-h-full" style={{ borderRadius: '12px' }} />
          }
        </div>
      </div>
      
      <div className="md:w-[70%] my-auto px-4">
        <div className='flex justify-between my-2 border-b-2 pb-2'>
          <div className='my-auto'>
            <p className='font-semibold text-lg md:text-2xl capitalize'>{profileData?.user?.first_name + " " + profileData?.user?.last_name}</p>
            {/* <p className='text-semibold text-[15px] capitalize text-left'>{profileData?.user_profile?.role.name}</p> */}
            <p className='text-semibold text-[15px] capitalize text-left'>{profileData?.user_profile?.designation?.name}</p>
          </div>
          <div className='text-center my-auto'>
          {hasPermission('change_profile') && (
            <button onClick={() => navigate(`/profile/edit/`)} className='rounded'>
                <AiFillEdit className='text-[#2929ff] text-3xl' title='Edit' />
            </button>
          )}
         </div>
        </div>

        <div className='grid md:grid-cols-2 my-3 gap-x-[100px] gap-y-4 text-[15px] '>
          <div className='flex flex-wrap'>
            <p className='w-[40%] md:w-[35%] font-semibold text-justify'>ID</p>
            <p className='w-[5%] md:w-[5%]'>:</p>
            <p className='w-[55%] md:w-[60%] text-left border-b'>{profileData?.employee_id}</p>
          </div>

          <div className='flex flex-wrap'>
            <p className='w-[40%] md:w-[35%] font-semibold text-justify'>Email</p>
            <p className='w-[5%] md:w-[5%]'>:</p>
            <p className='w-[55%] md:w-[60%] text-left border-b'>{profileData?.user?.username}</p>
          </div>

          <div className='flex flex-wrap'>
            <p className='w-[40%] md:w-[35%] font-semibold text-justify'>Department</p>
            <p className='w-[5%] md:w-[5%]'>:</p>
            <p className='w-[55%] md:w-[60%] text-left border-b'>{profileData?.department?.name}</p>
          </div>
          <div className='flex flex-wrap'>
            <p className='w-[40%] md:w-[35%] font-semibold text-justify'>Is D.Head</p>
            <p className='w-[5%] md:w-[5%]'>:</p>
            <p className='w-[55%] md:w-[60%] text-left border-b'>{profileData?.is_department_head === true ? 'Yes' : 'No'}</p>
          </div>

          <div className='flex flex-wrap'>
            <p className='w-[40%] md:w-[35%] font-semibold text-justify'>Role</p>
            <p className='w-[5%] md:w-[5%]'>:</p>
            <p className='w-[55%] md:w-[60%] text-left border-b'>{profileData?.role?.name}</p>
          </div>

          <div className='flex flex-wrap'>
            <p className='w-[40%] md:w-[35%] font-semibold text-justify'>S.Roles</p>
            <p className='w-[5%] md:w-[5%]'>:</p>
            <p className='w-[55%] md:w-[60%] text-left border-b'>
              {profileData?.secondary_role?.map((cmpn, key) => {
                return (
                  <span key={key}>{cmpn?.name},</span>
                );
              })}
            </p>
          </div>

          <div className='flex flex-wrap'>
            <p className='w-[40%] md:w-[35%] font-semibold text-justify'>Company</p>
            <p className='w-[5%] md:w-[5%]'>:</p>
            <p className='w-[55%] md:w-[60%] text-left border-b'>{profileData?.company?.name}</p>
          </div>

          <div className='flex flex-wrap'>
            <p className='w-[40%] md:w-[35%] font-semibold text-justify'>S.Company</p>
            <p className='w-[5%] md:w-[5%]'>:</p>
            <p className='w-[55%] md:w-[60%] text-left border-b'>
              {profileData?.secondary_company?.map((cmpn, key) => {
                return (
                  <span key={key}>{cmpn?.name},</span>
                );
              })}
            </p>
          </div>


          <div className='flex flex-wrap'>
            <p className='w-[40%] md:w-[35%] font-semibold text-justify'>Reporting To</p>
            <p className='w-[5%] md:w-[5%]'>:</p>
            <p className='w-[55%] md:w-[60%] text-left border-b'>{profileData?.reporting_to?.username}</p>
          </div>

          {/* <div className='flex flex-wrap'>
            <p className='w-[40%] md:w-[35%] font-semibold text-justify'>Designstion</p>
            <p className='w-[5%] md:w-[5%]'>:</p>
            <p className='w-[55%] md:w-[60%] text-left border-b'>{profileData?.user_profile?.designation.name}</p>
          </div> */}


          <div className='flex flex-wrap'>
            <p className='w-[40%] md:w-[35%] font-semibold text-justify'>Is Superuser</p>
            <p className='w-[5%] md:w-[5%]'>:</p>
            <p className='w-[55%] md:w-[60%] text-left border-b'>{profileData?.user?.is_superuser === true ? 'Yes' : 'No'}</p>
          </div>
          <div className='flex flex-wrap'>
            <p className='w-[40%] md:w-[35%] font-semibold text-justify'>Status</p>
            <p className='w-[5%] md:w-[5%]'>:</p>
            <p className='w-[55%] md:w-[60%] text-left border-b'>{profileData?.user?.is_active === true ? 'Active' : 'Inactive'}</p>
          </div>

        </div>
      </div>
    </div>
  </div>
  )
}

export default ProfileDetailsComponent