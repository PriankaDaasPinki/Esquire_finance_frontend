import React from 'react';
import Select, { StylesConfig } from 'react-select';
import '../../assest/CSS/ReactSelectCustomize.css'

const customStyles: StylesConfig = {
  menuPortal: (base) => ({
    ...base,
    zIndex: 9999 // Ensure dropdown appears above other elements
  }),
  menu: (base) => ({
    ...base,
    width: '100%' // Adjust width if necessary
  }),
  control: (base) => ({
    ...base,
    minHeight: '38px', // Ensure height is consistent
    boxShadow: 'none' // Remove default box shadow
  })
};

function SelectMultipleInput({name, onChange, label, isRequired, id, value, options, isMulti, placeholder, className, isClearable, onInputChange }) {
  const InputLableStyle = {
    color: '#2e6da4',
    textAlign: 'right',
    fontFamily: 'Inter',
    fontSize: '13px',
    fontStyle: 'normal',
    fontWeight: '500',
    lineHeight: 'normal',
    borderRadius: '3px',
    background: '#FFF',
    boxShadow: '0px 2px 4px 0px rgba(0, 0, 0, 0.25)',
    padding: '2px'
  }

  return (
    <div className='select-container'>
      <div className="relative">
        <div className="w-full">
          <Select
            className={className}
            id={id}
            name={name}
            value={value}
            onChange={onChange}
            onInputChange={onInputChange}
            options={options}
            isMulti={isMulti}
            placeholder={placeholder}
            isClearable={isClearable}
            styles={customStyles}
            menuPortalTarget={document.body} // Append dropdown to the body
          />
        </div>
        <div className="text-xl absolute top-[-25px] left-1 md:left-2 px-1">
          <label style={InputLableStyle} className="login-input-label mb-3">{label}</label>
        </div>
      </div>
    </div>
  )
}

export default SelectMultipleInput;
