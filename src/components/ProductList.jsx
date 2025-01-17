import React, { useRef, useState } from "react";
import { BsPencil } from "react-icons/bs";
import { FaRegTrashCan } from "react-icons/fa6";
import { HiSearch, HiX } from "react-icons/hi";
import { HiPlus } from "react-icons/hi2";
import useSWR from "swr";
import ProductListSkeletonLoader from "./ProductListSkeletonLoader";
import ProductRowEmptyList from "./ProductRowEmptyList";
import ProductListRow from "./ProductListRow";
import {throttle,debounce} from "lodash";
import Pagination from "./Pagination";
import useCookie from 'react-use-cookie';

const ProductList = () => {
  const [token] = useCookie("my_token")
  const fetcher = (...args) => fetch(...args,{
    headers:{
      "Authorization":`Bearer ${token}`
    }
  }
    
  ).then((res) => res.json());
  
  const searchInput = useRef();
  const [fetchUrl,setFetchUrl] = useState(import.meta.env.VITE_API_URL + `/products`)
  
  const updateFetchUrl = (url) => {
    setFetchUrl(url)
  }
  const { data, isLoading, error } = useSWR(
    fetchUrl,
    fetcher
  );
  //throttle and debounce
  const handleSearch = debounce((e) => {
    setFetchUrl(import.meta.env.VITE_API_URL + `/products?q=${e.target.value}`)
  })
  // if(isLoading) return <div>Loading...</div>
  // console.log(data)

  return (
    <div>
      <div className=" flex flex-wrap justify-between  mb-3">
        <div className="">
          <div className="relative mb-4">
            <div className="absolute inset-y-0 start-0 flex items-center ps-3.5 pointer-events-none">
              <HiSearch className="w-4 h-4 text-stone-500 dark:text-stone-400" />
            </div>
            <input
            
              type="text"
              onChange={handleSearch}
              className="bg-gray-50 border border-gray-300 text-stone-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full ps-10 p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="Search Product"
            />
            
          </div>
        </div>
        <div className="">
          <a
            href="/product/create"
            className="text-white flex justify-center items-center gap-3 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          >
            Add new Product
            <HiPlus />
          </a>
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
                Product name
              </th>

              <th scope="col" className="px-6 py-3 text-end">
                Price
              </th>
              <th scope="col" className="px-6 py-3 text-end">
                Category_At
              </th>
              <th scope="col" className="px-6 py-3 text-end">
                Updated_At
              </th>
              <th scope="col" className="px-6 py-3 text-end">
                Action
              </th>
            </tr>
          </thead>
          <tbody>
            {isLoading ? (
              <ProductListSkeletonLoader />
            ) : data?.data?.length === 0 ? (
              <ProductRowEmptyList />
            ) : (
              data?.data?.map((product) => (
                <ProductListRow key={product.id} product={product} />
              ))
            )}

          </tbody>
            
        </table>
        
      </div>
      {!isLoading && <Pagination updateFetchUrl={updateFetchUrl} links={data?.links} meta={data?.meta} />}
    </div>
  );
};

export default ProductList;
