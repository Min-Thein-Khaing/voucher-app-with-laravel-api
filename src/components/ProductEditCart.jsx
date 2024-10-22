import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate, useParams } from "react-router-dom";
import { tailChase } from "ldrs";
import toast from "react-hot-toast";
import useSWR from "swr";

tailChase.register();

// Default values shown
const fetcher = (...args) => fetch(...args).then((res) => res.json());
const ProductEditCart = () => {
  const navigate = useNavigate();
  const {id} = useParams();
  
  const {data,isLoading,error} = useSWR(import.meta.env.VITE_API_URL + `/products/${id}`,fetcher)
  
  const [isSending, setSending] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();
  const handleEditProduct = async (data) => {
    setSending(true);

    await fetch(import.meta.env.VITE_API_URL + `/products/${id}`, {
      method: "PUT",
      body: JSON.stringify({
        product_name: data.product_name,
        price: data.price,
        created_at: new Date().toISOString(),
      }),
      headers: {
        "Content-Type": "application/json",
      },
    });

    setSending(false);
   
    console.log(data)
    if (data.back_to_product_list) {
      navigate("/product");
    }
    toast.success("Product created successfully");
  };
  
  return (
    <div className="bg-gray-200 p-5 rounded w-full md:w-1/2">
      <h1 className="font-bold mb-3 text-3xl">Edit Product</h1>
      <p className="text-sm text-gray-500 mb-5">
        Lorem ipsum dolor sit, amet consectetur adipisicing elit. Dolore, velit.
      </p>

{isLoading ? <div className="animate-pulse">
  {/* Skeleton for Product Name Input */}
  <div className="mb-4">
    <div className="h-2.5 bg-gray-300 rounded-full dark:bg-gray-600 w-24 mb-2"></div>
    <div className="h-10 bg-gray-300 rounded-lg dark:bg-gray-700 w-full"></div>
  </div>

  {/* Skeleton for Product Price Input */}
  <div className="mb-4">
    <div className="h-2.5 bg-gray-300 rounded-full dark:bg-gray-600 w-24 mb-2"></div>
    <div className="h-10 bg-gray-300 rounded-lg dark:bg-gray-700 w-full"></div>
  </div>

  {/* Skeleton for Checkboxes */}
  <div className="flex items-center mb-4">
    <div className="w-4 h-4 bg-gray-300 rounded dark:bg-gray-600"></div>
    <div className="h-2.5 bg-gray-300 rounded-full dark:bg-gray-600 w-36 ml-3"></div>
  </div>

  <div className="flex items-center mb-4">
    <div className="w-4 h-4 bg-gray-300 rounded dark:bg-gray-600"></div>
    <div className="h-2.5 bg-gray-300 rounded-full dark:bg-gray-600 w-52 ml-3"></div>
  </div>

  {/* Skeleton for Buttons */}
  <div className="flex items-center space-x-4">
    <div className="h-10 bg-gray-300 rounded-lg dark:bg-gray-700 w-24"></div>
    <div className="h-10 bg-gray-300 rounded-lg dark:bg-gray-700 w-36"></div>
  </div>
</div>

 : <form onSubmit={handleSubmit(handleEditProduct)}>
        <div>
          <label
            htmlFor="first_name"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          
          >
           Product Name 
          </label>
          <input
            {...register("product_name", {
              required: true,
              minLength: 3,
              maxLength: 30,
            })}
            type="text"
            defaultValue={data?.data?.product_name}
            className={`bg-gray-50 border mb-2 ${
              errors.product_name
                ? "border-red-300 focus:ring-red-500 focus:border-red-500"
                : "border-gray-300 focus:ring-blue-500 focus:border-blue-500"
            } text-gray-900 text-sm rounded-lg  block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500`}
            placeholder="eg. apple"
          />
          {errors.product_name?.type === "required" && (
            <p className="text-red-500 text-xs mb-2">
              Product name is required
            </p>
          )}
          {errors.product_name?.type === "minLength" && (
            <p className="text-red-500 text-xs mb-2">
              Product name must be higher than 3
            </p>
          )}
          {errors.product_name?.type === "maxLength" && (
            <p className="text-red-500 text-xs mb-2">
              Product name must be less than 10
            </p>
          )}
        </div>
        <div>
          <label
            htmlFor="last_name"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            
          >
            Price
          </label>
          <input
            {...register("price", { required: true, min: 500, max: 10000 })}
            type="text"
            defaultValue={data?.data?.price}
            id="last_name"
            className={`bg-gray-50 border mb-2 ${
              errors.price
                ? "border-red-300 focus:ring-red-500 focus:border-red-500"
                : "border-gray-300 focus:ring-blue-500 focus:border-blue-500"
            } text-gray-900 text-sm rounded-lg  block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500`}
            placeholder="eg. 500"
          />
          {errors.price?.type === "required" && (
            <p className="text-red-500 text-xs mb-2">Price is required</p>
          )}
          {errors.price?.type === "min" && (
            <p className="text-red-500 text-xs mb-2">Price is at least 500</p>
          )}
          {errors.price?.type === "max" && (
            <p className="text-red-500 text-xs mb-2">Price is at most 10000</p>
          )}
        </div>
        <div className="flex items-center my-4">
          <input
            {...register("all_correct")}
            required
            id="all-correct"
            type="checkbox"
            defaultValue
            className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
          />
          <label
            htmlFor="all-correct"
            className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300"
            required
          >
            Make sure all are correct
          </label>
        </div>

        <div className="flex items-center my-4">
          <input
            {...register("back_to_product_list")}
            id="back-to-route-list"
            type="checkbox"
            defaultValue
            checked
            className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
          />
          <label
            htmlFor="back-to-route-list"
            className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300"
            required
          >
            Back to product list after saving
          </label>
        </div>
        <Link
          to="/product"
          className="py-3  px-5 me-2 mb-2 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700"
        >
          Cancel
        </Link>
        <button className="justify-center inline-flex gap-2 items-center text-white mt-1 bg-blue-500 hover:bg-blue-700 font-bold py-2 px-4 rounded">
          <span>Update Product</span>{" "}
          {isSending && (
            <l-tail-chase size="20" speed="1.75" color="white"></l-tail-chase>
          )}
        </button>
      </form>}
      
    </div>
  );
};

export default ProductEditCart;
