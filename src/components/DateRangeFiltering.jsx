import { DatePicker } from 'antd';
import React, { useState } from 'react'
import dayjs from 'dayjs';

const DateRangeFiltering = ({startDate,endDate,setStartDate,setEndDate}) => {

    const handleStartDateChange = (date, dateString) => {
      const jsDate = date ? new Date(dateString) : null;
      if (jsDate) {
        jsDate.setHours(0, 0, 0, 0);
      }
      setStartDate(jsDate);
    };
  
    const handleEndDateChange = (date, dateString) => {
      const jsDate = date ? new Date(dateString) : null;
      if (jsDate) {
        jsDate.setHours(23, 59, 59, 999);
      }
      setEndDate(jsDate);
    };
  
    const disabledEndDate = (current) => {
      return current && startDate && current < startDate;
    };
    const disabledStartDate = (current) => {
        return current && endDate && current > endDate;
    };


  return (
    <div>
        <div className='page-date-range my-auto flex justify-between'>
            <div className='mr-2'>
                <DatePicker 
                disabledDate={disabledStartDate}
                onChange={handleStartDateChange} 
                placeholder='From Date' 
                className='border-[#D9D9D9] text-[#74747B] font-bold' />
            </div>
            <div>
            <DatePicker
            disabled={!startDate}
            disabledDate={disabledEndDate}
            onChange={handleEndDateChange}
            placeholder='To Date'
            className='border-[#D9D9D9] text-[#74747B] font-bold'
          />
            </div>
        </div>
    </div>
  )
}

export default DateRangeFiltering