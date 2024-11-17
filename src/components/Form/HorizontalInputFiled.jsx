import React from 'react'
import '../../assest/CSS/HorizontalInputField.css'

function HorizontalInputFiled({label,placeholder,type,onChange,value,name,id,required,labelFontWeight}) {
  return (
      <div className="flex flex-wrap">
          <div className="w-[30%] md:w-[35%] mt-1">
              <label className={`hif-lable ${labelFontWeight}`}>
                  {label}
              </label>
          </div>
          <div className="w-[70%] md:w-[65%]">
              <input
                  class="hif-input w-[100%] text-gray-700 border border-gray-400 rounded-[5px] py-2 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-[#2e6da4]"
                  type={type}
                  placeholder={placeholder}
                  onChange={onChange}
                  value={value}
                  name={name}
                  id={id}
                  required={required}
              />
          </div>
      </div>
  )
}

export default HorizontalInputFiled