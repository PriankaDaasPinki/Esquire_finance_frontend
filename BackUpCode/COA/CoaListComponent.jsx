import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import useFetchListDataWOPagination from '../../../customHook/useFetchListDataWOPagination';
import LoadingSpinner from '../../../components/LoadingSpinner';

import Tree from 'rc-tree';
import 'rc-tree/assets/index.css';
import '../../../assest/CSS/CoaTreeStyles.css'
import { AiOutlineSearch } from 'react-icons/ai';
import PageTitleComponent from '../../../components/PageTitleComponent';
import HorizontalInputFiled from '../../../components/Form/HorizontalInputFiled';
import HorizontalSelectField from '../../../components/Form/HorizontalSelectField';
import CustomCreateButton from '../../../components/Form/CustomCreateButton';
import CustomUpdateButton from '../../../components/Form/CustomUpdateButton';
import CustomDeleteButton from '../../../components/Form/CustomDeleteButton';

const CoaListComponent = ({ apiEndpoint, detailsURL }) => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  // const { data, isLoading, error, fetchData } = useFetchListDataWOPagination(`${apiEndpoint}`);


  const data = [
    { id: '1', parent_id: '#', account_name: '100000-Assets' },
    { id: '2', parent_id: '#', account_name: '200000-Expenses' },
    { id: '3', parent_id: '#', account_name: '300000-Income' },
    { id: '4', parent_id: '#', account_name: '400000-Liability' },
    { id: '5', parent_id: '#', account_name: '500000-Share Holder Equity' },
    { id: '6', parent_id: '1', account_name: '110000-Current Asset' },
    { id: '7', parent_id: '1', account_name: '120000-Fixed Asset' },
    { id: '8', parent_id: '2', account_name: '120000-Fixed Asset' },
    { id: '9', parent_id: '6', account_name: '120000-Fixed Asset' },
    { id: '10', parent_id: '5', account_name: '120000-Fixed Asset' },
    { id: '11', parent_id: '5', account_name: '120000-Fixed Asset' },
    { id: '12', parent_id: '11', account_name: '120000-Fixed Asset' },
  ];



  const buildTree = (data, parentId = '#') => {
    return data
      ?.filter(item => item?.parent_id === parentId)
      ?.map(item => ({
        title: item?.account_name,
        key: item?.id,
        children: buildTree(data, item?.id),
      }));
  };

  const handleSearch = (value) => {
    setSearchTerm(value.toLowerCase());
  };

  const filterTreeData = (treeData) => {
    if (!searchTerm) return treeData;

    return treeData
      .filter(node => node.title.toLowerCase().includes(searchTerm) || (node.children && filterTreeData(node.children).length > 0))
      .map(node => ({
        ...node,
        children: filterTreeData(node.children || []),
      }));
  };

  const treeData = buildTree(data);
  const filteredTreeData = filterTreeData(treeData);


  return (
    <div className="coa-tree">
      <PageTitleComponent title={'Chart Of Accounts'} />

      <div className="grid md:grid-cols-2 gap-x-16">
        <div className='coa-menu border p-2'>
          <div className='page-search mb-3'>
            <div className='relative'>
              <input
                className='page-search-input w-[100%] appearance-none focus:outline-none focus:bg-white focus:border-[#2e6da4]'
                type='text'
                name='search'
                required
                onChange={(e) => handleSearch(e.target.value)}
                placeholder='Search here'
              />
              <div className='text-xl absolute top-[-5px] right-0'>
                <button className='page-search-button p-[17px] px-6' type='submit'>
                  <AiOutlineSearch className='text-[#fff] mt-[-10px] mx-[-10px]' />
                </button>
              </div>
            </div>
          </div>
          <Tree
            treeData={filteredTreeData}
            checkable
            icon
            showLine
            showIcon
          />
        </div>
          <div className="coa-form p-2 border">
              <form>
                <div className='my-3'>
                  <HorizontalInputFiled 
                    label={"Head Label*"}
                    labelFontWeight={'font-semibold'}
                    // name
                    // id
                    // type
                    // onChange
                    // value
                    placeholder={'Enter head label'}
                    required={true}
                  />
                </div>
                <div className='my-3'>
                  <HorizontalInputFiled 
                    label={"Ledger Name*"}
                    labelFontWeight={'font-semibold'}
                    // name
                    // id
                    // type
                    // onChange
                    // value
                    placeholder={'Enter ledger name'}
                    required={true}
                  />
                </div>
                <div className="my-3">
                  <HorizontalSelectField
                    label={'Parent Name'}
                    id
                    name
                    value
                    onChange
                    options
                    required={false}
                  />
                </div>
                
                
                <div className='flex my-3'>
                    <div className='w-[30%] md:w-[35%]'>
                        Status
                    </div>
                    <div className='w-[70%] md:w-[65%]'>
                      <label className='mx-1'>
                          <input  type="radio" name="status" />
                          <span className="ml-1">Active</span>
                      </label>

                      <label className='mx-1'>
                        <input type="radio" name="status" />
                        <span className="ml-1">Disable </span>
                      </label>
                    </div>
                </div>

                <div className="flex gap-x-4 my-4">
                  <CustomCreateButton loading={false} permission={'add_permission'} />
                  <CustomUpdateButton loading={false} permission={'add_permission'} />
                  <CustomDeleteButton loading={false} permission={'add_permission'} />

                </div>
              </form>
        </div>
      </div>
    </div>
  );
};

export default CoaListComponent;