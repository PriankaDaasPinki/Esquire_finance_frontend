import React, { useEffect, useState } from 'react';
import { authAxios, authAxiosWithBearer, authAxiosWithBearerWithContentTypeXwwwformUrlencoded, baseURL } from '../../../baseURL';
import { AiFillDelete, AiFillEdit, AiFillEye, AiOutlineSearch } from 'react-icons/ai';
import { Link, useNavigate } from 'react-router-dom';
import { Pagination, Table } from 'antd';
import Swal from 'sweetalert2';
import { FaUserCheck, FaUserXmark } from "react-icons/fa6";
import { MdMobileFriendly, MdMobileOff } from "react-icons/md";
import LoadingSpinner from '../../../Components/LoadingSpinner';

function UserDataListComponent({
  apiEndpoint,
  columnsConfig,
  title,
  SearchKey1,
  SearchKey2,
  SearchKey3,
  SearchKey4,
  sortOrder,
  setSortOrder,
  expandableKey1,
  expandableKey2,
  expandableKey3,
  expandableKey4,
  addNewURL,
  dataEditURL,
  deleteURL
}) {
  const navigate = useNavigate();
  const [data, setData] = useState([]);
  const [searchText, setSearchText] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const jwtToken = localStorage.getItem('token')
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);

  const [currentPage, setCurrentPage] = useState(1);
  const [totalItems, setTotalItems] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await authAxiosWithBearer.get(`${apiEndpoint}`, {
          params: {
            page: currentPage, 
            search: searchText    
          },
        });
  
        const { results, count } = response.data;
        const resultsData = results.map((item) => ({ ...item, key: item.id }));
  
        setTotalItems(count);
        setData(resultsData);
      } catch (error) {
        console.log(error);
      }
      finally {
        setIsLoading(false);
      }
    };
    fetchData();
  }, [startDate, endDate, apiEndpoint, currentPage, searchText]);




  const handleSearch = (value) => {
    setSearchText(value);
  };


  const handleUpdateStatus = async (itemId, currentStatus) => {
    const result = await Swal.fire({
      title: 'Confirm Status Update',
      text: 'Are you sure you want to update the status?',
      icon: 'info',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, update status!',
    });

    if (result.isConfirmed) {
      try {

        const newStatus = currentStatus === false ? true : false;

        const response = await authAxiosWithBearerWithContentTypeXwwwformUrlencoded.put(`${baseURL}/api/user_list/${itemId}/`, {
          status: newStatus
        });

        if (response) {
          const updatedData = data.map((item) =>
            item.id === itemId ? { ...item, status: newStatus } : item
          );
          setData(updatedData);

          Swal.fire('Status Updated!', 'The user status has been updated.', 'success');
        }
      } catch (error) {
        let errorMessage = 'Something went wrong while updating the status';
        Swal.fire('Error', errorMessage, 'error');
      }
    }
  };


  const filteredData = data?.filter(
    (item) =>
      item[SearchKey1]?.toLowerCase().includes(searchText.toLowerCase()) ||
      item[SearchKey2]?.toLowerCase().includes(searchText.toLowerCase()) ||
      item[SearchKey3]?.toLowerCase().includes(searchText.toLowerCase()) ||
      item[SearchKey4]?.toString().includes(searchText.toLowerCase())
  );

  const handlePaginationChange = (page) => {
    setCurrentPage(page);
  };


  if(isLoading){
    return <div><LoadingSpinner /></div>;
  }

  
  return (
    <>
      <div className="flex justify-between page-header mb-5">
        <div className="page-title my-auto ml-5">
          <h1 className='uppercase'>{title}</h1>
        </div>
        <div className="page-search-and-add-new-button flex my-auto mr-5">
          <div className="page-search mr-2">
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

          {addNewURL !== '' &&
          <div className="add-new-button px-2">
             <Link to={addNewURL}>Add New</Link>
          </div>
          }
          
        </div>
      </div>


      <Table
        columns={[
          ...columnsConfig.map((column) => ({
            ...column,
            sortOrder: column.dataIndex === sortOrder.columnKey ? sortOrder.order : false,
          })),

          {
            title: 'Actions',
            dataIndex: 'actions',
            render: (_, record) => (
              <div className='flex gap-2'>

                {dataEditURL !== '' &&
                <button title='edit' onClick={() => navigate(`${dataEditURL}/${record.id}`)} className='rounded'>
                  <AiFillEdit className='text-[#6F6F7E] text-xl' />
                </button>
                }

                <button title='Details' onClick={() => navigate(`/user-details/${record.id}`)} className='rounded'>
                  <AiFillEye className='text-[#5454ec] text-xl' />
                </button>


                {/* {deleteURL !== '' &&
                <button className='rounded ml-2' onClick={() => handleDelete(record.id)}>
                  <AiFillDelete className='text-xl text-[#2e6da4]' />
                </button>
                } */}

                {record.status == true? 
                <button title='Active' className='rounded ml-2' onClick={() => handleUpdateStatus(record.id, record.status)}>
                    
                    <FaUserCheck className='text-xl text-green-700' />
                </button>
                :
                <button title='Inactive' className='rounded ml-2' onClick={() => handleUpdateStatus(record.id, record.status)}>
                    <FaUserXmark className='text-xl text-[#FF0000]' />
                </button>
                }

              </div>
            ),
          },
        ]}
        expandable={{
          expandedRowRender: (record) => (
            <>
              <div>
                <div className='grid md:grid-cols-2 mx-2 my-2 gap-x-48 gap-y-2 border-b pb-2'>
                  <p className="expanded-row-content">
                    <div className='flex flex-wrap'>
                      <p className='w-[40%] md:w-[40%]'>Phone</p>
                      <p className='w-[5%] md:w-[5%] text-center'>-</p>
                      <p className='w-[55%] md:w-[55%] text-end'>{record?.phone_no}</p>
                    </div>
                  </p>
                  <p className="expanded-row-content">
                    <div className='flex flex-wrap'>
                      <p className='w-[40%] md:w-[40%]'>Email</p>
                      <p className='w-[5%] md:w-[5%] text-center'>-</p>
                      <p className='w-[55%] md:w-[55%] text-end'>{record?.email}</p>
                    </div>
                  </p>
                  <p className="expanded-row-content">
                    <div className='flex flex-wrap'>
                      <p className='w-[40%] md:w-[40%]'>Primary Role</p>
                      <p className='w-[5%] md:w-[5%] text-center'>-</p>
                      <p className='w-[55%] md:w-[55%] text-end'>{record?.primary_role_name}</p>
                    </div>
                  </p>
                  <p className="expanded-row-content">
                    <div className='flex flex-wrap'>
                      <p className='w-[40%] md:w-[40%]'>User Status</p>
                      <p className='w-[5%] md:w-[5%] text-center'>-</p>
                      <p className='w-[55%] md:w-[55%] text-end'>
                        {record?.status?
                        <span className='text-green-700'>Active</span>
                        :
                        <span className='text-red-700'>Inactive</span>}
                      </p>
                    </div>
                  </p>
                </div>
              </div>
            </>
          ),
          rowExpandable: (record) => record.expandableKey1 !== 'Not Expandable',
        }}
        dataSource={filteredData}
        pagination={{ pageSize: 10 }}
        onChange={(pagination, filters, sorter) => {
          setSortOrder({
            columnKey: sorter.field,
            order: sorter.order,
          });
        }}
      />
      <div className='my-5'>
        <Pagination
        current={currentPage}
        total={totalItems}
        pageSize={10}
        showSizeChanger={false}
        onChange={handlePaginationChange}
      />
    </div>
    </>
  );
}


export default UserDataListComponent;

