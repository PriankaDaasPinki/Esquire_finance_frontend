// SupplierSelect.js

import React, { useState, useEffect } from 'react';
import { authAxiosWithBearer, baseURL } from '../../baseURL';
import SelectInputWC from '../FormWithoutClass/SelectInputWC';

const SupplierSelect = (props) => {
  const [supplierOptions, setSupplierOptions] = useState([]);
  const [selectedValue, setSelectedValue] = useState(props.value);
  const [supplierSearchInputValue, setSupplierSearchInputValue] = useState(null);


  useEffect(() => {
      authAxiosWithBearer.get(`${baseURL}/inventory/api/supplier-list/?search=${supplierSearchInputValue}`)
          .then(response => {
            setSupplierOptions(response.data.results.map(data => ({
                value: data.id,
                label: data.name,
              })));

              console.log(response.data.results)
          })
          .catch(error => {
              console.error('Error fetching data:', error);
          });
  }, [supplierSearchInputValue]);

  const handleSupplierSearchInputChange = (value) => {
    setSupplierSearchInputValue(value);
  };


  useEffect(() => {
    setSelectedValue(props.value);
  }, [props.value]);

  const handleChange = (newValue) => {
    setSelectedValue(newValue);
    if (props.onChange) {
      props.onChange(newValue);
    }
  };

  return (
    <SelectInputWC
      {...props}
      value={selectedValue}
      options={supplierOptions}
      onChange={handleChange}
      onInputChange={handleSupplierSearchInputChange}
      placeholder={`Select supplier`}
      isClearable={true} 
    />
  );
};

export default SupplierSelect;
