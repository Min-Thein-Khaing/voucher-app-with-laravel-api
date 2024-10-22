import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { tailChase } from "ldrs";
import SaleForm from "./SaleForm";
import VoucherTable from "./VoucherTable";
import useRecordStore from "../store/useRecordStore";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

tailChase.register();

const VoucherInfo = () => {
  const navigate = useNavigate();
  const [isSending, setSending] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();
  const { records, resetRecords } = useRecordStore();

  const onSubmit = async (data) => {
    setSending(true);
    const total = records.reduce((pv, cv) => pv + cv.cost, 0);
    const tax = total * 0.07;
    const net_total = total + tax;
    const currentVoucher = { ...data, records, total, tax, net_total };
    
    const res = await fetch(import.meta.env.VITE_API_URL + "/vouchers", {
      method: "POST",
      body: JSON.stringify(currentVoucher),
      headers: {
        "Content-Type": "application/json",
        "Accept":"application/json"
      },
    });
    
   
    const json = await res.json();

    if (res.status === 201) {
      toast.success(json.message)
      resetRecords();
      reset();
      
      if (data.redirect_to_voucher_detail) {
        navigate(`/voucher/detail/${json.id}`);
        
      }
      setSending(false);
    }else {
      toast.error(json.message);
    }

    
  };
  const generateInvoiceNumber = () => {
    const prefix = "INV"; // Optional prefix for the invoice
    const datePart = new Date().toISOString().slice(0, 10).replace(/-/g, ""); // YYYYMMDD format
    const randomPart = Math.floor(1000 + Math.random() * 9000); // Random 4-digit number

    return `${prefix}-${datePart}-${randomPart}`;
  };

  return (
    <div>
      <div className="grid grid-cols-4 gap-5">
        <div className="col-span-3 flex flex-col h-full">
          <SaleForm />
          <VoucherTable />
        </div>
        <div className="col-span-1">
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="flex flex-col h-full"
            id="infoForm"
          >
            <div className="grid grid-cols-1 mb-5   gap-5">
              <div className="col-span-1">
                <label className="block  text-sm font-medium text-gray-900 dark:text-white">
                  Voucher ID
                </label>
                <input
                  {...register("voucher_id", {
                    required: true,
                  })}
                  type="text"
                  defaultValue={generateInvoiceNumber()}
                  className={`bg-gray-50 border  ${
                    errors.voucher_id
                      ? "border-red-300 focus:ring-red-500 focus:border-red-500"
                      : "border-gray-300 focus:ring-blue-500 focus:border-blue-500"
                  } text-gray-900 text-sm rounded-lg  block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500`}
                />
                {errors.voucher_id?.type === "required" && (
                  <p className="text-red-500 text-xs ">
                    Voucher Id is required
                  </p>
                )}
              </div>
              <div className="col-span-1">
                <label className="block  text-sm font-medium text-gray-900 dark:text-white">
                  Customer Name
                </label>
                <input
                  {...register("customer_name", {
                    required: true,
                  })}
                  type="text"
                  className={`bg-gray-50 border  ${
                    errors.customer_name
                      ? "border-red-300 focus:ring-red-500 focus:border-red-500"
                      : "border-gray-300 focus:ring-blue-500 focus:border-blue-500"
                  } text-gray-900 text-sm rounded-lg  block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500`}
                />
                {errors.customer_name?.type === "required" && (
                  <p className="text-red-500 text-xs ">
                    Customer Name is required
                  </p>
                )}
              </div>
              <div className="col-span-1">
                <label className="block  text-sm font-medium text-gray-900 dark:text-white">
                  Customer Email
                </label>
                <input
                  {...register("customer_email", {
                    required: true,
                  })}
                  type="text"
                  className={`bg-gray-50 border  ${
                    errors.customer_email
                      ? "border-red-300 focus:ring-red-500 focus:border-red-500"
                      : "border-gray-300 focus:ring-blue-500 focus:border-blue-500"
                  } text-gray-900 text-sm rounded-lg  block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500`}
                />
                {errors.customer_email?.type === "required" && (
                  <p className="text-red-500 text-xs ">
                    Customer Email is required
                  </p>
                )}
              </div>
              <div className="col-span-1">
                <label className="block  text-sm font-medium text-gray-900 dark:text-white">
                  Sale Date
                </label>
                <input
                  {...register("sale_date", {
                    required: true,
                  })}
                  type="date"
                  defaultValue={new Date().toISOString().slice(0, 10)}
                  className={`bg-gray-50 border  ${
                    errors.sale_date
                      ? "border-red-300 focus:ring-red-500 focus:border-red-500"
                      : "border-gray-300 focus:ring-blue-500 focus:border-blue-500"
                  } text-gray-900 text-sm rounded-lg  block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500`}
                />
                {errors.sale_date?.type === "required" && (
                  <p className="text-red-500 text-xs ">Sale Date is required</p>
                )}
              </div>
            </div>
            <div className="flex flex-col  mt-auto justify-center items-end gap-2">
              <div className="flex gap-1.5 items-center ">
                <label
                  htmlFor="redirect_to_voucher_detail"
                  className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                >
                  Redirect To Voucher Detail
                </label>
                <input
                  {...register("redirect_to_voucher_detail")}
                  form="infoForm"
                  id="redirect_to_voucher_detail"
                  type="checkbox"
                  defaultValue
                  className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                />
              </div>
              <div className="flex gap-1.5 items-center ">
                <label
                  htmlFor="all-correct"
                  className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                >
                  Make sure all are correct
                </label>
                <input
                  {...register("all_correct")}
                  required
                  form="infoForm"
                  id="all-correct"
                  type="checkbox"
                  defaultValue
                  className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                />
              </div>
              <button
                form="infoForm"
                className="justify-center inline-flex gap-2 items-center text-white mt-1 bg-blue-500 hover:bg-blue-700 font-bold py-2 px-4 rounded"
              >
                <span>Confirm Voucher</span>{" "}
                {isSending && (
                  <l-tail-chase
                    size="20"
                    speed="1.75"
                    color="white"
                  ></l-tail-chase>
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default VoucherInfo;
