import React, { useState, useEffect } from 'react';
import { Table, Alert, Input, Button, message } from 'antd';
import useFetchListDataWOPagination from '../../../customHook/useFetchListDataWOPagination';
import LoadingSpinner from '../../../components/LoadingSpinner';
import axios from 'axios';  // Assuming you're using axios for API calls
import ExportDataComponent from '../../../components/ExportDataComponent';

const OpeningBalancesListComponents = ({ apiEndpoint }) => {
  const [searchText, setSearchText] = useState('');
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [localDataSource, setLocalDataSource] = useState([]);

  const params = {
    search: searchText,
    start_date: startDate,
    end_date: endDate,
  };

  const { data, isLoading, error } = useFetchListDataWOPagination(`${apiEndpoint}`, params);

  useEffect(() => {
    if (Array.isArray(data)) {
      const mappedData = data.map((item, index) => ({
        key: index,
        id: item.id || index, // Use item.id if available, fallback to index
        l0_base_group: item?.l0_base_group,
        l1_sub_group: item?.l1_sub_group,
        l2_base_group: item?.l2_base_group,
        l3_base_group: item?.l3_base_group,
        l4_base_group: item?.l4_base_group,
        l5_base_group: item?.l5_base_group,
        l6_ledger: item?.l6_ledger,
        opening_debit: item?.opening_debit,
        opening_credit: item?.opening_credit,
      }));
      setLocalDataSource(mappedData);
    }
  }, [data]);

  const handleEditFieldChange = (key, field, value) => {
    const newDataSource = localDataSource.map((item) => {
      if (item.key === key) {
        return { ...item, [field]: value };
      }
      return item;
    });
    setLocalDataSource(newDataSource); // Persist changes in state
  };

  const handleSave = async () => {
    try {

      console.log(localDataSource)
      // Assuming you are using a PUT request to update the data
      // Replace 'your-save-endpoint' with the actual API endpoint for saving the data
      const response = await axios.put(`${apiEndpoint}/save`, localDataSource); 

      // Handle the response (e.g., check if the update was successful)
      if (response.status === 200) {
        message.success('Data saved successfully!');
      } else {
        message.error('Failed to save data.');
      }
    } catch (error) {
      console.error('Error saving data:', error);
      message.error('An error occurred while saving.');
    }
  };

  const columns = [
    { title: 'ID', dataIndex: 'id', key: 'id' ,width: 150, },
    { title: 'L0', dataIndex: 'l0_base_group', key: 'l0_base_group',width: 150, },
    { title: 'L1', dataIndex: 'l1_sub_group', key: 'l1_sub_group' ,width: 150,},
    { title: 'L2', dataIndex: 'l2_base_group', key: 'l2_base_group',width: 150, },
    { title: 'L3', dataIndex: 'l3_base_group', key: 'l3_base_group' ,width: 150,},
    { title: 'L4', dataIndex: 'l4_base_group', key: 'l4_base_group' ,width: 150,},
    { title: 'L5', dataIndex: 'l5_base_group', key: 'l5_base_group' ,width: 150,},
    {
      title: 'DR TK',
      dataIndex: 'opening_debit',
      key: 'opening_debit',
      width: 150,
      render: (_, record) => (
        <Input
          value={record.opening_debit} // Bind the current value to the input
          onChange={(e) => handleEditFieldChange(record.key, 'opening_debit', e.target.value)}
        />
      ),
    },
    
    {
      title: 'CR TK',
      dataIndex: 'opening_credit',
      key: 'opening_credit',
      width: 150,
      render: (_, record) => (
        <Input
          value={record.opening_credit} // Bind the current value to the input
          onChange={(e) => handleEditFieldChange(record.key, 'opening_credit', e.target.value)}
        />
      ),
    },
  ];

  if (isLoading) {
    return <LoadingSpinner />;
  }

  return (
    <div>
      {error && <Alert message="Error" description="Failed to load data." type="error" showIcon />}
      
      {localDataSource?.length > 0 &&( 
      <div className='flex justify-between mx-4 md:mx-0 shadow-md border bg-[#fff] p-2 rounded my-1'>
        <ExportDataComponent
          apiEndpoint={apiEndpoint}
          filename="opening_balances" 
          isCsv={true}
          isExcel={true}
          isPdf={true}
          searchText={''}
          startDate={''}
          endDate={''}
        />

      {/* Global Save Button */}
        <Button onClick={handleSave} className='p-5 my-auto font-semibold bg-[#2e6da4] text-[#fff]'>
          Update
      </Button>
      </div>
      )}
      
      <div className="shadow-lg ">
        <Table
          columns={columns}
          dataSource={localDataSource}
          rowClassName={(record, index) => (index % 2 === 0 ? 'bg-white' : 'bg-gray-100')}
          pagination={{
            pageSize: 100,  // default page size
            showSizeChanger: false,
          }}
          // scroll={{
          //   y: "100vh",
          // }}
        />
      </div>
    </div>
  );
};

export default OpeningBalancesListComponents;
