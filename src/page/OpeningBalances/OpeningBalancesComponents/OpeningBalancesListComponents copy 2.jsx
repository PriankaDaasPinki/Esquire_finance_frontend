import React, { useState } from 'react';
import { Table, Alert, Input, Button } from 'antd';
import useFetchListDataWOPagination from '../../../customHook/useFetchListDataWOPagination';
import LoadingSpinner from '../../../components/LoadingSpinner';

const OpeningBalancesListComponents = ({ apiEndpoint }) => {
  const [searchText, setSearchText] = useState('');
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [editableRowKeys, setEditableRowKeys] = useState([]);
  const params = {
    search: searchText,
    start_date: startDate,
    end_date: endDate,
  };

  const { data, isLoading, error } = useFetchListDataWOPagination(`${apiEndpoint}`, params);

  const dataSource = (Array.isArray(data) ? data : []).map((item, index) => ({
    key: index,
    id: 4805,
    l0_base_group: item?.l0_base_group,
    l1_sub_group: item?.l1_sub_group,
    l2_base_group: item?.l2_base_group,
    l3_base_group: item?.l3_base_group,
    l4_base_group: item?.l4_base_group,
    l5_base_group: item?.l5_base_group,
    l6_ledger: item?.l6_ledger,
    opening_debit: item?.opening_debit,
    opening_credit: item?.opening_credit
  }));

  console.log('dataSource',dataSource)


  const columns = [
    { title: 'ID', dataIndex: 'id', key: 'id' },
    { title: 'L0', dataIndex: 'l0_base_group', key: 'l0_base_group' },
    { title: 'L1', dataIndex: 'l1_sub_group', key: 'l1_sub_group' },
    { title: 'L2', dataIndex: 'l2_base_group', key: 'l2_base_group' },
    { title: 'L3', dataIndex: 'l3_base_group', key: 'l3_base_group' },
    { title: 'L4', dataIndex: 'l4_base_group', key: 'l4_base_group' },
    { title: 'L5', dataIndex: 'l5_base_group', key: 'l5_base_group' },
    {
      title: 'DR TK',
      dataIndex: 'opening_debit',
      key: 'opening_debit',
      render: (_, record) => (
        editableRowKeys.includes(record.key) ? (
          <Input
            defaultValue={record.opening_debit}
            onChange={(e) => handleEditFieldChange(record.key, 'opening_debit', e.target.value)}
          />
        ) : (
          record.opening_debit
        )
      ),
    },
    {
      title: 'CR TK',
      dataIndex: 'opening_credit',
      key: 'opening_credit',
      render: (_, record) => (
        editableRowKeys.includes(record.key) ? (
          <Input
            defaultValue={record.opening_credit}
            onChange={(e) => handleEditFieldChange(record.key, 'opening_credit', e.target.value)}
          />
        ) : (
          record.opening_credit
        )
      ),
    },
    {
      title: 'ACTIONS',
      dataIndex: 'actions',
      render: (_, record) => (
        <div className='flex gap-2'>
          {editableRowKeys.includes(record.key) ? (
            <Button onClick={() => handleSave(record.key)}>Save</Button>
          ) : (
            <Button onClick={() => handleEdit(record.key)}>Edit</Button>
          )}
        </div>
      ),
    },
  ];

  const handleEdit = (key) => {
    setEditableRowKeys((prev) => [...prev, key]);
  };

  const handleSave = (key) => {
    setEditableRowKeys((prev) => prev.filter((k) => k !== key));
    // Here you would typically also make an API call to save changes
    // Example: saveData(key);
  };

  const handleEditFieldChange = (key, field, value) => {
    const newDataSource = dataSource.map((item) => {
      if (item.key === key) {
        return { ...item, [field]: value };
      }
      return item;
    });
  };

  if (isLoading) {
    return <LoadingSpinner />;
  }

  return (
    <div>
      {error && <Alert message="Error" description="Failed to load data." type="error" showIcon />}
      <div className='shadow-lg overflow-x-auto'>
          <Table
            columns={columns}
            dataSource={dataSource}
            rowClassName={(record, index) =>
              index % 2 === 0 ? 'bg-white' : 'bg-gray-100'
            }
            pagination={{
              pageSize: 100,  // default page size
              showSizeChanger: false, 
            }}
          />
      </div>
    </div>
  );
};

export default OpeningBalancesListComponents;
