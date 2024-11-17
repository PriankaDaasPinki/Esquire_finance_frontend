// StoreMasterSelect.js

import React, { useState, useEffect } from 'react';
import { authAxiosWithBearer, baseURL } from '../../baseURL';
import SelectInputWC from '../FormWithoutClass/SelectInputWC';

const StoreSelect = (props) => {
  const [storeOptions, setStoreOptions] = useState([]);
  const [selectedValue, setSelectedValue] = useState(props.value);

  useEffect(() => {
    const fetchStoreData = async () => {
      try {
        const response = await authAxiosWithBearer.get(`${baseURL}/inventory/api/storemaster-list/`);
        setStoreOptions(response.data.results.map((data) => ({
          value: data.id,
          label: data.name,
        })));
      } catch (error) {
        console.log(error);
      }
    };

    fetchStoreData();
  }, []);

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
      options={storeOptions}
      onChange={handleChange}
      placeholder={`Select Store`}
      isClearable={true} 
    />
  );
};

export default StoreSelect;
