import React, { useEffect, useState } from 'react';
import { Table, DatePicker, Pagination } from 'antd';
import { AiFillDelete, AiFillEdit, AiFillEye, AiOutlineSearch } from 'react-icons/ai';
import { Link, useNavigate } from 'react-router-dom';
import CustomPaginator from '../../../components/CustomPaginator';
import useFetchListData from '../../../customHook/useFetchListData';
import LoadingSpinner from '../../../components/LoadingSpinner';
import { authAxios, baseURL } from '../../../baseURL';
import usePermissions from '../../../hooks/usePermissions';
import FinancialYearAddModalButton from '../financialYearModal/FinancialYearAddModalButton';
import Swal from 'sweetalert2';


const FinancialYearListComponent = ({ apiEndpoint, detailsURL, detailsPermissionCode }) => {
  const navigate = useNavigate();
  const [searchText, setSearchText] = useState('');
  const [dataStatus, setDataStatus] = useState('all');
  const [currentPage, setCurrentPage] = useState(1);
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [loading, setLoading] = useState(false)

  const {hasPermission} = usePermissions();

  const params = {
    page: currentPage,
    search: searchText,
    start_date: startDate,
    end_date: endDate,
  };

  const { data, totalItems, isLoading, error, fetchData } = useFetchListData(`${apiEndpoint}`, params);

  useEffect(() => {
    fetchData();
  }, [currentPage, searchText, dataStatus, endDate, startDate]);

  const handleSearch = (value) => {
    setSearchText(value);
  };

  const dataSource = data?.flatMap((data, index) => ({
    key: index,
    id: data?.id,
    financial_year: data?.financial_year,
    start_date: data?.start_date,
    end_date: data?.end_date,
    status: data?.status === false ?
    <div className='bg-red-500 text-[#fff] w-[70px] text-center rounded-[10px] p-[1px]'>Inactive</div> 
    :<div className='bg-green-500 text-[#fff] w-[70px] text-center rounded-[10px] p-[1px]'>Active</div>,
    is_close: data?.is_close === false ?
    <div className='bg-red-500 text-[#fff] w-[70px] text-center rounded-[10px] p-[1px]'>Inactive</div> 
    :<div className='bg-green-500 text-[#fff] w-[70px] text-center rounded-[10px] p-[1px]'>Active</div>,
  }))


  const columns = [
    {
      title: 'SN',
      key: 'key',
      render: (text, record, index) => {
        return (currentPage - 1) * 10 + index + 1;
      },
    },
    {
      title: 'Financial Year',
      dataIndex: 'financial_year',
      key: 'financial_year',
    },
    {
      title: 'Start Date',
      dataIndex: 'start_date',
      key: 'start_date',
    },
    {
      title: 'End Date',
      dataIndex: 'end_date',
      key: 'end_date',
    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
    },
    {
      title: 'ACTIONS',
      dataIndex: 'actions',
      render: (_, record) => (
        <div className='flex gap-2'>
          {/* {user?.menu_permissions?.includes(`${detailsPermissionCode}`) && ( */}
          {/* {hasPermission('view_user') && (
          <button onClick={() => navigate(`${detailsURL}${record.id}`)} className='rounded'>
            <AiFillEye className='text-[#C9CD33] text-xl' title='show' />
          </button>
          )} */}
           {/* {hasPermission('change_user') && (
          <button onClick={() => navigate(`${detailsURL}${record.id}/edit`)} className='rounded'>
            <AiFillEdit className='text-[#2929ff] text-xl' title='Edit' />
          </button>
           )} */}
           {hasPermission('change_financialyears') && (
           <FinancialYearAddModalButton
                id={`${record.id}`}
                ActionURL={`in_house/api/assigned-transport-product-received-status-change`}
                redirectURL={'assigned-transport-details'}  
                fetchDetailsData={fetchData}
                buttonName={<AiFillEdit className='text-[#2929ff] text-xl' title='Edit' />}
                />
              )}
              {hasPermission('delete_financialyears') && (
          <button onClick={(e) => deleteRecord(e, record.id)} className='rounded'>
            <AiFillDelete className='text-[#B1394E] text-xl' title='Delete' />
          
          </button>
          )}
          {/* )} */}
        </div>
      ),
    },

  ];


  const deleteRecord = async (e, id) => {
    const result = await Swal.fire({
      title: 'Confirm Delete',
      text: 'Are you sure you want to delete this ??',
      icon: 'question',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'Yes, delete it!',
    });

    if (result.isConfirmed) {
      try {
        const response = await authAxios.delete(`${baseURL}drf-finance/financial-years/${id}/`);
        if (response.status === 204) {
          Swal.fire('Deleting...!', `Deleted Successfully`, 'success');
          console.log(response.data);
        } else {
          console.log(response);
          Swal.fire('Error', 'An error occurred while deleting the record.', 'error');
        }
      } catch (error) {
        console.error(error);
        Swal.fire('Error', 'An error occurred while deleting the record.', 'error');
      } finally{
         fetchData();
      }
    }
  };


  // const deleteStudent = (e, id) => {
  //   e.preventDefault();
  //   const thisClicked = e.currentTarget;
  //   thisClicked.innerText = "Deleting...";

  //   authAxios.delete(`${baseURL}drf-finance/users/${id}/`)
  //     .then((res) => {
  //       alert(res.data.message);
  //       thisClicked.innerText = "Deleted"; // Optionally reset the button text
  //     })
  //     .catch((err) => {
  //       console.error(err);
  //       thisClicked.innerText = "Delete"; // Reset the button text on error
  //       alert('An error occurred while deleting the user.');
  //     });
  // };



  return (
    <>
      <div className='container-fluid grid grid-cols-1 bg-[#fff]'>
      <div>
        <div className='page-header mb-2 px-4 py-2 md:pt-5'>
          <div className="flex justify-between">
            <div className='page-title'>
              <h1 className='uppercase font-semibold'>Financial Year List</h1>
            </div>
            <div className="page-search-and-add-new-button flex">
              <div className="page-search mr-2 hidden md:flex ">
                <div className="relative">
                  <input
                    className="page-search-input w-[150px] md:w-[214px] appearance-none focus:outline-none focus:bg-white focus:border-[#2e6da4]"
                    type="text"
                    name="search"
                    required
                    onChange={(e) => handleSearch(e.target.value)}
                    placeholder="Search here"
                  />
                  <div className="text-xl absolute top-[5px] right-3">
                    <button className="page-search-button" type="submit">
                      <AiOutlineSearch className="text-[#fff] mx-auto" />
                    </button>
                  </div>
                </div>
              </div>

              {hasPermission('add_financialyears') && (
                <div className="add-new-button px-2">
                  <FinancialYearAddModalButton
                    ActionURL={`in_house/api/assigned-transport-product-received-status-change`}
                    redirectURL={'assigned-transport-details'}  
                    fetchDetailsData={fetchData}
                    buttonName={'Add New'}
                  />
              </div>
              )}
              


            </div>
          </div>

          <div className='page-search md:hidden mt-2'>
          <div className='relative'>
            <input
              placeholder='Search here'
              className='page-search-input w-[100%] appearance-none focus:outline-none focus:bg-white focus:border-[#2e6da4]'
              type='text'
              name='search'
              required
              onChange={(e) => handleSearch(e.target.value)}
            />
            <div className='text-xl absolute top-[-5px] right-0'>
              <button className='page-search-button p-[17px] px-6' type='submit'>
                <AiOutlineSearch className='text-[#fff] mt-[-10px] mx-[-10px]' />
              </button>
            </div>
          </div>
        </div>
        </div>
      </div>


      {isLoading ? (
        <p><LoadingSpinner /></p>
      ) : (
        <>
          <div className='shadow-lg overflow-x-auto'>
            <Table
              columns={columns}
              dataSource={dataSource}
              rowClassName={(record, index) =>
                index % 2 === 0 ? 'bg-white' : 'bg-gray-100'
              }
              pagination={false}
            />
            <div className='my-5'>
              <CustomPaginator
                setCurrentPage={setCurrentPage}
                currentPage={currentPage}
                totalItems={totalItems}
              />
            </div>
          </div>
        </>
      )}
      </div>
    </>
  );
};



export default FinancialYearListComponent;
