import React from 'react'
import DateRangeFiltering from '../DateRangeFiltering'
import { AiFillFileExcel, AiOutlineSearch } from 'react-icons/ai'
import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux'

const ListPageHeadWithDateRange = (
    {
        pageTitle,
        setEndDate,
        endDate,
        setStartDate,
        startDate,
        setSearchText,
        addNewURL,
        addNewUrlPermissionCode,
        handleExportToExcel,

    }
) => {
    const user = useSelector(state => state.auth.user)

    const handleSearch = (value) => {
        setSearchText(value);
    };

  return (
    <>
    <div className='page-header mb-2 px-1'>
        <div className="flex justify-between pt-5">
          <div className='page-title pl-2 py-1 md:border-0 md:mb-0 gap-x-5 flex justify-between md:justify-start  md:w-[50%]'>
                <div className='my-auto uppercase'><h1>{pageTitle}</h1></div> 
                <div className='flex justify-center'>
                  {handleExportToExcel &&(
                    <button title='Data Excel Export' onClick={handleExportToExcel}><AiFillFileExcel className='text-[#145632]' /></button>
                  )}
                </div>
            </div>  

          <div className='page-search-and-add-new-button md:flex my-auto md:mr-5'>
            <div className='page-date-range my-auto hidden md:flex'>
              <DateRangeFiltering setEndDate={setEndDate} endDate={endDate} setStartDate={setStartDate} startDate={startDate} />
            </div>
            
            <div className='page-search ml-2 hidden md:block'>
              <div className='relative'>
                <input
                  className='page-search-input w-[200px] md:w-[214px] appearance-none focus:outline-none focus:bg-white focus:border-[#2e6da4]'
                  type='text'
                  name='search'
                  required
                  onChange={(e) => handleSearch(e.target.value)}
                  placeholder='Search here'
                />
                <div className='text-xl absolute top-[5px] right-3'>
                  <button title='Auto Search' className='page-search-button' type='submit'>
                    <AiOutlineSearch className='text-[#fff] mx-auto' />
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
                  items-center text-[12px] p-2 md:w-[120px] lg:w-[120px]
                 text-[#fff] rounded-[5px] ml-1 font-semibold my-auto
                ' 
                to={`/${addNewURL}`}>Add New</Link>
            )} 
                </>
            )}

          </div>
        </div>

        <div className='page-search md:hidden mt-4'>
            <div className='relative'>
              <input
                className='page-search-input w-[85%] md:w-[214px] appearance-none focus:outline-none focus:bg-white focus:border-[#2e6da4]'
                type='text'
                name='search'
                required
                onChange={(e) => handleSearch(e.target.value)}
                placeholder='Search here'
              />
              <div className='text-xl absolute top-[-5px] right-0'>
                <button title='Auto Search' className='page-search-button p-[17px] px-6' type='submit'>
                  <AiOutlineSearch className='text-[#fff] mt-[-10px] mx-[-10px]' />
                </button>
              </div>
            </div>
        </div>

        <div className='page-header py-4 md:hidden'>
            <DateRangeFiltering setEndDate={setEndDate} endDate={endDate} setStartDate={setStartDate} startDate={startDate} />
        </div>
      </div>
    </>
  )
}

export default ListPageHeadWithDateRange