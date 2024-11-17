import React, { useState } from 'react';
import { IoMdEye, IoMdEyeOff } from "react-icons/io";

function PasswordFiled({ name, placeholder, onChange, label, isRequired, id, value, type, className, step, min, max, pattern, onInput, error, maxLength, minLength }) {
  const [showPassword, setShowPassword] = useState(false);

  const handleTogglePassword = () => {
    setShowPassword((prevShowPassword) => !prevShowPassword);
  };

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

  const InputLabelStyle = {
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
    padding: '2px',
  };

  return (
    <div>
      <div className="relative">
        <div className="w-full">
          <input
            className={`${
              className
            } pl-3 py-5 appearance-none border-[1px] border-[#9d9c9c] h-[39.535px] w-[170px] md:w-[330px] lg:w-[330px] focus:outline-none focus:bg-white focus:border-[#2e6da4]`}
            name={name}
            value={value}
            type={showPassword ? 'text' : type}
            id={id}
            placeholder={placeholder}
            onChange={onChange}
            {...(isRequired && { required: true })}
            style={InputStyle}
            step={step}
            min={min}
            max={max}
            minLength={minLength}
            maxLength={maxLength}
            pattern={pattern}
            onInput={onInput}
            error={error}
          />
          {type === 'password' && (
            <button
              type="button"
              onClick={handleTogglePassword}
              className="absolute inset-y-0 left-[140px] md:left-[300px] lg:left-[290px]  flex items-center cursor-pointer"
            >
              {showPassword ? (
                  <IoMdEye />
              ) : (
                <IoMdEyeOff />
              )}
            </button>
          )}
        </div>
        <div className="text-xl absolute top-[-25px] left-1 md:left-2 bg-[#fff] px-1">
          <label style={InputLabelStyle} className="login-input-label mb-3">{label}</label>
        </div>
      </div>
    </div>
  );
}

export default PasswordFiled;
