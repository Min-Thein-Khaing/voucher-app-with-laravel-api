import React, { useRef, useState } from "react";

import { HiOutlineDesktopComputer, HiSearch, HiX } from "react-icons/hi";

import { Link } from "react-router-dom";
import useSWR from "swr";
import VoucherListRow from "./VoucherListRow";
import {throttle ,debounce} from "lodash";
import Pagination from "./Pagination";

const fetcher = (...args) => fetch(...args).then((res) => res.json());

const VoucherList = () => {
  const searchInput = useRef("");
  
  // const [search,setSearch] = useState("");
  const [fetcherUrl,setFetchUrl] = useState(import.meta.env.VITE_API_URL + "/vouchers")
  
  
  const { data, error, isLoading } = useSWR(
    fetcherUrl,
    fetcher
  );
  const updateFetchUrl = (url) => {
    setFetchUrl(url)
  }

  //throttling & deBounceing
  // const handleSearch = (e) => {
  //   setSearch(e.target.value)
  // }
  const handleSearch = debounce ((e) => {
    setFetchUrl(import.meta.env.VITE_API_URL + `/vouchers?q=${e.target.value}`)
  },500)
  return (
    <div>
      <div className="flex flex-col sm:flex-row justify-between mb-3">
        <div className="w-full sm:w-auto mb-4 sm:mb-0">
          <div className="relative">
            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
              <HiSearch className="w-4 h-4 text-stone-500 dark:text-stone-400" />
            </div>
            <input
            onChange={handleSearch}
            ref={searchInput}
              type="text"
              className="bg-gray-50 border border-gray-300 text-stone-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="Search Voucher"
            />
           
          </div>
        </div>
        <div className="w-full sm:w-auto">
          <Link
            to="/sale"
            className="w-full sm:w-auto text-white flex justify-center items-center gap-3 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          >
            Create Sale
            <HiOutlineDesktopComputer />
          </Link>
        </div>
      </div>

      <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
        <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
          <thead className="text-xs text-stone-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th scope="col" className="px-6 py-3">
                #
              </th>
              <th scope="col" className="px-6 py-3">
                Customer Name
              </th>

              <th scope="col" className="px-6 py-3 text-end">
                Email
              </th>
              <th scope="col" className="px-6 py-3 text-end">
                Date
              </th>
              <th scope="col" className="px-6 py-3 text-end">
                Action
              </th>
            </tr>
          </thead>
          <tbody>
            <tr className="odd:bg-white text-center hidden last:table-row odd:dark:bg-gray-900 even:bg-gray-100 even:dark:bg-gray-800 border-b dark:border-gray-700">
            <td colSpan={5} className="px-6 py-4  ">
                There is no Voucher!!
              </td>
            </tr>
            {isLoading?<td colSpan={5} className="px-6 text-center py-4  ">
                Loading ....
              </td> :
              data?.data?.map((voucher, index) => (
                <VoucherListRow  key={voucher.id} voucher={voucher} />
                
              ))}
          </tbody>
        </table>
      </div>
      {!isLoading && <Pagination links={data?.links} meta={data?.meta} updateFetchUrl={updateFetchUrl} />}
    </div>
  );
};

export default VoucherList;
