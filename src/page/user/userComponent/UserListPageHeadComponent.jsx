import React from 'react'
import usePermissions from '../../../hooks/usePermissions';
import { AiOutlineSearch } from 'react-icons/ai';
import { Link } from 'react-router-dom';

const UserListPageHeadComponent = ({
    setSearchText,
    setSearchUsername,
    setSearchEmloyeeId
}) => {
  const {hasPermission} = usePermissions();

  const handleSearch = (value) => {
    setSearchText(value);
  };

  const handleSearchUsername = (value) => {
    setSearchUsername(value);
  };

  const handleSearchEmployeeId = (value) => {
    setSearchEmloyeeId(value);
  };

  return (
    <div className='page-header mb-2 px-1 shadow-lg'>
    
    {/* md to lg device start */}
    <div className="hidden md:flex justify-between pt-5">
      <div className='page-title my-auto md:ml-5'>
        <h1 className='uppercase'>User List</h1>
      </div>

      <div className="page-search-and-add-new-button my-auto mr-5 flex">
        <div className="page-search mr-2">
          <div className='row'>
          <div className="relative">
            <input
              className="page-search-input w-[150px] md:w-[214px] appearance-none focus:outline-none focus:bg-white focus:border-[#2e6da4] mr-[5px]"
              type="text"
              name="employee_id"
              required
              onChange={(e) => handleSearchEmployeeId(e.target.value)}
              placeholder="ID"
            />
            <input
              className="page-search-input w-[150px] md:w-[214px] appearance-none focus:outline-none focus:bg-white focus:border-[#2e6da4]"
              type="text"
              name="username"
              required
              onChange={(e) => handleSearchUsername(e.target.value)}
              placeholder="username"
            />
            <div className="text-xl absolute top-[5px] right-3">
              <button className="page-search-button" type="submit">
                <AiOutlineSearch className="text-[#fff] mx-auto" />
              </button>
            </div>
          </div>
          
          </div>
          
        </div>

        {hasPermission('add_user') && (
          <div className="add-new-button px-2">
          <Link to="/user-add">Add New</Link>
        </div>
        )}
        


      </div>
    </div>
    {/* md to lg device end */}



    {/* sm device start */}
    <div className="md:hidden justify-between pt-5">
      <div className='page-title my-auto mx-2 flex justify-between'>
        <h1 className='uppercase'>User List</h1>
        {hasPermission('add_user') && (
          <div className="add-new-button px-2">
          <Link to="/user-add">Add New</Link>
        </div>
        )}
      </div>

      <div className="page-search-and-add-new-button my-auto  mt-2 md:flex">
        <div className="page-search mx-2">
          <div className='row'>
          <div className="relative">
              <div className='flex'>
                  <input
                  className="page-search-input w-[100%] appearance-none focus:outline-none focus:bg-white focus:border-[#2e6da4] mr-[5px]"
                  type="text"
                  name="employee_id"
                  required
                  onChange={(e) => handleSearchEmployeeId(e.target.value)}
                  placeholder="ID"
                />
                <input
                  className="page-search-input w-[100%] appearance-none focus:outline-none focus:bg-white focus:border-[#2e6da4]"
                  type="text"
                  name="username"
                  required
                  onChange={(e) => handleSearchUsername(e.target.value)}
                  placeholder="username"
                />
              </div>
            <div className="text-xl absolute top-[5px] right-3">
              <button className="page-search-button" type="submit">
                <AiOutlineSearch className="text-[#fff] mx-auto" />
              </button>
            </div>
          </div>
          
          </div>
          
        </div>
      </div>
    </div>
    {/* sm device end */}

  </div>

  )
}

export default UserListPageHeadComponent