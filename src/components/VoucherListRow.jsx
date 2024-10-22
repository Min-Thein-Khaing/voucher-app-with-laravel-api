import React, { useState } from "react";
import { BsPencil } from "react-icons/bs";
import { FaRegTrashCan } from "react-icons/fa6";
import { IoIosArrowRoundForward } from "react-icons/io";
import ShowDate from "./ShowDate";
import { useSWRConfig } from "swr";
import { tailChase } from "ldrs";
import { Link } from "react-router-dom";

tailChase.register();

// Default values shown

const VoucherListRow = ({
  voucher: { id, voucher_id, customer_name, customer_email, sale_date },
}) => {
  const { mutate } = useSWRConfig();
  const [isDeleting, setDeleting] = useState(false);
  const handleVoucherDelBtn = async () => {
    setDeleting(true);
    await fetch(import.meta.env.VITE_API_URL + `/vouchers/${id}`, {
      method: "DELETE",
    });
    setDeleting(false);
    mutate(import.meta.env.VITE_API_URL + "/vouchers");
  };
  return (
    <tr className="odd:bg-white  odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700">
      <td className="px-6 py-4">{voucher_id}</td>
      <td
        scope="row"
        className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
      >
        {customer_name}
      </td>

      <td className="px-6 py-4 text-end">{customer_email}</td>
      <td className="px-6 py-4 text-end">
        <ShowDate timeStamp={sale_date} />
      </td>
      <td className="px-6 py-4 text-end">
        <div className="inline-flex rounded-md shadow-sm" role="group">
          <button
            onClick={handleVoucherDelBtn}
            type="button"
            className="size-10 flex items-center justify-center text-sm font-medium text-red-500 bg-white border border-gray-200 rounded-s-lg hover:bg-gray-100 hover:text-red-700 focus:z-10 focus:ring-2 focus:ring-blue-700 focus:text-blue-700 dark:bg-gray-800 dark:border-gray-700 dark:text-white dark:hover:text-white dark:hover:bg-gray-700 dark:focus:ring-blue-500 dark:focus:text-white"
          >
            {isDeleting ? (
              <l-tail-chase size="20" speed="1.75" color="black"></l-tail-chase>
            ) : (
              <FaRegTrashCan />
            )}
            
          </button>
          <Link to={`/voucher/detail/${id}`} className="size-10 flex items-center justify-center text-sm font-medium text-blue-500 bg-white border border-gray-200 rounded-e-lg hover:bg-gray-100 hover:text-red-700 focus:z-10 focus:ring-2 focus:ring-blue-700 focus:text-blue-700 dark:bg-gray-800 dark:border-gray-700 dark:text-white dark:hover:text-white dark:hover:bg-gray-700 dark:focus:ring-blue-500 dark:focus:text-white"><IoIosArrowRoundForward className="w-3 h-4" />

          </Link>
        </div>
      </td>
    </tr>
  );
};

export default VoucherListRow;
