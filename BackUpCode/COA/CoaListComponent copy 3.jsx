import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Tree from 'rc-tree';
import 'rc-tree/assets/index.css';
import '../../../assest/CSS/CoaTreeStyles.css';
import { AiOutlineSearch } from 'react-icons/ai';
import PageTitleComponent from '../../../components/PageTitleComponent';
import useFetchListDataWOPagination from '../../../customHook/useFetchListDataWOPagination';
import CoaUpdateFormComponent from './CoaUpdateComponent/CoaUpdateFormComponent';
import usePermissions from '../../../hooks/usePermissions';
import ExportDataComponent from '../../../components/ExportDataComponent';
import LoadingSpinner from '../../../components/LoadingSpinner';
import ScaleLoader from 'react-spinners/ScaleLoader';

const CoaListComponent = ({ apiEndpoint, detailsURL }) => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [parentNameOptions, setParentNameOptions] = useState([]);
  const [selectedParentName, setSelectedParentName] = useState(null);
  const { hasPermission } = usePermissions();
  const [createFormOpen, setCreateFormOpen]=useState(false)
  const [handleSelectLoading, setHandleSelectLoading] = useState(false);

  // api fetch start
  const [searchText, setSearchText] = useState('');
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const params = {
    search: searchText,
    start_date: startDate,
    end_date: endDate,     
  };
  const { data, setData, isLoading, error, fetchData } = useFetchListDataWOPagination(`${apiEndpoint}`,params);
  // api fetch end


  const [formData, setFormData] = useState({
    head_label:null,
    p_id:null,
    p_account_name: "",
    p_parent_id: null,
    p_is_active: false,
  });

  // parent name option set 
  useEffect(() => {
    setParentNameOptions(data?.map((datas) => ({
          value: datas.id,
          // label: Parentdata.id,
          label:datas.account_name, 
      })));
  }, [data]);


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
    setSearchTerm(value.trim().toLowerCase()); // Trim and convert to lowercase
 };
 

  const filterTreeData = (treeData) => {
    if (!searchTerm) return treeData;
    return treeData
      ?.filter(node => node.title.toLowerCase().includes(searchTerm) || (node.children && filterTreeData(node.children).length > 0))
      ?.map(node => ({
        ...node,
        children: filterTreeData(node.children || []),
      }));
  };



  const handleSelect = (selectedKeys, info) => {
      setHandleSelectLoading(true);  // Start loading
      const selectedNode = info.node;
      if (selectedNode) {
        setTimeout(() => {
          const nodeData = data.find(item => item.id === selectedNode.key);
          setHandleSelectLoading(false);  // Stop loading
          if (nodeData) {
            const parentName = nodeData.parent_id ? data.find(fData => fData.id === nodeData.parent_id) : null;
            setFormData({
              ...formData,
              p_id: nodeData.id,
              head_label: nodeData.head_level,
              p_account_name: nodeData.account_name,
              p_is_active: nodeData.is_active === 'false' ? false : true,
              p_parent_id: nodeData.parent_id,
            });
            setSelectedParentName(parentName ? { value: parentName.id, label: parentName.account_name } : null);
          }
        }, 500);  // Simulate some delay
      }
  };
 

  const handleInputChange = useCallback((e) => {
    const { name, value } = e.target;
    setFormData(prevData => ({ ...prevData, [name]: value }));
 }, []);
 

  const handleParentNameChange = (selectedOption) => {
    const ParentNameID = selectedOption ? selectedOption.value : ''; 
    setSelectedParentName(selectedOption);
    setFormData({
      ...formData,
      p_parent_id: ParentNameID,
    });
  };


  const handleStatusChange = (e) => {
    const isActive = e.target.value === "true"; // Convert the string back to boolean
    setFormData((prevData) => ({
      ...prevData,
      p_is_active: isActive,
    }));
  };


  const filteredTreeData = useMemo(() => filterTreeData(buildTree(data)), [data, searchTerm]);



  const validateFormData = () => {
    const formValidationErrors = {};
    // Check if head label is empty
    if (!formData?.head_label?.trim()) {
      formValidationErrors.head_label = "head_label is required.";
    }
    if (!formData?.p_account_name?.trim()) {
      formValidationErrors.p_account_name = "account name is required.";
    }

  return formValidationErrors;
  };
  
    const hndaleCreateFormOpen = () =>{
      setCreateFormOpen(true)
      setFormData(prevFormData => ({
        ...prevFormData,
        p_account_name: "",  
      }));
    }
    
    const hndaleCreateFormClose = () =>{
      setCreateFormOpen(false)
      console.log('formData.',formData)
      console.log('data.',data)
      setFormData({
        head_label: formData.head_label,
        p_id: formData.p_id,
        p_account_name: data.filter((fData)=>fData.id === formData.p_id).map((mData)=>mData.account_name),
        p_parent_id: formData.p_parent_id,
        p_is_active: formData.p_is_active,
      });
      setSelectedParentName(formData.p_parent_id ? {
        value: formData.p_parent_id,
        label:data.filter((fData)=>fData.id === formData.p_parent_id).map((mData)=>mData.account_name),
      } : null);
    }


  return (
    <div className="coa-tree">
      <PageTitleComponent title={'Chart Of Accounts'} />


      <ExportDataComponent
        apiEndpoint={apiEndpoint}
        filename="chart_of_account" 
        isCsv={true}
        isExcel={true}
        isPdf={true}
        searchText={''}
        startDate={''}
        endDate={''}
      />


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


          {handleSelectLoading && 
            <ScaleLoader color={'#2e6da4'} loading={handleSelectLoading} size={5} />
          } 

          {isLoading?
          <LoadingSpinner />
          :
          <Tree
            treeData={filteredTreeData}
            checkable
            icon
            showLine
            showIcon
            onSelect={handleSelect}
          />
          }
        </div>
          <CoaUpdateFormComponent 
            formData={formData} 
            fetchData={fetchData}
            validateFormData={validateFormData} 
            handleInputChange={handleInputChange}
            selectedParentName={selectedParentName}
            handleParentNameChange={handleParentNameChange}
            parentNameOptions={parentNameOptions}
            handleStatusChange={handleStatusChange}
            setFormData={setFormData}
            setSelectedParentName={setSelectedParentName}
            hasPermission={hasPermission}
            createFormOpen={createFormOpen}
            setCreateFormOpen={setCreateFormOpen}
            hndaleCreateFormOpen={hndaleCreateFormOpen}
            hndaleCreateFormClose={hndaleCreateFormClose}
          />
      </div>
    </div>
  );
};

export default CoaListComponent;
