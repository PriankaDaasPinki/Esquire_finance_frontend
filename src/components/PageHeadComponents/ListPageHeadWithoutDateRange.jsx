import React from 'react'
import { AiFillFileExcel, AiOutlineSearch } from 'react-icons/ai';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

const ListPageHeadWithoutDateRange = ({pageTitle,handleExportToExcel,addNewURL,addNewUrlPermissionCode,setSearchText}) => {

    const user = useSelector(state => state.auth.user)

    const handleSearch = (value) => {
        setSearchText(value);
    };

  return (
    <>
    <div className="flex justify-between page-header mb-5">
        <div className='page-title pl-2 py-1 border-b mb-2 md:border-0 md:mb-0 gap-x-5 flex justify-between md:justify-start w-[100%] md:w-[50%]'>
              <div className='my-auto'><h1>{pageTitle}</h1></div> 
              <div className='flex justify-center'>
                {handleExportToExcel &&(
                  <button title='Data Excel Export' onClick={handleExportToExcel}><AiFillFileExcel className='text-[#145632]' /></button>
                )}
              </div>
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
                <button title='Auto Search' className="page-search-button" type="submit">
                  <AiOutlineSearch className="text-[#fff] mx-auto" />
                </button>
              </div>
            </div>
          </div>

          {addNewURL &&(
                <>
                    {user?.menu_permissions?.includes(`${addNewUrlPermissionCode}`) && (
                      <Link 
                      className='
                      bg-[#F9333E] text-center font-[Inter] 
                        items-center text-[15px] p-2 md:p-1 md:w-[90px]
                      text-[#fff] rounded-[5px] ml-1 font-semibold my-auto
                      ' 
                      to={`/${addNewURL}`}>Add New</Link>
                    )} 
                </>
            )}
          
        </div>
      </div>
    </>
  )
}

export default ListPageHeadWithoutDateRange