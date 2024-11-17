import React from 'react'
import '../../assest/CSS/HorizontalSelectField.css'
import Select, { StylesConfig } from 'react-select';
import '../../assest/CSS/HorizontalSelectField.css'

function HorizontalSelectField({name,onChange,label,required,id,value,options,isMulti,labelFontWeight}) {
  return (
      <div className="flex flex-wrap HorizontalSelectField">
          <div className="w-[30%] md:w-[35%] mt-1">
              <label class={`hsf-lable ${labelFontWeight}`}>
                  {label}
              </label>
          </div>
          <div className="w-[70%] md:w-[65%]">
          <Select
                className={`appearance-none rounded-[5px] border-[1px] w-[100%] focus:outline-none focus:bg-white focus:border-[#2e6da4] `}
                id={id}
                name={name}
                value={value}
                onChange={onChange}
                options={options}
                required={required}
                isMulti={isMulti}
                />
          </div>
      </div>
  )
}

export default HorizontalSelectField