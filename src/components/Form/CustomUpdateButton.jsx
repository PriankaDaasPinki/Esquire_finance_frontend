import React from 'react'
import usePermissions from '../../hooks/usePermissions';

const CustomUpdateButton = ({permission,loading}) => {
  const { hasPermission } = usePermissions();
  return (
    <div>
        {hasPermission(`${permission}`) && (
        <div className="my-auto">
          <button
            type='submit'
            className='bg-[#757575] text-[#fff] rounded-[5px] px-4 py-1'>
            {loading ? 'Updating...' : 'Update'}
          </button>
        </div>
      )}
    </div>
  )
}

export default CustomUpdateButton