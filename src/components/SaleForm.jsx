import React from "react";
import { useForm } from "react-hook-form";
import useSWR from "swr";
import useRecordStore from "../store/useRecordStore";

const fetcher = (...args) => fetch(...args).then((res) => res.json());
const SaleForm = () => {
  const { addRecord, records, changeQuantity } = useRecordStore();
  const { data, isLoading, error } = useSWR(
    import.meta.env.VITE_API_URL + "/products?limit=100",
    fetcher
  );
  const { register, handleSubmit, reset } = useForm();
  const onSubmit = (data) => {
    
    const currentProduct = JSON.parse(data.product);

    const currentId = currentProduct.id
    const isExciting = records.find(({product:{id}})=>currentId === id)
 
   if(isExciting){
    changeQuantity(isExciting.product_id,data.quantity)
   }else{

       addRecord({
         product_id:currentProduct.id,
         product: currentProduct,
         quantity: data.quantity,
         cost: currentProduct.price * data.quantity,
         created_at: new Date().toISOString(),
       });
       reset();
   }

  };
  return (
    <div className="mb-5">
      <form action="#" id="createForm" onSubmit={handleSubmit(onSubmit)}>
        <div className="flex   gap-3 border rounded-lg p-5">
          <div className="basis-5/12">
            <label
              htmlFor="countries"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Select a product
            </label>
            <select
              id="productSelect"
              name="productSelect"
              {...register("product")}
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            >
              <option value="">Select a product</option>
              {!isLoading &&
                data?.data?.map((product) => (
                  <option key={product.id} value={JSON.stringify(product)}>
                    {product.product_name}
                  </option>
                ))}
            </select>
          </div>
          <div className="basis-5/12">
            <label
              htmlFor="inputQuantity"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Quantity
            </label>
            <input
              type="number"
              id="inputQuantity"
              name="inputQuantity"
              {...register("quantity")}
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-600 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            />
          </div>

          <div className="col-span-1">
            <button
              type="submit"
              className="text-blue-700 text-nowrap  hover:text-white border border-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm h-full flex justify-center items-center  px-7 py-2 text-center me-2 mb-2 dark:border-blue-500 w-full dark:text-blue-500 dark:hover:text-white dark:hover:bg-blue-500 dark:focus:ring-blue-800"
            >
              Add Product
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default SaleForm;
