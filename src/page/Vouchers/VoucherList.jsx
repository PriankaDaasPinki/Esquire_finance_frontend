import React, { useEffect, useState } from "react";
import $ from "jquery";
import "select2/dist/css/select2.min.css";
import "datatables.net-dt/css/dataTables.dataTables.min.css";
import DataTable from "datatables.net";
import "select2";
import Modal from "./VouchersComponent/Modal";
import { GrView } from "react-icons/gr";
import { FaUndoAlt } from "react-icons/fa";
import { IoAdd } from "react-icons/io5";
import { useNavigate } from "react-router-dom";

function VoucherList() {
  // In your Javascript (external .js resource or <script> tag)
  const [isModalOpen, setModalOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    $(".js-example-basic-single").select2();

    const table = new DataTable("#voucherList", {
      initComplete: function () {
        $("#voucherList th, #voucherList td").css("text-align", "center");
      },
      pagingType: "simple_numbers",
      bPaginate: true,
      bLengthChange: true,
      language: {
        info: "Showing _START_ to _END_ of _TOTAL_ entries ( Filtered from NaN Total Records )",
        lengthMenu: "Display _MENU_ records per page",
        paginate: {
          previous:
            "<span class='p-2 text-gray-800 border rounded -mr-4'>Previous</span>",
          next: "<span class='p-2 text-gray-800 border rounded -ml-4'>Next</span>",
        },
      },
    });

    return () => {
      if ($.fn.DataTable.isDataTable("#voucherList")) {
        table.destroy();
      }
    };
  }, []);

  const openModal = () => setModalOpen(true);
  const closeModal = () => setModalOpen(false);
  return (
    <div className="container-lg mx-auto rounded-sm border-2 p-5">
      <header className="flex justify-between items-center bg-gray-200 p-3">
        <h1 className="text-xl font-semibold text-gray-800">Vouchers</h1>
        <div className="flex gap-2">
          <button
            className="bg-blue-600 text-white px-4 rounded flex "
            onClick={() => {navigate("/voucher-create")}}
          >
            <IoAdd className="mr-2 size-6" /><p>Create Voucher</p>
          </button>
          <select
            class="border border-gray-300 rounded px-4 js-example-basic-single flex"
          >
            <option>Select Option</option>
            <option>Debit Voucher</option>
            <option>Credit Voucher</option>
            <option>Journal Voucher</option>
            <option>Contra Voucher</option>
          </select>
          <select className="border border-gray-300 rounded px-4 js-example-basic-single">
            <option>Select Option</option>
            <option>Debit Voucher</option>
            <option>Credit Voucher</option>
            <option>Journal Voucher</option>
            <option>Contra Voucher</option>
          </select>
          <button className="bg-green-500 text-white px-4 rounded">
            Search
          </button>
          <button className="bg-yellow-500 text-white px-4 rounded">
            Reset
          </button>
        </div>
      </header>

      <div className="flex justify-start gap-2 my-3">
        {["Copy", "CSV", "Excel", "Print", "Column Visibility"].map((label) => (
          <button key={label} className="border px-2">
            {label}
          </button>
        ))}
      </div>

      <div className="overflow-x-auto">
        <table id="voucherList" className="min-w-full bg-white border">
          <thead>
            <tr className="bg-gray-100">
              <th className="border">SL No.</th>
              <th className="border">Voucher No</th>
              <th className="border">Date</th>
              <th className="border">Remark</th>
              <th className="border">Amount</th>
              <th className="border">Status</th>
              <th className="border">Action</th>
            </tr>
          </thead>
          <tbody>
            <tr className="text-center">
              <td className="border">1</td>
              <td className="border">CV_000003</td>
              <td className="border">15-01-2025</td>
              <td className="border">v3</td>
              <td className="border">1000</td>
              <td className="border">
                <span className="bg-green-500 text-white px-2 py-1 rounded">
                  Approved
                </span>
              </td>
              <td className="border">
                <button
                  className="bg-blue-500 text-white px-2 py-1 rounded mr-1"
                  onClick={openModal}
                >
                  <GrView />
                </button>
                <button className="bg-green-500 text-white px-2 py-1 rounded">
                  <FaUndoAlt />
                </button>
              </td>
            </tr>
            {/* Add additional rows as necessary */}
          </tbody>
        </table>
      </div>

      {/* Modal Component */}
      {isModalOpen && <Modal closeModal={closeModal} />}
    </div>
  );
}

export default VoucherList;
