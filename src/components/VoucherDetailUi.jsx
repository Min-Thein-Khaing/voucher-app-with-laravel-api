import React from "react";
import { useParams } from "react-router-dom";
import useSWR from "swr";
import printJS from "print-js";
import  html2pdf  from "html2pdf.js";

const fetcher = (...args) => fetch(...args).then((res) => res.json());

const VoucherDetailUi = () => {
  const { id } = useParams();
  const { data, isLoading, error } = useSWR(
    import.meta.env.VITE_API_URL + `/vouchers/${id}`,
    fetcher
  );


  const handlePrint = () => {
    printJS({
      printable: "printArea", // The ID of the element you want to print
      type: "html",
      css: [
        "https://cdn.jsdelivr.net/npm/tailwindcss@2.2.19/dist/tailwind.min.css",
      ],
    });
  };
  const handleExport = () => {
    const element = document.getElementById("printArea"); // The area to convert to PDF
  const options = {
    margin: 1,
    filename: `invoice_${data.voucher_id}.pdf`,
    image: { type: "jpeg", quality: 0.98 },
    html2canvas: { scale: 2 },
    jsPDF: { unit: "cm", format: "a5", orientation: "portrait" },
  };

  // Generate the PDF
  html2pdf().from(element).set(options).save();
  }
  


// if(isLoading) return <div>Loading...</div>
// console.log(data)


  return (
    <div className="flex gap-5" >
      <div  className="w-[ 21 cm] bg-white p-4" id="printArea">
        <div className="flex justify-between items-start mb-8">
          <div>
            <h1 className="text-4xl font-bold mb-2">INVOICE</h1>
            <p className="text-xl">{data?.data?.voucher_id}</p>
          </div>
          <div className="text-right">
            <p className="font-bold">Invoice to</p>
            <p>{data?.data?.customer_name}</p>
            <p>Date: {data?.data?.sale_date}</p>
          </div>
        </div>

        <table className="w-full mb-8 border-collapse">
          <thead>
            <tr className="border-b-2 border-gray-300">
              <th className="text-left py-2 text-sm">No</th>
              <th className="text-left py-2 text-sm">Description</th>
              <th className="text-right py-2 text-sm">Qty</th>
              <th className="text-right py-2 text-sm">Price</th>
              <th className="text-right py-2 text-sm">Total</th>
            </tr>
          </thead>
          <tbody>
            {data?.data?.records.map((record, index) => (
              <tr key={record.id} className="border-b border-gray-200">
                <td className="py-2 text-sm">{index + 1}</td>
                <td className="py-2 text-sm">{record.product.product_name}</td>
                <td className="text-right py-2 text-sm">{record.quantity}</td>
                <td className="text-right py-2 text-sm">
                  {record.product.price}
                </td>
                <td className="text-right py-2 text-sm">{record.cost}</td>
              </tr>
            ))}
          </tbody>
          <tfoot>
            <tr className="border-b border-gray-200">
              <td className="py-2 text-right text-sm" colSpan={4}>
                Total
              </td>
              <td className="py-2 text-right text-sm">{data?.data?.total}</td>
            </tr>
            <tr className="border-b border-gray-200">
              <td className="py-2 text-right text-sm" colSpan={4}>
                Tax
              </td>
              <td className="py-2 text-right text-sm">{parseFloat(data?.data?.tax).toFixed(2)}</td>
            </tr>
            <tr className="border-b border-gray-200">
              <td className="py-2 text-right text-sm" colSpan={4}>
                Net Total
              </td>
              <td className="py-2 text-right text-sm">{parseFloat(data?.data?.net_total).toFixed(2)}</td>
            </tr>
          </tfoot>
        </table>

        <div className="  text-xs mb-8">
          <div>
            <h2 className="font-bold mb-2">Payment Transfer to</h2>
            <p>Kpay,Wave - 09250152018</p>
            <p>KBZ Bank - 02730102705025601</p>
            <p>AYA Bank - 20003674121</p>
          </div>
          <div>
            <h2 className="font-bold text-xl">MMS IT</h2>
            <p>48, 1st Floor, Shan Kone St.</p>
            <p>+959-250-152-018</p>
            <p>enquiry@mms-it.com</p>
          </div>
        </div>

        <div className="border-t-2 border-gray-300 pt-4">
          <p className="mt-4 text-center text-sm">Thanks to You</p>
        </div>
      </div>
      <div className="flex flex-col gap-1">
        <button
          onClick={handlePrint}
          className="justify-center inline-flex gap-2 items-center text-white mt-1 bg-blue-500 hover:bg-blue-700 font-bold py-2 px-4 rounded "
        >
          Print
        </button>
        <button
          onClick={handleExport}
          className="justify-center inline-flex gap-2 items-center text-white mt-1 bg-blue-500 hover:bg-blue-700 font-bold py-2 px-4 rounded "
        >
          Export
        </button>
      </div>
    </div>
  );
};

export default VoucherDetailUi;