// CustomMenu.jsx
import React from 'react';

const CustomSubMenuItem = ({ label, icon, onClick, path, currentPath}) => {
  const isActive = currentPath === path;
  return (
    <div
      onClick={onClick}
      className={`cursor-pointer p-2 my-4 ml-5 ${isActive ? 'text-[#2e6da4]' : 'bg-white text-[#6F6F7E]'} hover:text-[#2e6da4] rounded-[8px]`}
    >
      <span style={{ display: 'flex', alignItems: 'center' }}>
        {icon && <span style={{ marginRight: '8px' }}>{icon}</span>}
        <span>{label}</span>
      </span>
    </div>
  );
};

export default CustomSubMenuItem;
