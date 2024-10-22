import React from "react";

const ProductListSkeletonLoader = () => {
  let length = 5;
  const rowLength = Array.from ({ length }, (_, i) => i + 1);
  return (
    <>
      
        
        {rowLength.map(row => (
            <tr key={row} className="odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700">
            <td className="px-6 py-4">
              <div className="h-4 bg-gray-200 dark:bg-gray-600 rounded w-8 animate-pulse"></div>
            </td>
            <td
              scope="row"
              className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
            >
              <div className="h-4 bg-gray-200 dark:bg-gray-600 rounded w-32 animate-pulse"></div>
            </td>
            <td className="px-6 py-4 text-end">
              <div className="h-4 bg-gray-200 dark:bg-gray-600 rounded w-12 animate-pulse"></div>
            </td>
            <td className="px-6 py-4 text-end">
              <div className="space-y-2">
                <div className="h-3 bg-gray-200 dark:bg-gray-600 rounded w-20 animate-pulse"></div>
                <div className="h-3 bg-gray-200 dark:bg-gray-600 rounded w-16 animate-pulse"></div>
              </div>
            </td>
            <td className="px-6 py-4 text-end">
              <div className="inline-flex rounded-md shadow-sm" role="group">
                <div className="px-4 py-2 text-sm font-medium">
                  <div className="h-4 bg-gray-200 dark:bg-gray-600 rounded w-6 animate-pulse"></div>
                </div>
                <div className="px-4 py-2 text-sm font-medium">
                  <div className="h-4 bg-gray-200 dark:bg-gray-600 rounded w-6 animate-pulse"></div>
                </div>
              </div>
            </td>
          </tr>
        ))}
        
      
    </>
  );
};

export default ProductListSkeletonLoader;
