import React from 'react';
import usePermissions from '../../../hooks/usePermissions';

const UserPermissionDetailsComponent = ({ userData }) => {
  const { hasPermission } = usePermissions();

  // Function to group permissions by model
  const groupPermissionsByModel = (permissions) => {
    return permissions.reduce((acc, permission) => {
      const model = permission.content_type.model;
      if (!acc[model]) {
        acc[model] = [];
      }
      acc[model].push(permission);
      return acc;
    }, {});
  };

  // Group permissions by model
  const groupedPermissions = groupPermissionsByModel(userData?.user_permissions || []);

  return (
    <>
      {hasPermission('view_permission') && (
        Object.keys(groupedPermissions).length > 0 && (
          <div className='shadow-lg p-4 my-5 border'>

            <div className="mb-5 shadow p-2 bg-[#ebebeb]">
              <div>
                <h1 className='uppercase text-left text-[18px] font-semibold'>Menu Permissions</h1>
              </div>
            </div>

            <div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4'>
              {Object.entries(groupedPermissions).map(([model, permissions]) => (
                <div key={model} className='model-group'>
                  <h2 className='model-title text-[15px] text-left font-semibold m-1 text-[#c7984f]'>
                    * {model
                      .split('_') // Split by underscore
                      .map(word => word.charAt(0).toUpperCase() + word.slice(1)) // Capitalize first letter of each word
                      .join(' ')} {/* Join words with spaces */}
                  </h2>
                  {permissions.map((permission, idx) => (
                    <div key={permission.id} className='text-[198d85] text-left text-[14px] capitalize p-1 ml-5' style={{ color: '#198f85', fontWeight: '500' }}>
                      <h4>{idx + 1}. {permission?.name}</h4>
                    </div>
                  ))}
                </div>
              ))}
            </div>
          </div>
        )
      )}
    </>
  );
};

export default UserPermissionDetailsComponent;
