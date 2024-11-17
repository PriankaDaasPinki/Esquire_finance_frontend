// VoucherDetails.js
import React from "react";
import esqLogo from "../../../assest/Images/esqLogo.png";

const VoucherDetails = () => (
  <div className="px-4 py-2">
    <div className="flex align-middle justify-between mb-4 mt-2">
      <img src={esqLogo} className="w-36" />
      <div>
        <p className="text-2xl text-center font-bold p-0 m-0">E-BIT Finance</p>
        <p className="text-green-600">Approved Voucher</p>        
      </div>
      <div className="flex md:justify-end align-middle sm:justify-center">
        <div className="md:block sm:flex sm:justify-center voucherNumber">
          <p>Voucher Number: jv_00001</p>
          <p>Date: 11/11/2024</p>
        </div>
      </div>
    </div>
    <div className="relative overflow-x-auto">
      <table className="min-w-full bg-white border">
        <thead>
          <tr className="bg-gray-100">
            <th className="p-1 border">Head Name</th>
            <th className="p-1 border">Comments</th>
            <th className="p-1 border">Dabit</th>
            <th className="p-1 border">Credit</th>
          </tr>
        </thead>
        <tbody>
          <tr className="text-center">
            <td className="p-1 border">Purchase Amount</td>
            <td className="p-1 border"></td>
            <td className="p-1 border">29000.00</td>
            <td className="p-1 border">0.00</td>
          </tr>
          <tr className="text-center">
            <td className="p-1 border">Supplier Payable (Milton)</td>
            <td className="p-1 border"></td>
            <td className="p-1 border">0.00</td>
            <td className="p-1 border">29000.00</td>
          </tr>
          {/* <!-- Additional rows can be added here --> */}
        </tbody>
        <tfoot>
          <tr className="text-center font-semibold">
            <td colSpan="2" className="p-1 border border-slate-300">
              <p className="rounded text-right px-3">Total</p>
            </td>
            <td className="border bg-gray-300">
              <p id="debitTotal" className="bg-gray-300 rounded p-1">
                29000.00
              </p>
            </td>
            <td className="border bg-gray-300">
              <p id="creditTotal" className="bg-gray-300 rounded p-1">
                29000.00
              </p>
            </td>
          </tr>
          <tr className="text-center font-semibold">
            <td colSpan="4" className="p-1 border border-slate-300">
              <p className="rounded text-left px-3">In Word :</p>
            </td>
          </tr>
          <tr className="text-center font-semibold">
            <td colSpan="4" className="p-1 border border-slate-300">
              <p className="rounded text-left px-3">Remark :</p>
            </td>
          </tr>
        </tfoot>
      </table>
    </div>
    <div className="flex mt-10 align-middle justify-between">
      <div className="w-1/5">
        <hr className="h-px bg-black border-0 dark:bg-black justify-center" />
        <p className="text-center signature">Prepared By</p>
      </div>
      <div className="w-1/5">
        <hr className="h-px bg-black border-0 dark:bg-black" />
        <p className="text-center signature">Checked By</p>
      </div>
      <div className="w-1/5">
        <hr className="h-px bg-black border-0 dark:bg-black" />
        <p className="text-center signature">Authorized Signature</p>
      </div>
      <div className="w-1/5">
        <hr className="h-px bg-black border-0 dark:bg-black" />
        <p className="text-center signature">Pay By</p>
      </div>
    </div>
  </div>
);

export default VoucherDetails;
