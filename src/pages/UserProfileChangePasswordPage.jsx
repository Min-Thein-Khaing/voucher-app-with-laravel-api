import React from "react";
import Breadcrumb from "../components/Breadcrumb";
import useCookie, { removeCookie } from "react-use-cookie";
import Container from "../components/Container";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import useUserStore from "../store/useUserStore";
import { useNavigate } from "react-router-dom";

const UserProfileChangePasswordPage = () => {
  const [userCookie, setUserCookie] = useCookie("user");
  const [token] = useCookie("my_token");
  const { user, setUser } = useUserStore();
  const navigate = useNavigate()
  

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();
  const onSubmit = async (data) => {
    console.log(data);
    const res = await fetch(
      import.meta.env.VITE_API_URL + "/user-profile/change-password",
      {
        method: "POST",
        body: JSON.stringify(data),
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );
    const json = await res.json();
    if (res.status === 200) {
      toast.success("Password changed successfully");
      // setUserCookie(JSON.stringify(json.user));
      // setUser(json.user);
      removeCookie("my_token");
      removeCookie("user");
      navigate("/")

    } else {
      toast.error(json.message);
    }
  };
  return (
    <section>
      <Container>
        <Breadcrumb
          links={[{ name: "User Profile", path: "/dashboard/user-profile" }]}
          currentPageName="Change Password"
        />
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="space-y-4 w-full  border p-10 rounded-md flex flex-col  items-start gap-3"
        >
          <div  className="w-[350px]">
            <label
              htmlFor="old_password"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Old Password
            </label>
            <input
              {...register("old_password", {
                required: true,
                minLength: 3,
                maxLength: 30,
              })}
              type="password"
              className={`bg-gray-50 border mb-2 w-[450px] ${
                errors.old_password
                  ? "border-red-300 focus:ring-red-500 focus:border-red-500"
                  : "border-gray-300 focus:ring-blue-500 focus:border-blue-500"
              } text-gray-900 text-sm rounded-lg  block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500`}
              placeholder="**********"
            />
            {errors.old_password?.type === "required" && (
              <p className="text-red-500 text-xs mb-2">Name is required</p>
            )}
            {errors.old_password?.type === "minLength" && (
              <p className="text-red-500 text-xs mb-2">
                Name must be higher than 3
              </p>
            )}
            {errors.old_password?.type === "maxLength" && (
              <p className="text-red-500 text-xs mb-2">
                Name must be less than 10
              </p>
            )}
          </div>
          <div  className="w-[350px]">
            <label
              htmlFor="new_password"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              New Password
            </label>
            <input
              {...register("new_password", {
                required: true,
                minLength: 3,
                maxLength: 30,
              })}
              type="password"
              className={`bg-gray-50 border mb-2 w-[450px] ${
                errors.new_password
                  ? "border-red-300 focus:ring-red-500 focus:border-red-500"
                  : "border-gray-300 focus:ring-blue-500 focus:border-blue-500"
              } text-gray-900 text-sm rounded-lg  block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500`}
              placeholder="**********"
            />
            {errors.new_password?.type === "required" && (
              <p className="text-red-500 text-xs mb-2">Name is required</p>
            )}
            {errors.new_password?.type === "minLength" && (
              <p className="text-red-500 text-xs mb-2">
                Name must be higher than 3
              </p>
            )}
            {errors.new_password?.type === "maxLength" && (
              <p className="text-red-500 text-xs mb-2">
                Name must be less than 10
              </p>
            )}
          </div>
          <div className="w-[350px]">
            <label
              htmlFor="new_password_confirmation"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Confirm Password
            </label>
            <input
              {...register("new_password_confirmation", {
                required: true,
                minLength: 3,
                maxLength: 30,
              })}
              type="password"
              className={`bg-gray-50 border mb-2 w-[450px] ${
                errors.new_password_confirmation
                  ? "border-red-300 focus:ring-red-500 focus:border-red-500"
                  : "border-gray-300 focus:ring-blue-500 focus:border-blue-500"
              } text-gray-900 text-sm rounded-lg  block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500`}
              placeholder="**********"
            />
            {errors.new_password_confirmation?.type === "required" && (
              <p className="text-red-500 text-xs mb-2">Name is required</p>
            )}
            {errors.new_password_confirmation?.type === "minLength" && (
              <p className="text-red-500 text-xs mb-2">
                Name must be higher than 3
              </p>
            )}
            {errors.new_password_confirmation?.type === "maxLength" && (
              <p className="text-red-500 text-xs mb-2">
                Name must be less than 10
              </p>
            )}
          </div>
          <button
            type="submit"
            className="inline-flex gap-3  items-center justify-center  rounded-lg bg-gray-700 px-5 py-2.5 text-sm font-medium text-white hover:bg-primary-800 focus:outline-none focus:ring-4 focus:ring-primary-300 dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800 sm:w-auto"
          >
            Change Password
          </button>
        </form>
      </Container>
    </section>
  );
};

export default UserProfileChangePasswordPage;
