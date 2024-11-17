import React from 'react';
import Select, { StylesConfig } from 'react-select';
import '../../assest/CSS/ReactSelectCustomize.css'

function SelectInput({name,onChange,label,isRequired,id,value,options,isMulti,placeholder,className,isClearable,onInputChange }) {

      const InputLableStyle ={
        color: '#2e6da4',
        textAlign: 'center',
        fontFamily: 'Inter',
        fontSize: '15px',
        fontStyle: 'normal',
        fontWeight: '600',
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
                    className={`${
                      className
                      } appearance-none border-[1px] w-[170px] md:w-[330px] lg:w-[330px] focus:outline-none focus:bg-white focus:border-[#2e6da4]`}
                    id={id}
                    name={name}
                    value={value}
                    onChange={onChange}
                    options={options}
                    {...(isRequired && { required: true })}
                    isMulti={isMulti}
                    onInputChange={onInputChange}
                    placeholder={placeholder}
                    isClearable={isClearable}       
                    />

            </div>
            <div className="text-xl absolute top-[-25px] left-1 md:left-2 bg-[#fff] px-1">
                <label style={InputLableStyle} className="login-input-label mb-3">{label}</label>
            </div>
        </div>
</div>
  )
}

export default SelectInput