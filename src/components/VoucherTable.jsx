import React from 'react'
import useRecordStore from '../store/useRecordStore'
import VoucherTableRow from './VoucherTableRow'

const VoucherTable = () => {
    const {records} = useRecordStore()
    const total = records.reduce((pv,cv)=> pv+cv.cost,0)
    const tax = total * 0.07
    const net_total = total + tax
  return (
    <table className="w-full mt-auto   text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
  <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
    <tr>
      <th scope="col" className="px-6 py-3">#</th>
      <th scope="col" className="px-6 py-3">Product name</th>
      <th scope="col" className="px-6 py-3 text-end">Price</th>
      <th scope="col" className="px-6 py-3 text-end">Quantity</th>
      <th scope="col" className="px-6 py-3 text-end">Cost</th>
      <th scope="col" className="px-6 py-3 text-end"></th>
      <th scope="col" className="px-6 py-3">
        <span className="sr-only">Edit</span>
      </th>
    </tr>
  </thead>
  <tbody id="rowGroup">
{records.length === 0 ?    <tr className="bg-white border-b text-center hidden last:table-row dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
      <th scope="row" colSpan={7} className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
        There is no record
      </th>
    </tr>: records.map((record,index) => <VoucherTableRow key={record.product_id} record={record} index={index} />)}   
  </tbody>
  <tfoot>
    <tr className="bg-gray-100 border-b text-end dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
      <th scope="row" colSpan={4} className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
        Total
      </th>
      <td className="px-6 py-3 text-end">
         {total}
      </td>
      <td className="px-6 py-3 text-end">
        
      </td>
      <td />
    </tr>
    <tr className="bg-gray-100 border-b text-end dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
      <th scope="row" colSpan={4} className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
        Tax
      </th>
      <td className="px-6 py-3 text-end">
         {(tax).toFixed(2)}
      </td>
      <td className="px-6 py-3 text-end">
        
      </td>
      <td />
    </tr>
    <tr className="bg-gray-100 border-b text-end dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
      <th scope="row" colSpan={4} className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
        Net Total (THB)
      </th>
      <td className="px-6 py-3 text-end">
         {net_total}
      </td>
      <td className="px-6 py-3 text-end">
        
      </td>
      <td />
    </tr>
  </tfoot>
</table>


  )
}

export default VoucherTable