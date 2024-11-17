import React from 'react';
import Select, { StylesConfig } from 'react-select';
import '../../assest/CSS/ReactSelectCustomize.css'

function SelectInputWC({name,onChange,label,isRequired,id,value,options,isMulti,placeholder,className,isClearable,onInputChange }) {

      const InputLableStyle ={
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
        padding:'2px'
      }


  return (
    <div>
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
                    {...(isRequired && { required: true })}
                    isMulti={isMulti}
                    placeholder={placeholder}
                    isClearable={isClearable}               
                    />
            </div>
            <div className="text-xl absolute top-[-25px] left-1 md:left-2 px-1">
                <label style={InputLableStyle} className="login-input-label mb-3">{label}</label>
            </div>
        </div>
</div>
  )
}

export default SelectInputWC;