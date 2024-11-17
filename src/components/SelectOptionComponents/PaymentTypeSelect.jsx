import React, { useState, useEffect } from 'react';
import SelectInputWC from '../FormWithoutClass/SelectInputWC';

const PaymentTypeSelect = (props) => {
  
  const paymentTypeOptions = [
    { value: 'Cash', label: 'Cash' },
    { value: 'Bank', label: 'Bank' },
    // Add more options as needed
  ];

  const [selectedValue, setSelectedValue] = useState(props.value);

  useEffect(() => {
    setSelectedValue(props.value);
  }, [props.value]);

  const handleChange = (newValue) => {
    setSelectedValue(newValue);
    props.onChange(newValue);
  };

  return (
    <SelectInputWC
      {...props}
      value={selectedValue}
      options={paymentTypeOptions}
      onChange={handleChange}
      placeholder={`Select payment type`}
      isClearable={true}
    />
  );
};

export default PaymentTypeSelect;
