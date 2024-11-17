import React from 'react'

function CheckboxPermissions({name,onChange,label,isRequired,id, checked, type }) {
  return (
    <div>
        <div class="flex items-start space-x-3 py-2">
            <input type={type} name={name} id={id} isRequired={isRequired} checked={checked} onChange={onChange}   class="border-gray-300 rounded h-5 w-5" />
            <div class="flex flex-col">
                <h1 class="text-[#198d85] font-medium leading-none">{label}</h1>
                <p class="text-xs text-gray-500 mt-2 leading-4"></p>
             </div>
        </div>
    </div>
  )
}

export default CheckboxPermissions;