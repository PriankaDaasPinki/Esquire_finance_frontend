import { useSelector } from 'react-redux';

const usePermissions = () => {
  const user = useSelector((state) => state.user.user);

  const hasPermission = (codename) => {
    return user?.user?.user_permissions?.some(permission => permission.codename === codename) || user?.user?.is_superuser === true;
  };

  const hasPermissions = (codenames) => {
    return codenames.every(codename => hasPermission(codename));
  };

  return { hasPermission, hasPermissions };
};

export default usePermissions;
