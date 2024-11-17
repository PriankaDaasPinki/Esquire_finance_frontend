import React, { useRef, useState } from 'react';
import * as XLSX from 'xlsx';
import { CSVLink } from 'react-csv';
import jsPDF from 'jspdf';
import 'jspdf-autotable';
import { SiMicrosoftexcel } from "react-icons/si";
import { FaFilePdf } from "react-icons/fa6";
import { FaFileCsv } from "react-icons/fa6";
import ShowToast from './ShowToast';
import { authAxios, baseURL } from '../baseURL';

const ExportDataComponent = ({ filename, isExcel, isPdf, isCsv,searchText,startDate,endDate,apiEndpoint}) => {
    const [exportloading, setExportLoading] = useState(false);
    const [data, setData] = useState(null);
    const [error, setError] = useState(null);
    const csvLinkRef = useRef(null);


    const fetchData = async () => {
      setExportLoading(true);
      try {
        const response = await authAxios.get(`${baseURL}/${apiEndpoint}`,{
          search: searchText,
          start_date: startDate,
          end_date: endDate,     
        });
        // console.log(`${apiEndpoint}`,response)
        setData(response.data);
      } catch (error) {
        if(error.response.data.detail){
          ShowToast('error',`${error.response.data.detail}`)
          setError(error.response.data.detail);
        }else{
          ShowToast('error',`${error}`)
          setError(error);
        }
      } finally {
        setExportLoading(false);
      }
    };


  // Export to Excel
  const exportToExcel = () => {
    fetchData()
    try {
      const worksheet = XLSX.utils.json_to_sheet(data);
      const workbook = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(workbook, worksheet, 'Sheet1');
      XLSX.writeFile(workbook, `${filename}_${new Date().toISOString().slice(0, 10)}.xlsx`);
    } catch (error) {
      console.error('Excel Export Error:', error);
    }
  };

  // Export to PDF
  const exportToPDF = () => {
    fetchData()
    try {
      const doc = new jsPDF();
      doc.text('Exported Data', 14, 15);
      const tableColumn = Object.keys(data[0] || {});
      const tableRows = data?.map(item => Object.values(item));

      doc.autoTable({
        head: [tableColumn],
        body: tableRows,
        startY: 20,
      });
      doc.save(`${filename}_${new Date().toISOString().slice(0, 10)}.pdf`);
    } catch (error) {
      console.error('PDF Export Error:', error);
    }
  };

  const handleCsvExport = () => {
    fetchData()
    csvLinkRef.current.link.click();
  };

  const transformData = (data) => {
    if (!data || data?.length === 0) return [];
    // Get headers from the keys of the first object
    const headers = Object.keys(data[0]);
    const rows = data?.map(item => Object.values(item));
    return [headers, ...rows]; // Combine headers with rows
  };
  
  const csvData = transformData(data);



  return (

    <div className='flex gap-x-2 my-2'>
      {/* Button for Excel Export */}
      {isExcel && (
        <button onClick={exportToExcel} className="border border-[#0e5c19] p-1 h-[40px] hover:shadow-md" disabled={exportloading}>
          <SiMicrosoftexcel className='text-[#0e5c19] text-[25px]' />
        </button>
      )}

      {/* Button for PDF Export */}
      {isPdf && (
        <button onClick={exportToPDF} className="border border-[#c02727] p-1 h-[40px] hover:shadow-md" disabled={exportloading}>
          <FaFilePdf className='text-[#c02727] text-[25px]' />
        </button>
      )}



      {/* Button for CSV Export */}
      {isCsv && (
            <>
                <button 
                    onClick={handleCsvExport} 
                    className={`border border-[#23af46] p-1 h-[40px] hover:shadow-md ${exportloading ? ' cursor-not-allowed' : ''}`} 
                    disabled={exportloading}
                >
                    <FaFileCsv className={`text-[#23af46] text-[25px] mt-1`} />
                </button>
                <CSVLink 
                      data={csvData} 
                      filename={`${filename}_${new Date().toISOString().slice(0, 10)}.csv`}
                      ref={csvLinkRef} 
                      style={{ display: 'none' }} 
                    />

            </>
      )}

      {exportloading && <span className="ml-2">Loading...</span>} {/* Optional loading text */}
    </div>
    
  );
};

export default ExportDataComponent;
