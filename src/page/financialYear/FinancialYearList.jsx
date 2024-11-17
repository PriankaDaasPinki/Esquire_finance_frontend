import React from 'react';
//import FinancialYearComponent from './financialYearComponent/FinancialYearListComponent';
import FinancialYearListComponent from './financialYearComponent/FinancialYearListComponent';
 
const FinancialYearList = () => {
 
  return (
    <>
      <FinancialYearListComponent
        apiEndpoint={`drf-finance/financial-years/`}
        detailsURL={`/financial-years/`}
        // detailsPermissionCode={"3.5.6"}
      />
    </>
  );
};
 
 
export default FinancialYearList;