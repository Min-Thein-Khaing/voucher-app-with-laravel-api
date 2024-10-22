import React from "react";
import Breadcrumb from "../components/Breadcrumb";
import useCookie from "react-use-cookie";
import Container from "../components/Container";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import useUserStore from "../store/useUserStore";


const UserProfileChangeNamePage = () => {
  const [userCookie,setUserCookie] = useCookie("user");
  const [token] = useCookie("my_token");
const {user,setUser} = useUserStore()
  
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset
  } = useForm();
  const onSubmit = async(data) => {
    console.log(data)
    const res = await fetch(import.meta.env.VITE_API_URL + "/user-profile/change-name", {
      method:"POST",
      body: JSON.stringify(data),
      headers:{
        "Content-Type":"application/json",
        Accept:"application/json",
        "Authorization":`Bearer ${token}`,
      }
    })
    const json = await res.json();
    if(res.status === 200){
      toast.success(json.message)
      setUserCookie(JSON.stringify(json.user))
      setUser(json.user)
      reset()
    }else{
      toast.error(json.message)
    }
  };
  return (
    <section>
      <Container>
        <Breadcrumb
          links={[{ name: "User Profile", path: "/dashboard/user-profile" }]}
          currentPageName="Change Name"
        />
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 :w-full  border p-10 rounded-md flex  items-center gap-3">
         
            <div>
              <label
                htmlFor="first_name"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Update Name
              </label>
              <input
                {...register("name", {
                  required: true,
                  minLength: 3,
                  maxLength: 30,
                })}
                type="text"
                className={`bg-gray-50 border mb-2 w-[450px] ${
                  errors.name
                    ? "border-red-300 focus:ring-red-500 focus:border-red-500"
                    : "border-gray-300 focus:ring-blue-500 focus:border-blue-500"
                } text-gray-900 text-sm rounded-lg  block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500`}
                placeholder="eg. apple"
              />
              {errors.name?.type === "required" && (
                <p className="text-red-500 text-xs mb-2">
                  Name is required
                </p>
              )}
              {errors.name?.type === "minLength" && (
                <p className="text-red-500 text-xs mb-2">
                  Name must be higher than 3
                </p>
              )}
              {errors.name?.type === "maxLength" && (
                <p className="text-red-500 text-xs mb-2">
                  Name must be less than 10
                </p>
              )}
            </div>
          <button
            type="submit"
            className="inline-flex gap-3  items-center justify-center  rounded-lg bg-gray-700 px-5 py-2.5 text-sm font-medium text-white hover:bg-primary-800 focus:outline-none focus:ring-4 focus:ring-primary-300 dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800 sm:w-auto"
            >
            Update
          </button>
        
            </form>
      </Container>
    </section>
  );
};

export default UserProfileChangeNamePage;
