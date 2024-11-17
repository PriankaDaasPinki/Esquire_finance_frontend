import React from 'react'
import PageTitleComponent from '../../../components/PageTitleComponent'
import { Table } from 'antd'
import SelectInputWC from '../../../components/FormWithoutClass/SelectInputWC'
import HorizontalSelectField from '../../../components/Form/HorizontalSelectField'
import HorizontalInputFiled from '../../../components/Form/HorizontalInputFiled'
import InputFiledWC from '../../../components/FormWithoutClass/InputFiledWC'

const OpeningBalancesListPageHeadCom = (
  {
    financialYearOption,
    selectedfinancialYear,
    handleFinancialYearChange,
    selectedfinancialYearEndDate,
  }
) => {

      
  return (
    <div className='page-header mb-2 py-3 md:pt-5'>
      <div className="md:flex">
        <div className='page-title md:w-[50%] px-4 pb-3 md:pb-0'>
          <h1 className='uppercase font-semibold'>Opening Balance</h1>
        </div>

        <div className="date-select pt-7 border-t-4 border-[#fff] md:border-none md:pt-0 md:w-[50%] px-4">
          <div className="grid grid-cols-2 gap-x-4">

        <div>
          <SelectInputWC className={`text-justify appearance-none border-[1px] w-[100%] focus:outline-none focus:bg-white focus:border-[#2e6da4]`}
            label='Financial Year*'
            value={selectedfinancialYear}
            onChange={handleFinancialYearChange}
            options={financialYearOption}
            isRequired={false}
            isClearable={true}
          />
        </div>
        <div>
          <InputFiledWC className='pl-3 py-[9px] appearance-none border-[1px] border-[#9d9c9c] w-[100%] focus:outline-none focus:bg-white focus:border-[#2e6da4]'
            type='text'
            value={selectedfinancialYearEndDate}
            label='Date'
            readOnly={true}
            placeholder='date..'
          />

        </div>
          </div>
        </div>
      </div>

  </div>
  )
}

export default OpeningBalancesListPageHeadCom