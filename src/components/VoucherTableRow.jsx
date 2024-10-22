import React from 'react'
import useRecordStore from '../store/useRecordStore'
import Swal from 'sweetalert2'

const VoucherTableRow = ({record:{cost,quantity,id,created_at,product:{product_name,price}},index}) => {
   const {changeQuantity,removeRecord} = useRecordStore() 
const handleAddBtn = () => {
    changeQuantity(id,1)
}
const handleSubBtn = () => {
    changeQuantity(id,-1)
}
const deleteBtn = () => {
   
        Swal.fire({
          title: 'Are you sure?',
          text: "You won't be able to revert this!",
          icon: 'warning',
          showCancelButton: true,
          confirmButtonColor: '#3085d6',
          cancelButtonColor: '#d33',
          confirmButtonText: 'Yes, delete it!'
        }).then((result) => {
          if (result.isConfirmed) {
            // Call removeRecord function to delete the record
            removeRecord(id);
            
            Swal.fire(
              'Deleted!',
              'Your record has been deleted.',
              'success'
            );
          }
        })
}
  return (
    <tr className="bg-white row  group border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600" >
      <td className="px-6 py-4 row-no" >{index+1}</td>
      <th scope="row" className="px-6 py-4 font-medium row-product-name text-gray-900 whitespace-nowrap dark:text-white">{product_name}</th>
      <td className="px-6 py-4 text-end">
        $ <span className="row-product-price">{price}</span>
      </td>
      <td className="px-6 py-4 justify-end flex items-center gap-1">
        <button onClick={handleSubBtn} className="row-q-sub opacity-0 group-hover:opacity-100 duration-300 -translate-x-20 group-hover:translate-x-0  print:hidden active:scale-75 ">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-5 h-5 pointer-events-none">
            <path strokeLinecap="round" strokeLinejoin="round" d="M15 12H9m12 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
          </svg>
        </button>
        <span className="row-quantity w-5 flex justify-end">{quantity}</span>
        <button onClick={handleAddBtn} className="row-q-add opacity-0  group-hover:opacity-100 duration-300 translate-x-20 group-hover:translate-x-0  print:hidden active:scale-75 ">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-5 h-5 pointer-events-none">
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v6m3-3H9m12 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
          </svg>
        </button>
      </td>
      <td className="px-6 py-4 text-end">
        $ <span className="row-cost">{cost}</span>
      </td>
      <td className="px-6 py-4 text-right">
        <button onClick={deleteBtn} className="row-del-btn print:hidden  active:scale-75 pointer-events-auto font-medium opacity-100  duration-300   text-blue-600 dark:text-blue-500 hover:underline">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-4 h-4 pointer-events-none">
            <path strokeLinecap="round" strokeLinejoin="round" d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" />
          </svg>
        </button>
      </td>
    </tr>

  )
}

export default VoucherTableRow