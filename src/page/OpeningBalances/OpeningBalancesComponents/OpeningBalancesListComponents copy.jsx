import React, { useState } from 'react'
import { Table } from 'antd'
import OpeningBalancesListPageHeadCom from './OpeningBalancesListPageHeadCom';
import useFetchListDataWOPagination from '../../../customHook/useFetchListDataWOPagination';
import LoadingSpinner from '../../../components/LoadingSpinner';

const OpeningBalancesListComponents = ({apiEndpoint}) => {

    const [searchText, setSearchText] = useState('');
    const [startDate, setStartDate] = useState(null);
    const [endDate, setEndDate] = useState(null);
    const params = {
      search: searchText,
      start_date: startDate,
      end_date: endDate,     
    };

    const { data, setData, isLoading, error, fetchData } = useFetchListDataWOPagination(`${apiEndpoint}`,params);


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
  
    
    
      const columns = [
        {
          title: 'ID',
          dataIndex: 'id',
          key: 'id',
        },
        {
          title: 'L0',
          dataIndex: 'l0_base_group',
          key: 'l0_base_group',
        },
        {
          title: 'L1',
          dataIndex: 'l1_sub_group',
          key: 'l1_sub_group',
        },
        {
          title: 'L2',
          dataIndex: 'l2_base_group',
          key: 'l2_base_group',
        },
        {
          title: 'L3',
          dataIndex: 'l3_base_group',
          key: 'l3_base_group',
        },
        {
          title: 'L4',
          dataIndex: 'l4_base_group',
          key: 'l4_base_group',
        },
        {
        title: 'L5',
        dataIndex: 'l5_base_group',
        key: 'l5_base_group',
        },
        {
        title: 'DR TK',
        dataIndex: 'opening_debit',
        key: 'opening_debit',
        },
        {
        title: 'CR TK',
        dataIndex: 'opening_credit',
        key: 'opening_credit',
        },
        {
          title: 'ACTIONS',
          dataIndex: 'actions',
          render: (_, record) => (
            <div className='flex gap-2'>
            </div>
          ),
        },
    
      ];

  if(isLoading){
    return <LoadingSpinner />
  }
      
  return (
    <div>
        <div className='shadow-lg overflow-x-auto'>
            <Table
              columns={columns}
              dataSource={dataSource}
              rowClassName={(record, index) =>
                index % 2 === 0 ? 'bg-white' : 'bg-gray-100'
              }
              pagination={false}
            />
          </div>
    </div>
  )
}

export default OpeningBalancesListComponents