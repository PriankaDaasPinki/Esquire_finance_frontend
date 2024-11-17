import { Pagination } from 'antd'
import React from 'react'

const CustomPaginator = ({setCurrentPage,currentPage,totalItems,pageSize}) => {

    const handlePaginationChange = (page) => {
        setCurrentPage(page);
    };

  return (
    <Pagination
    current={currentPage}
    total={totalItems}
    pageSize={pageSize}
    onChange={handlePaginationChange}
    showSizeChanger={false}
  />
  )
}

export default CustomPaginator