import React from 'react'

const ProductRowEmptyList = () => {
  return (
    <>
        <tr className="odd:bg-white text-center hidden last:table-row odd:dark:bg-gray-900 even:bg-gray-100 even:dark:bg-gray-800 border-b dark:border-gray-700">
              <td colSpan={5} className="px-6 py-4  ">
                There is no List!
              </td>
            </tr>
    </>
  )
}

export default ProductRowEmptyList