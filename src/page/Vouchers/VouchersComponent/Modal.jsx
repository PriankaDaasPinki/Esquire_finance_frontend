// Modal.js
import React, { useRef } from "react";
import VoucherDetails from "./VoucherDetails";
import { FaPrint, FaRegFilePdf } from "react-icons/fa";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";

import "./customCSS.css";

function Modal({ closeModal }) {
  const modalBodyRef = useRef();

  const handlePrint = () => {
    const printContents = modalBodyRef.current.innerHTML;
    const originalContents = document.body.innerHTML;

    document.body.innerHTML = printContents;
    window.print();
    document.body.innerHTML = originalContents;
    window.location.reload(); // Reload to restore event listeners if necessary
  };

  const handleDownloadPdf = async () => {
    const element = modalBodyRef.current;
    const canvas = await html2canvas(element, { scale: 1 });
    const dataUrl = canvas.toDataURL("image/png");

    const pdf = new jsPDF({
      orientation: "landscape",
      unit: "px",
      format: "a4",
    });

    // Adjust margins for the PDF
    const marginX = 15; // Left and right margins
    const marginY = 20; // Top margin
    const pdfWidth = pdf.internal.pageSize.getWidth() - 2 * marginX;
    const pdfHeight = pdf.internal.pageSize.getHeight() - 5 * marginY;

    pdf.addImage(dataUrl, "PNG", marginX, marginY, pdfWidth, pdfHeight);
    pdf.save("voucher-details.pdf");
  };

  return (
    <div
      id="modal"
      className="fixed inset-0 bg-gray-900 bg-opacity-50 flex justify-center items-center"
      onClick={(e) => {
        if (e.target.id === "modal") closeModal();
      }}
    >
      <div className="bg-white rounded-lg shadow-lg w-2/3 py-4 px-6">
        <div className="flex justify-between items-center border-b pb-2">
          <h2 className="text-lg font-semibold text-center w-11/12">
            Voucher Details
          </h2>
          <button
            className="text-gray-600 hover:text-gray-900"
            onClick={closeModal}
          >
            &times;
          </button>
        </div>

        {/* Modal Body Section */}
        <div className="modal-body mt-4" ref={modalBodyRef}>
          <VoucherDetails />
        </div>
        <div className="flex justify-end mt-2">
          <button
            className="bg-yellow-400 text-white px-3 py-1 rounded mr-2 flex align-middle"
            onClick={handlePrint}
          >
            <FaPrint className="mr-2 size-5" /> <p>Print</p>
          </button>
          <button
            className="bg-green-600 text-white px-3 py-1 rounded mr-2 flex align-middle"
            onClick={handleDownloadPdf}
          >
            <FaRegFilePdf className="mr-2 size-5" /> <p>PDF</p>
          </button>
          <button
            className="bg-red-600 text-white px-3 py-1 rounded"
            onClick={closeModal}
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}

export default Modal;

// const Modal = ({ closeModal }) => (
//   <div
//     id="modal"
//     className="fixed inset-0 bg-gray-900 bg-opacity-50 flex justify-center items-center"
//     onClick={(e) => {
//       if (e.target.id === "modal") closeModal();
//     }}
//   >
//     <div className="bg-white rounded-lg shadow-lg w-2/3 py-4 px-6">
//       <div className="flex justify-between items-center border-b pb-2">
//         <h2 className="text-lg font-semibold text-center w-11/12">
//           Voucher Details
//         </h2>
//         <button
//           className="text-gray-600 hover:text-gray-900"
//           onClick={closeModal}
//         >
//           &times;
//         </button>
//       </div>
//       {/* Modal Body */}
//       <VoucherDetails />
//       <div className="flex justify-end mt-2">
//         <button
//           className="bg-yellow-400 text-white px-3 py-1 rounded mr-2 flex align-middle"
//           onClick={handlePrint}
//         >
//           <FaPrint className="mr-2 size-5" /> <p>Print</p>
//         </button>
//         <button className="bg-green-600 text-white px-3 py-1 rounded mr-2 flex align-middle">
//           <FaRegFilePdf className="mr-2 size-5" /> <p>PDF</p>
//         </button>
//         <button
//           className="bg-red-600 text-white px-3 py-1 rounded"
//           onClick={closeModal}
//         >
//           Close
//         </button>
//       </div>
//     </div>
//   </div>
// );

// export default Modal;
