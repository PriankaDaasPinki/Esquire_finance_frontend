import React from 'react'
 
function InputFiled({name,placeholder,onChange,label,isRequired,id, value, type,className,step,min,max,pattern,oninput,error,maxlength,minlength,readOnly }) {
 
    const InputStyle = {
        display: 'inline-flex',
        flexDirection: 'column',
        alignItems: 'flex-start',
        gap: '28px',
        borderRadius: 'var(--none, 0px)',
        strokeEidth: '0.5px',
        fontSize: '13px',
        borderRadius: '3px',
        background: '#FFF',
        boxShadow: '0px 2px 4px 0px rgba(0, 0, 0, 0.25)',
      };
 
      const InputLableStyle ={
        color: '#E74A3B',
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
                <input
                    className={`${
                      className
                      } pl-3 py-5 appearance-none border-[1px] border-[#9d9c9c] h-[39.535px] w-[170px] md:w-[330px] lg:w-[300px] focus:outline-none focus:bg-white focus:border-[#2e6da4]`}
                    name={name}
                    value={value}
                    type={type}
                    id={id}
                    placeholder={placeholder}
                    onChange={onChange}
                    {...(isRequired && { required: true })}
                    style={InputStyle}
                    step={step}
                    min={min}
                    max={max}
                    minlength={minlength}
                    maxLength={maxlength}
                    pattern={pattern}
                    oninput={oninput}
                    error={error}
                    readOnly={readOnly}
                />
            </div>
            <div className="text-xl absolute top-[-25px] left-1 md:left-2 px-1">
                <label style={InputLableStyle} className="login-input-label mb-3">{label}</label>
            </div>
        </div>
</div>
  )
}
 
export default InputFiled