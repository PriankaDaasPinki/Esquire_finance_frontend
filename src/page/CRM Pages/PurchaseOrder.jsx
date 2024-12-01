import React from "react";

const PurchaseOrder = () => {
  return (
    <div className ="pe-3 pt-2 object-cover">
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
          <h3 className="self-center font-semibold text-gray-900 text-xl mt-5">
            Purchase Order
          </h3>

          <div className="flex justify-between">
            <div>
              <div className="flex">
                <div className="text-left flex px-5 w-80">
                  <div className="flex justify-between w-32">
                    <strong>Party Name</strong>
                    <strong>:</strong>
                  </div>
                  <p className="ps-5">Azam</p>
                </div>
              </div>
              <div className="flex">
                <div className="text-left flex px-5 w-80">
                  <div className="flex justify-between w-32">
                    <strong>Model</strong>
                    <strong>:</strong>
                  </div>
                  <p className="ps-5">Something</p>
                </div>
              </div>
              <div className="flex">
                <div className="text-left flex px-5 w-80">
                  <div className="flex justify-between w-32">
                    <strong>Brand</strong>
                    <strong>:</strong>
                  </div>
                  <p className="ps-5">Something</p>
                </div>
              </div>
              <div className="flex">
                <div className="text-left flex px-5 w-80">
                  <div className="flex justify-between w-32">
                    <strong>Product Type</strong>
                    <strong>:</strong>
                  </div>
                  <p className="ps-5">Something</p>
                </div>
              </div>
              <div className="flex">
                <div className="text-left flex px-5 w-80">
                  <div className="flex justify-between w-32">
                    <strong>Serial No.</strong>
                    <strong>:</strong>
                  </div>
                  <p className="ps-5">Something</p>
                </div>
              </div>
            </div>
            <div>
              <div className="flex">
                <div className="text-left flex px-5 w-80">
                  <div className="flex justify-between w-60">
                    <strong>Req. No.</strong>
                    <strong>:</strong>
                  </div>
                  <p className="w-full text-right">Somethinghfeigi</p>
                </div>
              </div>
              <div className="flex">
                <div className="text-left flex px-5 w-80">
                  <div className="flex justify-between w-60">
                    <strong>Ref. No.</strong>
                    <strong>:</strong>
                  </div>
                  <p className="w-full text-right">Something</p>
                </div>
              </div>
              <div className="flex">
                <div className="text-left flex px-5 w-80">
                  <div className="flex justify-between w-60">
                    <strong>Date</strong>
                    <strong>:</strong>
                  </div>
                  <p className="w-full text-right">25-11-2024</p>
                </div>
              </div>
              <div className="flex">
                <div className="text-left flex px-5 w-80">
                  <div className="flex justify-between w-60">
                    <strong>Due Date</strong>
                    <strong>:</strong>
                  </div>
                  <p className="w-full text-right">25-11-2024</p>
                </div>
              </div>
              <div className="flex">
                <div className="text-left flex px-5 w-80">
                  <div className="flex justify-between w-60">
                    <strong>Valid Until</strong>
                    <strong>:</strong>
                  </div>
                  <p className="w-full text-right">25-11-2024</p>
                </div>
              </div>
              <div className="flex">
                <div className="text-left flex px-5 w-80">
                  <div className="flex justify-between w-60">
                    <strong>Destination</strong>
                    <strong>:</strong>
                  </div>
                  <p className="w-full text-right">Main Location</p>
                </div>
              </div>
              <div className="flex">
                <div className="text-left flex px-5 w-80">
                  <div className="flex justify-between w-60">
                    <strong>Invoice No.</strong>
                    <strong>:</strong>
                  </div>
                  <p className="w-full text-right">Main</p>
                </div>
              </div>
              <div className="flex">
                <div className="text-left flex px-5 w-80">
                  <div className="flex justify-between w-60">
                    <strong>Invoice Date.</strong>
                    <strong>:</strong>
                  </div>
                  <p className="w-full text-right">25-11-2024</p>
                </div>
              </div>
              <div className="flex">
                <div className="text-left flex px-5 w-80">
                  <div className="flex justify-between w-60">
                    <strong>Part No.</strong>
                    <strong>:</strong>
                  </div>
                  <p className="w-full text-right">25112024</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* <!-- Table section  --> */}
        <div className="overflow-x-auto py-5">
          <table className="min-w-full bg-white border border-spacing-2 border-slate-400">
            <thead>
              <tr className="border border-slate-300">
                <th className="text-center w-16">SL #</th>
                <th className="px-4 py-2 text-left">Item Name</th>
                <th className="px-4 py-2 text-right w-80">Qty.</th>
                <th className="px-4 py-2 text-right w-40">Bonus Qty</th>
                <th className="px-4 py-2 text-right w-40">
                  Rate Per
                  <br />
                  (In BDT)
                </th>
                <th className="px-4 py-2 text-right w-40">
                  Amount
                  <br />
                  (In BDT)
                </th>
              </tr>
            </thead>
            <tbody id="voucherTableBody">
              {/* <!-- Row 1 --> */}
              <tr className="border border-slate-300">
                <td className="w-8 text-center">1</td>
                <td className="px-5">Installation</td>
                <td className="text-right px-5">10.00 Mtr</td>
                <td className="text-right px-5">0.00</td>
                <td className="text-right px-5">0.00</td>
                <td className="text-right px-5">0.00</td>
              </tr>
              {/* <!-- Row 2 --> */}
              <tr className="border border-slate-300">
                <td className="text-center w-8">2</td>
                <td className="text-left px-5">Royal Bolt</td>
                <td className="text-right px-5">11.00 Mtr</td>
                <td className="text-right px-5">0.00</td>
                <td className="text-right px-5">0.00</td>
                <td className="text-right px-5">0.00</td>
              </tr>
            </tbody>
          </table>
        </div>

        <div className="px-5 pb-5 flex">
          <strong>In Words (in BDT) :</strong>
          <p className="ps-5">Five</p>
        </div>
        <div className="px-5 py-16">
          <p className="underline">
            <strong>Narration : </strong>
          </p>
          <div>for Esauire Customer Care Ltd.</div>
        </div>
        <div className="px-5 flex">
          <p className="underline pe-5">
            <strong>Terms & Conditions : </strong>
          </p>
          <div>for Esauire Customer Care Ltd.</div>
        </div>

        <div className="flex">
          <div className="text-left flex px-5 w-80">
            <div className="flex justify-between w-44">
              <strong>Delivery</strong>
              <strong>:</strong>
            </div>
            <p className="ps-5">Azam</p>
          </div>
        </div>

        <div className="flex">
          <div className="text-left flex px-5 w-full">
            <div className="flex justify-between w-44">
              <strong>Terms of Payments</strong>
              <strong>:</strong>
            </div>
            <p className="ps-5">Somethig</p>
          </div>
        </div>

        <div className="flex">
          <div className="text-left flex px-5 w-full">
            <div className="flex justify-between w-44">
              <strong>Supports</strong>
              <strong>:</strong>
            </div>
            <p className="ps-5">Somethig</p>
          </div>
        </div>

        <div className="flex">
          <div className="text-left flex px-5 w-full">
            <div className="flex justify-between w-44">
              <strong>Others</strong>
              <strong>:</strong>
            </div>
            <p className="ps-5">Somethig</p>
          </div>
        </div>

        <div className="flex flex-row-reverse px-5 pt-28">
          for Esauire Customer Care Ltd.
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

export default PurchaseOrder;
