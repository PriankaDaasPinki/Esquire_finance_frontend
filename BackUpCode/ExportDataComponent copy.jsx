import React, { useRef, useState } from 'react';
import * as XLSX from 'xlsx';
import { CSVLink } from 'react-csv';
import jsPDF from 'jspdf';
import 'jspdf-autotable';
import { SiMicrosoftexcel } from "react-icons/si";
import { FaFilePdf, FaFileCsv } from "react-icons/fa";
import ShowToast from './ShowToast';
import { authAxios, baseURL } from '../baseURL';

const ExportDataComponent = ({ filename, isExcel, isPdf, isCsv, searchText, startDate, endDate, apiEndpoint }) => {
  const [exportLoading, setExportLoading] = useState(false);
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const csvLinkRef = useRef(null);

  const fetchData = async () => {
    setExportLoading(true);
    try {
      const response = await authAxios.get(`${baseURL}/${apiEndpoint}`, {
        params: { // use params for query parameters
          search: searchText,
          start_date: startDate,
          end_date: endDate,
        },
      });
      setData(response.data);
      return response.data; // Return fetched data
    } catch (error) {
      const errorMessage = error.response?.data?.detail || error.message;
      ShowToast('error', errorMessage);
      setError(errorMessage);
      return null; // Return null on error
    } finally {
      setExportLoading(false);
    }
  };

  const exportToExcel = async () => {
    const fetchedData = await fetchData(); // Await the fetched data
    if (fetchedData) {
      try {
        const worksheet = XLSX.utils.json_to_sheet(fetchedData);
        const workbook = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(workbook, worksheet, 'Sheet1');
        XLSX.writeFile(workbook, `${filename}_${new Date().toISOString().slice(0, 10)}.xlsx`);
      } catch (error) {
        console.error('Excel Export Error:', error);
      }
    }
  };

  const exportToPDF = async () => {
    const fetchedData = await fetchData(); // Await the fetched data
    if (fetchedData) {
      try {
        const doc = new jsPDF();
        doc.text('Exported Data', 14, 15);
        const tableColumn = Object.keys(fetchedData[0] || {});
        const tableRows = fetchedData.map(item => Object.values(item));

        doc.autoTable({
          head: [tableColumn],
          body: tableRows,
          startY: 20,
        });
        doc.save(`${filename}_${new Date().toISOString().slice(0, 10)}.pdf`);
      } catch (error) {
        console.error('PDF Export Error:', error);
      }
    }
  };


  const handleCsvExport = async () => {
    const fetchedData = await fetchData(); // Await the fetched data
    if (fetchedData) {
      const csvData = transformData(fetchedData); // Transform fetched data to CSV format
      if (csvData.length > 0) {
        csvLinkRef.current.link.click(); // Trigger CSV download
      }
    }
  };

  const transformData = (data) => {
    if (!data || data.length === 0) return [];
    const headers = Object.keys(data[0]);
    const rows = data.map(item => Object.values(item));
    return [headers, ...rows];
  };



  return (
    <div className='flex gap-x-2 my-2'>
      {/* Button for Excel Export */}
      {isExcel && (
        <button onClick={exportToExcel} className="border border-[#0e5c19] p-1 h-[40px] hover:shadow-md" disabled={exportLoading}>
          <SiMicrosoftexcel className='text-[#0e5c19] text-[25px]' />
        </button>
      )}

      {/* Button for PDF Export */}
      {isPdf && (
        <button onClick={exportToPDF} className="border border-[#c02727] p-1 h-[40px] hover:shadow-md" disabled={exportLoading}>
          <FaFilePdf className='text-[#c02727] text-[25px]' />
        </button>
      )}

      {/* Button for CSV Export */}
      {isCsv && (
        <>
          <button
            onClick={handleCsvExport}
            className={`border border-[#23af46] p-1 h-[40px] hover:shadow-md ${exportLoading ? 'cursor-not-allowed' : ''}`}
            disabled={exportLoading}
          >
            <FaFileCsv className={`text-[#23af46] text-[25px] mt-1`} />
          </button>
          <CSVLink
            data={[]} // Initial empty array
            filename={`${filename}_${new Date().toISOString().slice(0, 10)}.csv`}
            ref={csvLinkRef}
            style={{ display: 'none' }}
          />
        </>
      )}

      {exportLoading && <span className="ml-2">Loading...</span>} {/* Optional loading text */}
    </div>
  );
};

export default ExportDataComponent;
