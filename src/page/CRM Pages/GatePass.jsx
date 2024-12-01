import React from "react";

const GatePass = () => {
  return (
    <div className ="pe-3 pt-2 object-cover">
      <div className="container-lg mx-auto rounded-sm border-2 py-8">
        <div className="text-center">
          <h1 className="self-center font-semibold text-gray-800 text-2xl">
            Esauire Customer Care Ltd
          </h1>
          <p>260/A, Tejgaon I/A</p>
          <p className="p-1 pb-2">Nabisco, Tejgaon, Dhaka-1208</p>
          <p className="pb-5">
            Tel: 9883801,98826895,09602333775,09602333776,09602333777
            <br />
            Hotline: 01730-066300, 01552-325417, Fax: 4880-2-9830820, E-mail:
            info_ccd@esquirebd.com
          </p>
          <h3 className="self-center font-semibold text-gray-900 text-xl">
            Materials Isssue / Gate Pass
          </h3>
        </div>

        {/* <!-- before table  --> */}
        <div className="py-4 border-t border-gray-950 flex justify-evenly">
          <div>
            <div className="flex pb-2">
              <p className="font-semibold w-80 pr-10 text-right">Issue Order No:</p>
              <p className="col-start-3 collapse-4 col-end-8">HO-24-011383</p>
            </div>
            <div className="flex pb-2">
              <p className="font-semibold w-80 pr-10 text-right">Order Date:</p>
              <p className="col-start-3 collapse-4 col-end-8">25-Nov-2024</p>
            </div>
            <div className="flex pb-2">
              <p className="font-semibold w-80 pr-10 text-right">IJCR No:</p>
              <p className="col-start-3 collapse-4 col-end-8">JOB#1234</p>
            </div>
            <div className="flex pb-2">
              <p className="font-semibold w-80 pr-10 text-right">IJCR Date:</p>
              <p className="col-start-3 collapse-4 col-end-8">25-Nov-2024</p>
            </div>
          </div>
          <div>
            <div className="flex pb-2">
              <p className="font-semibold w-80 pr-10 text-right">Invoice No:</p>
              <p className="col-start-3 collapse-4 col-end-8">HO-24-011383</p>
            </div>
            <div className="flex pb-2">
              <p className="font-semibold w-80 pr-10 text-right">Invoice Date:</p>
              <p className="col-start-3 collapse-4 col-end-8">25-Nov-2024</p>
            </div>
            <div className="flex pb-2">
              <p className="font-semibold w-80 pr-10 text-right">
                Vendor / Technician:
              </p>
              <p className="col-start-3 collapse-4 col-end-8">Mazaher (ESS)</p>
            </div>
            <div className="flex pb-2">
              <p className="font-semibold w-80 pr-10 text-right">Customer Name:</p>
              <p className="col-start-3 collapse-4 col-end-8">Brac bank</p>
            </div>
            <div className="flex pb-2">
              <p className="font-semibold w-80 pr-10 text-right">RM Name:</p>
              <p className="col-start-3 collapse-4 col-end-8">
                Sharif Siddique Sajib Mr.
              </p>
            </div>
          </div>
        </div>

        {/* <!-- Table section  --> */}
        <div className="overflow-x-auto pb-5">
          <table className="min-w-full bg-white border border-spacing-2 border-slate-400">
            <thead>
              <tr>
                <th className="px-4 py-2 border border-slate-300 w-8">SI</th>
                <th className="px-4 py-2 border border-slate-300">Material Name</th>
                <th className="px-4 py-2 border border-slate-300 w-80">Quentity</th>
                <th className="px-4 py-2 border border-slate-300 w-40">Unit</th>
              </tr>
            </thead>
            <tbody id="voucherTableBody">
              <tr>
                <td className="border border-slate-300 text-center w-8">1</td>
                <td className="border border-slate-300 text-left px-5">
                  Installation
                </td>
                <td className="border border-slate-300 text-right px-5">17.00</td>
                <td className="border border-slate-300 text-center px-5 capitalize">
                  pcs
                </td>
              </tr>

              <tr>
                <td className="border border-slate-300 text-center w-8">2</td>
                <td className="border border-slate-300 text-left px-5">
                  Royal Bolt
                </td>
                <td className="border border-slate-300 text-right px-5">20.00</td>
                <td className="border border-slate-300 text-center px-5 capitalize">
                  pcs
                </td>
              </tr>
            </tbody>
            <tfoot>
              <tr className="text-center font-semibold">
                <td colspan="2" className="border border-slate-300">
                  <p className="rounded text-center">Total:</p>
                </td>
                <td className="border border-slate-300 text-right px-5">
                  <p>37.00</p>
                </td>
                <td className="border border-slate-300"></td>
              </tr>
            </tfoot>
          </table>
        </div>

        <div className="px-2 pb-5 flex">
          <strong>Note:</strong> <p className="ps-5">The Copper Pipe</p>
        </div>
      </div>
    </div>
  );
};

export default GatePass;
