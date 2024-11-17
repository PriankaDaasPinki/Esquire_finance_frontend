// CustomSubMenu.jsx
import React, { useState } from 'react';
import { FaAngleDown, FaPlusCircle, FaChartPie, FaUser, FaMinusCircle } from 'react-icons/fa';

const CustomSubMenu = ({ label, icon, children }) => {
  const [isCollapsed, setCollapsed] = useState(true);

  const toggleCollapse = () => {
    setCollapsed(!isCollapsed);
  };

  const handleMouseEnter = (event) => {
    if (!isCollapsed) return;

    const menuItem = event.currentTarget;
    if (!menuItem) return;

    // menuItem.style.backgroundColor = '#2e6da4';
    menuItem.style.backgroundColor = '#2e6da4';
    menuItem.style.color = '#fff';

    const submenuIcon = menuItem.querySelector('.submenu-icon');
    if (submenuIcon) submenuIcon.style.color = '#fff';
  };

  const handleMouseLeave = (event) => {
    if (!isCollapsed) return;

    const menuItem = event.currentTarget;
    if (!menuItem) return;

    menuItem.style.backgroundColor = '#fff';
    menuItem.style.color = '#6F6F7E';

    const submenuIcon = menuItem.querySelector('.submenu-icon');
    if (submenuIcon) submenuIcon.style.color = '#6F6F7E';
  };

  return (
    <div>
      <div
      className='my-4 mx-5'
        onClick={toggleCollapse}
        style={{
          cursor: 'pointer',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '8px',
          backgroundColor: '#fff',
          color: '#6F6F7E',
          transition: 'background-color 0.3s ease-in-out, color 0.3s ease-in-out',
          borderRadius: '8px',
        }}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        <span style={{ display: 'flex', alignItems: 'center' }}>
          {icon && React.cloneElement(icon, { className: 'submenu-icon', size: 18, color: '#6F6F7E', style: { marginRight: '8px' } })}
          <span style={{ fontWeight: '500' }}>{label}</span>
        </span>
        <span>
          {isCollapsed ? (
            <FaPlusCircle size={14}  className="fa-plus-circle" />
          ) : (
            <FaMinusCircle size={14} className="fa-minus-circle" />
          )}
        </span>
      </div>
      {!isCollapsed && (
        <div style={{ paddingLeft: '16px' }}>
          {children}
        </div>
      )}
    </div>
  );
};

export default CustomSubMenu;
