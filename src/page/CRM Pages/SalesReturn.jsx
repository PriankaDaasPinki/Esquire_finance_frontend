import React from "react";

const SalesReturn = () => {
  return (
    <div className="pe-3 pt-2 object-cover">
      <div className="container-lg mx-auto rounded-sm border-2 py-8">
        <div className="text-center">
          <h1 className="self-center font-semibold text-gray-800 text-2xl">
            Esauire Customer Care Ltd
          </h1>
          <p>
            Tejgaon Dhaka
            <br />
            Address2
          </p>
          {/* {/* <!-- <p className="pb-5"> 
          Tel: 9883801,98826895,09602333775,09602333776,09602333777
          <br />Hotline: 01730-066300, 01552-325417, Fax: 4880-2-9830820,
          E-mail: info_ccd@esquirebd.com
        </p> */}
          <h3 className="self-center font-semibold text-gray-900 text-xl mt-5">
            Sales Return
          </h3>

          <div className="flex">
            <div className="text-left flex px-5 w-80">
              <div className="flex justify-between w-28">
                <strong>Party Name</strong>
                <strong>:</strong>
              </div>
              <p className="ps-5">Azam</p>
            </div>
          </div>
          <div className="flex">
            <div className="text-left flex px-5 w-80">
              <div className="flex justify-between w-28">
                <strong>Address</strong>
                <strong>:</strong>
              </div>
              <p className="ps-5">Dhaka</p>
            </div>
          </div>
          <div className="flex">
            <div className="text-left flex px-5 w-80">
              <div className="flex justify-between w-28">
                <strong>Job No.</strong>
                <strong>:</strong>
              </div>
              <p className="ps-5">DS#123</p>
            </div>
          </div>

          <div className="flex flex-row-reverse">
            <div className="text-left flex px-5 w-80">
              <div className="flex justify-between w-36">
                <strong>Date No.</strong>
                <strong>:</strong>
              </div>
              {/* <!-- <strong> :</strong> */}
              <p className="ps-5">25-11-2024</p>
            </div>
          </div>
          <div className="flex flex-row-reverse">
            <div className="text-left flex px-5 w-80">
              <div className="flex justify-between w-36">
                <strong>Voucher No.</strong>
                <strong>:</strong>
              </div>
              <p className="ps-5">DS#123</p>
            </div>
          </div>
          <div className="flex flex-row-reverse">
            <div className="text-left flex px-5 w-80">
              <div className="flex justify-between w-36">
                <strong>Invoice No.</strong>
                <strong>:</strong>
              </div>
              <p className="ps-5">DS#123</p>
            </div>
          </div>
          <div className="flex flex-row-reverse">
            <div className="text-left flex px-5 w-80">
              <div className="flex justify-between w-36">
                <strong>Invoice Date</strong>
                <strong>:</strong>
              </div>
              <p className="ps-5">25-11-2024</p>
            </div>
          </div>

          <div className="flex">
            <div className="text-left flex px-5 w-80">
              <div className="flex justify-between w-28">
                <strong>Against Ref.</strong>
                <strong>:</strong>
              </div>
              <p className="ps-5">25-11-2024</p>
            </div>
          </div>
        </div>

        {/* <!-- Table section  */}
        <div className="overflow-x-auto pb-5">
          <table className="min-w-full bg-white border border-spacing-2 border-slate-400">
            <thead>
              <tr>
                <th className="border border-slate-300 w-16">SL #</th>
                <th className="px-4 py-2 border border-slate-300">
                  Name of the Item
                </th>
                <th className="px-4 py-2 border border-slate-300 w-80">
                  Quentity \ Unit
                </th>
                <th className="px-4 py-2 border border-slate-300 w-40">
                  Bonus Qty
                </th>
                <th className="px-4 py-2 border border-slate-300 w-40">
                  Rate
                  <br />
                  (In BDT)
                </th>
                <th className="px-4 py-2 border border-slate-300 w-40">
                  Amount
                  <br />
                  (In BDT)
                </th>
              </tr>
            </thead>
            <tbody id="voucherTableBody">
              {/* <!-- Row 1 */}
              <tr>
                <td className="border border-slate-300 text-center w-8">1</td>
                <td className="border border-slate-300 text-left px-5">
                  Installation
                </td>
                <td className="border border-slate-300 text-right px-5">
                  10.00 Mtr
                </td>
                <td className="border border-slate-300 text-right px-5">
                  0.00
                </td>
                <td className="border border-slate-300 text-right px-5">
                  0.00
                </td>
                <td className="border border-slate-300 text-right px-5">
                  0.00
                </td>
              </tr>
              {/* <!-- Row 2 */}
              <tr>
                <td className="border border-slate-300 text-center w-8">2</td>
                <td className="border border-slate-300 text-left px-5">
                  Royal Bolt
                </td>
                <td className="border border-slate-300 text-right px-5">
                  11.00 Mtr
                </td>
                <td className="border border-slate-300 text-right px-5">
                  0.00
                </td>
                <td className="border border-slate-300 text-right px-5">
                  0.00
                </td>
                <td className="border border-slate-300 text-right px-5">
                  0.00
                </td>
              </tr>
            </tbody>
            <tfoot>
              <tr className="text-center font-semibold">
                <td colspan="2">
                  <p className="text-right px-5">Sub Total:</p>
                </td>
                <td>
                  <p className="text-right px-5">37.00 Mtr.</p>
                </td>
                <td></td>
                <td></td>
                <td></td>
              </tr>
              <tr className="text-center font-semibold">
                <td colspan="2">
                  <p className="text-right px-5">Add & Less:</p>
                </td>
                <td>
                  <p className="text-right px-5"></p>
                </td>
                <td></td>
                <td></td>
                <td></td>
              </tr>

              <tr className="text-center font-semibold">
                <td colspan="2" className="border-t">
                  <p className="rounded text-center text-lg">Total:</p>
                </td>
                <td className="border-t text-right px-5">
                  <p>37.00</p>
                </td>
                <td className="border-t text-right px-5"></td>
                <td className="border-t text-right px-5"></td>
                <td className="border-t text-right px-5">0.00</td>
              </tr>
            </tfoot>
          </table>
        </div>

        <div className="px-5 pb-5 flex">
          Amount Chargeable (in word) :<p className="ps-5">Five</p>
        </div>
        <div className="flex justify-between px-5">
          <div>Job 10750</div>
          <div>for Esauire Customer Care Ltd.</div>
        </div>

        <div className="flex justify-between px-32 pt-28">
          <div className="text-center">
            <hr className="border border-black w-48" />
            Returned By
          </div>
          <div className="text-center">
            <hr className="border border-black w-48" />
            Authorized Signature
          </div>
        </div>
      </div>
    </div>
  );
};

export default SalesReturn;
