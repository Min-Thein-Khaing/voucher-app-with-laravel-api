import React from "react";
import { HiArrowLeft, HiArrowRight } from "react-icons/hi2";

const Pagination = ({ links: { prev, next }, meta: { from, to, total } ,updateFetchUrl}) => {
    const handlePrevBtn = async() => {
        updateFetchUrl(prev)
    }
    const handleNextBtn = async() => {
        updateFetchUrl(next)
    }
  return (
    <div className="flex mt-3 mx-6 justify-between  items-center">
      {/* Help text */}
      <span className="text-sm select-none text-gray-700 dark:text-gray-400">
        Showing {from} to {to} of {total} Entries
      </span>
      {/* Buttons */}
      <div className="inline-flex  xs:mt-0">
        <button
        onClick={handlePrevBtn}
          disabled={!prev}
          className="size-10 flex items-center justify-center border border-gray-300 rounded-s-lg text-gray-600 hover:bg-gray-100 focus:ring-1 focus:ring-gray-300 focus:ring-offset-2 scale-100 active:scale-95 disabled:pointer-events-none disabled:opacity-50 duration-300 hover:text-black text-sm font-bold"
        >
          <HiArrowLeft />
        </button>
        <button
        onClick={handleNextBtn}
          disabled={!next}
          className="size-10 flex items-center justify-center border border-gray-300 rounded-e-lg text-gray-600 hover:bg-gray-100 focus:ring-1 focus:ring-gray-300 focus:ring-offset-2 scale-100 active:scale-95 disabled:pointer-events-none disabled:opacity-50 duration-300 hover:text-black text-sm font-bold"
        >
          <HiArrowRight />
        </button>
      </div>
    </div>
  );
};

export default Pagination;
