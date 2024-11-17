import React, { useState, useEffect } from "react";
import { FaListUl, FaTrash } from "react-icons/fa";

const CreateVoucher = () => {
  const [rows, setRows] = useState([
    { accountName: "", subType: "", comment: "", debit: "", credit: "" },
    { accountName: "", subType: "", comment: "", debit: "", credit: "" },
  ]);
  const [debitTotal, setDebitTotal] = useState(0);
  const [creditTotal, setCreditTotal] = useState(0);
  // const [isSaveDisabled, setIsSaveDisabled] = useState(true);
  const [isDeleteDisabled, setIsDeleteDisabled] = useState(true);

  useEffect(() => {
    calculateTotals();
    checkDeleteButtonState();
    // checkSaveButtonState();
  }, [rows]);

  const addRow = () => {
    setRows([
      ...rows,
      { accountName: "", subType: "", comment: "", debit: "0", credit: "0" },
    ]);
  };

  const removeRow = (index) => {
    const newRows = rows.filter((_, i) => i !== index);
    setRows(newRows);
  };

  const handleInputChange = (index, field, value) => {
    const newRows = [...rows];
    newRows[index][field] = value;
    setRows(newRows);
  };

  const calculateTotals = () => {
    const debitSum = rows.reduce(
      (sum, row) => sum + parseFloat(row.debit || 0),
      0
    );
    const creditSum = rows.reduce(
      (sum, row) => sum + parseFloat(row.credit || 0),
      0
    );
    setDebitTotal(debitSum);
    setCreditTotal(creditSum);
  };

  const checkDeleteButtonState = () => {
    setIsDeleteDisabled(rows.length == 2);
  };

  // const checkSaveButtonState = () => {
  //   console.log("debitTotal " + debitTotal);
  //   console.log("creditTotal " + creditTotal);
  //   const x = debitTotal === creditTotal ? "true" : "false";
  //   console.log(x);
  //   setIsSaveDisabled(x);
  // };
  // checkSaveButtonState();
  // console.log("debitTotal out " + debitTotal);
  // console.log("creditTotal out " + creditTotal);

  return (
    <div className="container mx-auto p-2 rounded-sm border-2">
      <div className="flex justify-between align-middle p-1">
        <p className="text-xl font-semibold text-gray-800">Create Voucher</p>
        <button
          className="btn bg-cyan-600 text-white px-2 py-1 rounded flex align-middle"
          onClick={() => (window.location = "/voucher-list")}
        >
          <FaListUl className="mr-2 size-6 mx-auto" /> <p>Vouchers</p>
        </button>
      </div>

      <div className="py-4 border-t border-gray-200 space-y-4">
        <div className="grid grid-cols-8">
          <label className="col-span-2 text-right text-gray-700 pr-5 font-semibold mb-1">
            Voucher Type <span class="text-red-500">*</span>
          </label>
          <select className="border border-gray-300 rounded p-1 col-span-4">
            <option>Cash</option>
            <option>Sales Accounts</option>
            <option>Service Income</option>
          </select>
        </div>
        <div className="grid grid-cols-8">
          <label className="col-span-2 text-right text-gray-700 pr-5 font-semibold mb-1">
            Date <span class="text-red-500">*</span>
          </label>
          <input
            type="date"
            className="border border-gray-300 rounded p-1 col-span-4"
          />
        </div>
        <div className="grid grid-cols-8">
          <label className="col-span-2 text-right text-gray-700 pr-5 font-semibold mb-1">
            Remarks
          </label>
          <textarea
            className="border border-gray-300 rounded p-1 col-span-4"
            placeholder="TEST V"
          ></textarea>
        </div>
      </div>

      <div className="overflow-x-auto pb-5">
        <table className="min-w-full bg-white border border-spacing-2 border-slate-400">
          <thead>
            <tr>
              <th className="px-4 py-2 border border-slate-300">
                Account Name
              </th>
              <th className="px-4 py-2 border border-slate-300">Sub Type</th>
              <th className="px-4 py-2 border border-slate-300">
                Ledger Comment
              </th>
              <th className="px-4 py-2 border border-slate-300">Debit</th>
              <th className="px-4 py-2 border border-slate-300">Credit</th>
              <th className="px-4 py-2 border border-slate-300">Action</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((row, index) => (
              <tr key={index} className="text-center">
                <td className="px-2 py-2 border border-slate-300">
                  <select
                    className="w-full border border-gray-300 rounded p-2"
                    value={row.accountName}
                    onChange={(e) =>
                      handleInputChange(index, "accountName", e.target.value)
                    }
                  >
                    <option>Cash</option>
                    <option>Sales Accounts</option>
                    <option>Service Income</option>
                  </select>
                </td>
                <td className="px-2 py-2 border border-slate-300">
                  <select
                    className="w-full border border-gray-300 rounded p-2"
                    value={row.subType}
                    onChange={(e) =>
                      handleInputChange(index, "subType", e.target.value)
                    }
                  >
                    <option>None</option>
                    <option>Accounts</option>
                    <option>Income</option>
                  </select>
                </td>
                <td className="px-2 py-2 border border-slate-300">
                  <input
                    type="text"
                    className="w-full border border-gray-300 rounded p-2"
                    placeholder="Enter comment"
                    value={row.comment}
                    onChange={(e) =>
                      handleInputChange(index, "comment", e.target.value)
                    }
                  />
                </td>
                <td className="px-2 py-2 border border-slate-300">
                  <input
                    type="number"
                    className="w-full border border-gray-300 rounded p-2 text-end"
                    placeholder="0"
                    value={row.debit}
                    onChange={(e) =>
                      handleInputChange(
                        index,
                        "debit",
                        parseFloat(e.target.value) || ""
                      )
                    }
                  />
                </td>
                <td className="px-2 py-2 border border-slate-300">
                  <input
                    type="number"
                    className="w-full border border-gray-300 rounded p-2 text-end"
                    value={row.credit}
                    placeholder="0"
                    onChange={(e) =>
                      handleInputChange(
                        index,
                        "credit",
                        parseFloat(e.target.value) || ""
                      )
                    }
                  />
                </td>
                <td className="p-2 border border-slate-300">
                  <button
                    className={`text-white px-4 py-3 rounded ${
                      isDeleteDisabled
                        ? "bg-gray-400 cursor-not-allowed"
                        : "bg-red-500"
                    }`}
                    onClick={() => removeRow(index)}
                    disabled={isDeleteDisabled}
                  >
                    <FaTrash className="fa fa-trash" aria-hidden="true" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
          <tfoot>
            <tr className="text-center font-semibold">
              <td className="p-2 border-slate-300">
                <button
                  className="bg-green-700 text-white px-3 py-1 rounded"
                  onClick={addRow}
                >
                  Add More
                </button>
              </td>
              <td
                colSpan="2"
                className="p-2 border border-slate-300 text-right"
              >
                Total
              </td>
              <td className="p-2 border border-slate-300 text-end">
                {debitTotal.toFixed(2)}
              </td>
              <td className="p-2 border border-slate-300 text-end">
                {creditTotal.toFixed(2)}
              </td>
              <td className="p-2 border border-slate-300"></td>
            </tr>
          </tfoot>
        </table>
      </div>

      <div className="px-2 flex pb-5 justify-end">
        <button
          className={`text-white px-3 py-1 rounded ${
            debitTotal !== creditTotal
              ? "bg-gray-400 cursor-not-allowed"
              : debitTotal === 0
              ? "bg-gray-400 cursor-not-allowed"
              : "bg-green-700"
          }`}
          disabled={debitTotal !== creditTotal}
        >
          Save
        </button>
      </div>
    </div>
  );
};

export default CreateVoucher;
