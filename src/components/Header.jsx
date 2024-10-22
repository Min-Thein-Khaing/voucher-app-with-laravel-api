import React from "react";
import Container from "./Container";
import useCookie from 'react-use-cookie';
import useUserStore from "../store/useUserStore";

const Header = () => {
  // const [userCookie] = useCookie("user");
  // console.log(userCookie);
  // const {name,email,profile_image} = JSON.parse(userCookie);
  const {user:{name,email,profile_image}} = useUserStore()
  
  return (
    <header className="flex flex-col gap-1  mb-5">
      <Container>
        <div className="flex justify-between">
          <div>
            <h1 className="text-3xl  font-bold">Voucher App</h1>
            <p className="text-lg text-gray-400">MMS Software</p>
          </div>
          <div className="flex gap-2">
            <img src={profile_image ? profile_image : "https://upload.wikimedia.org/wikipedia/commons/8/89/Portrait_Placeholder.png"} className="size-16 rounded-full object-cover object-top " alt="user_photo" />
            <div>
              <h1 className="text-3xl  font-bold">{name}</h1>
              <p className="text-lg text-gray-400"></p>{email}
            </div>
          </div>
        </div>
      </Container>
    </header>
  );
};

export default Header;
