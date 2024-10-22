import React from "react";
import useCookie from "react-use-cookie";
import Container from "../components/Container";
import Breadcrumb from "../components/Breadcrumb";
import { HiEnvelope, HiLockOpen, HiPencil, HiPencilSquare,  HiUser } from "react-icons/hi2";
import { Link } from "react-router-dom";
import useUserStore from "../store/useUserStore";

const UserProfilePage = () => {
  const {user:{name,email,profile_image}} =useUserStore()
  return (
    <section>
      <Container>
        <Breadcrumb currentPageName="User Profile" />
        {/* <div className="flex flex-col  gap-5 border rounded-md p-10">
          <img
            className="size-40 rounded-full object-cover object-top "
            src={
              profile_image
                ? profile_image
                : "https://upload.wikimedia.org/wikipedia/commons/8/89/Portrait_Placeholder.png"
            }
            alt=""
          />
          <div className="flex gap-3 items-center ">
              <HiUser className="size-6" /> 
              
              <div className="text-2xl justify-start items-center flex font-bold gap-3 ">
              {name}
            </div>
            <button className="border active:scale-95 scale-100 duration-100 px-3 py-1 bg-gray-500 text-white text-sm">Edit</button>
          </div>

          <div className="flex gap-3 items-center ">
            <HiEnvelope className="size-6" />
             <div className="font-sm   text-lg text-gray-500">{email}</div>
             </div>
        </div> */}
        <div className="space-y-4 max-w-[550px] lg:w-full  border p-10 rounded-md flex flex-col gap-3">
          <div className="flex w-full md:w-fll  space-x-4 items-end">
            <div className=" relative">
              <img
                className="size-60 rounded-lg"
                src={
                  profile_image
                    ? profile_image
                    : "https://upload.wikimedia.org/wikipedia/commons/8/89/Portrait_Placeholder.png"
                }
                alt="Helene avatar"
              />
              <Link to="user-change-image" className="border  size-10 flex absolute top-0 right-0 translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full active:scale-95 scale-100 duration-100 px-2 py-1 bg-gray-500 text-white text-sm">
                <HiPencilSquare   />
              </Link>
            </div>
            <div>
              <span className="mb-2 inline-block border  rounded bg-blue-100  text-xs font-medium text-primary-800 dark:bg-primary-900 dark:text-primary-300">
                {" "}
                Your Name{" "}
              </span>
              <h2 className="flex items-center text-xl font-bold leading-none text-gray-900 dark:text-white sm:text-2xl">
                {name}
              </h2>
            </div>
            <Link to="user-change-name" className="border size-10 flex items-center justify-center rounded-full active:scale-95 scale-100 duration-100 px-2 py-1 bg-gray-500 text-white text-sm">
              <HiPencilSquare  />
            </Link>
          </div>

          <dl >
            <div className="flex justify-start items-center gap-2">
              <dt className="font-semibold text-gray-900 dark:text-white">
                Email Address
              </dt>
              
            </div>
            <dd className="text-gray-500 dark:text-gray-400">{email}</dd>
          </dl>

          <Link to="user-change-password"
            type="button"
            className="inline-flex gap-3  items-center justify-center  rounded-lg bg-gray-700 px-5 py-2.5 text-sm font-medium text-white hover:bg-primary-800 focus:outline-none focus:ring-4 focus:ring-primary-300 dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800 sm:w-auto"
          >
            <HiLockOpen className="size-3" />
            Change Password
          </Link>
        </div>
      </Container>
    </section>
  );
};

export default UserProfilePage;
