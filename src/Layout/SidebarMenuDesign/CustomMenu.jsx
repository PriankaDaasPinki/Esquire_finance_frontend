// CustomMenu.js
import React from 'react';

const CustomMenu = ({ label, icon, onClick, path, currentPath }) => {
  const isActive = currentPath === path;

  return (
    <div
      onClick={() => onClick(path)}
      className={`cursor-pointer p-2 my-4 font-semibold ${
        isActive ? 'text-[#2e6da4]' : 'bg-white text-[#6F6F7E]'
      } hover:bg-[#2e6da4] hover:text-[#fff] rounded-[8px] mx-5`}
    >
      <span style={{ display: 'flex', alignItems: 'center' }}>
        {icon && <span style={{ marginRight: '8px' }}>{icon}</span>}
        <span>{label}</span>
      </span>
    </div>
  );
};

export default CustomMenu;
