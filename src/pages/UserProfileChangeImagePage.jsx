import React, { useRef } from "react";
import Breadcrumb from "../components/Breadcrumb";
import useCookie from "react-use-cookie";
import Container from "../components/Container";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import useUserStore from "../store/useUserStore";
import { HiCamera } from "react-icons/hi";
import { HiMiniCamera } from "react-icons/hi2";

const UserProfileChangeImagePage = () => {
  const [userCookie, setUserCookie] = useCookie("user");
  const [token] = useCookie("my_token");
  const {
    user: { name, email, profile_image },
    setUser,
  } = useUserStore();
  
  const fileInputRef = useRef()

  const handleImageUploader  = () => {
    fileInputRef.current.click()
  }


 

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  //! down arrow event ko data that is form ka nay pyount dr
  const onSubmit = async (event) => {
    const formData = new FormData();
    formData.append("profile_image", event.target.files[0]);
    // formData.append("profile_image", data.profile_image[0]); //modern ma pphit chin yin tone 
    const res = await fetch(
      import.meta.env.VITE_API_URL + "/user-profile/change-profile-image",
      {
        method: "POST",
        //photo ka json ma hope top  body: JSON.stringify(data) de lo yay ma ya
        body: formData,
        headers: {
          // "Content-Type": "application/json",
          // "Content-Type":"multipart/form-data", lo yin htae
          Accept: "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );
    const json = await res.json();
    if (res.status === 200) {
      toast.success(json.message);
      setUserCookie(JSON.stringify(json.user));
      setUser(json.user);
      reset();
    } else {
      toast.error(json.message);
    }
  };
  return (
    <section>
      <Container>
        <Breadcrumb
          links={[{ name: "User Profile", path: "/dashboard/user-profile" }]}
          currentPageName="Change Image"
        />
        <div className="w-full  border p-10 rounded-md flex flex-col items-start gap-3">
          <div className="relative">
            <img
              className="size-60 rounded-lg"
              src={
                profile_image
                  ? profile_image
                  : "https://upload.wikimedia.org/wikipedia/commons/8/89/Portrait_Placeholder.png"
              }
              alt="Helene avatar"
            />
            <button onClick={handleImageUploader }   className="text-white bg-blue-500 rounded-full p-2 text-center absolute translate-x-3 -translate-y-4 button-0 right-0 ">
              <HiMiniCamera className="size-4" />
            </button>
          </div>
          <form
            // onSubmit={handleSubmit(onSubmit)}
            className="space-y-4 gap-2 justify-center items-end flex "
          >
            <div>
              <input
                
                ref={fileInputRef}
                onChange={onSubmit}
                // {...register("profile_image", {
                //   required: true,
                // })}
                className="hidden w-full text-sm  text-gray-900 border  border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400"
                id="profile_image"
                type="file"
              />
              {errors.name?.type === "required" && (
                <p className="text-red-500 text-xs mb-2">Name is required</p>
              )}
            </div>
            {/* <button
              type="submit"
              className="inline-flex gap-3  items-center justify-center  rounded-lg bg-gray-700 px-5 py-2.5 text-sm font-medium text-white hover:bg-primary-800 focus:outline-none focus:ring-4 focus:ring-primary-300 dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800 sm:w-auto"
            >
              Update
            </button> */}
          </form>
        </div>
      </Container>
    </section>
  );
};

export default UserProfileChangeImagePage;
