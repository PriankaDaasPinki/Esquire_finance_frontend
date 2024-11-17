import React from 'react'
import usePermissions from '../../hooks/usePermissions';

const CustomDeleteButton = ({permission,loading}) => {
  const { hasPermission } = usePermissions();
  return (
    <div>
        {hasPermission(`${permission}`) && (
        <div className="my-auto">
          <button
            type='submit'
            className='bg-[#df5211] text-[#fff] rounded-[5px] px-4 py-1'>
            {loading ? 'Deleting...' : 'Delete'}
          </button>
        </div>
      )}
    </div>
  )
}

export default CustomDeleteButton