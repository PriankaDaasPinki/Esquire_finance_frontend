import React, { useEffect, useState } from 'react'
import OpeningBalancesListComponents from './OpeningBalancesComponents/OpeningBalancesListComponents'
import OpeningBalancesListPageHeadCom from './OpeningBalancesComponents/OpeningBalancesListPageHeadCom'
import useFetchListDataWOPagination from '../../customHook/useFetchListDataWOPagination';
import ExportDataComponent from '../../components/ExportDataComponent';

const OpeningBalancesList = () => {

  const [financialYearOption,setSelectedFinancialYearOptions]= useState(null)
  const [selectedfinancialYear,setSelectedFinancialYear]= useState(null)
  const [selectedfinancialYearEndDate,setSelectedFinancialYearEndDate]= useState('')
  const [selectedfinancialYearID,setSelectedFinancialYearID]= useState(null)

  const [searchText, setSearchText] = useState('');
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);

  const params = {
    search: searchText,
    start_date: startDate,
    end_date: endDate,     
  };

  const { data, setData, isLoading, error, fetchData } = useFetchListDataWOPagination(`drf-finance/financial-years-short-list`,params);

  useEffect(()=>{
    setSelectedFinancialYearOptions(data?.map((opData)=>({
      value:opData?.id,
      label:opData?.financial_year,
      end_date:opData?.end_date
    })))
  },[data])

  const handleFinancialYearChange = (selectedOptions) => {
    const id = selectedOptions ? selectedOptions.value : null
    const end_date = selectedOptions ? selectedOptions.end_date : ''
    setSelectedFinancialYear(selectedOptions);
    setSelectedFinancialYearEndDate(end_date)
    setSelectedFinancialYearID(id)
  };

  return (
    <div className='container grid grid-cols-1'>
        <OpeningBalancesListPageHeadCom 
        financialYearOption ={financialYearOption}
        selectedfinancialYear={selectedfinancialYear}
        handleFinancialYearChange={handleFinancialYearChange}
        selectedfinancialYearEndDate={selectedfinancialYearEndDate}
        
        />


      <OpeningBalancesListComponents
        apiEndpoint={selectedfinancialYearID 
          ? `drf-finance/get-opening-balances/?financial_year_id=${selectedfinancialYearID}` 
          : "" // fallback or default value
        }
        detailsURL={`/coas-list/`}
        detailsPermissionCode={"3.5.6"}
      />

  </div>
  )
}

export default OpeningBalancesList