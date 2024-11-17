import React from 'react'
import usePermissions from '../../hooks/usePermissions';

const CustomCreateButton = ({permission,loading}) => {
  const { hasPermission } = usePermissions();
  return (
    <div>
        {hasPermission(`${permission}`) && (
        <div className="my-auto">
          <button
            type='submit'
            className='bg-[#2e6da4] text-[#fff] rounded-[5px] px-4 py-1'>
            {loading ? 'Creating...' : 'Create'}
          </button>
        </div>
      )}
    </div>
  )
}

export default CustomCreateButton