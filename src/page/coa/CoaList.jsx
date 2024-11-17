import React from 'react';
import CoaListComponent from './coaComponent/CoaListComponent';

 
const CoaList = () => {
 
  return (
    <>
      <CoaListComponent
        apiEndpoint={`drf-finance/coas-list/`}
        detailsURL={`/coas-list/`}
        // detailsPermissionCode={"3.5.6"}
      />
    </>
  );
};
 
 
export default CoaList;