import React from "react";
import ModuleBtn from "../components/ModuleBtn";
import { FiDatabase } from "react-icons/fi";
import { MdPercent } from "react-icons/md";
import Container from "../components/Container";
import { BiConversation } from "react-icons/bi";
import Logout from "../components/Logout";
import { HiPlayCircle, HiUserCircle } from "react-icons/hi2";

const DashboardPage = () => {
  
  return (
    <div>
      <Container>
        <div className="grid grid-cols-2 md:grid-cols-3 mb-10  w-full  gap-5">
          <div className="col-span-1  row-span-1  text-white">
            <ModuleBtn
              name="Product Module"
              icon={<FiDatabase className="size-7" />}
              url="/dashboard/product"
            />
          </div>
          <div className="col-span-1  row-span-1 text-white">
            <ModuleBtn
              name="Sale Module"
              icon={<MdPercent className="size-7" />}
              url="/dashboard/sale"
            />
          </div>
          <div className="col-span-1  row-span-1 text-white">
            <ModuleBtn
              name="Voucher Module"
              icon={<BiConversation className="size-7" />}
              url="/dashboard/voucher"
            />
          </div>
          <div className="col-span-1  row-span-1 text-white">
            <ModuleBtn
              name="Profile Module"
              icon={<HiUserCircle className="size-7" />}
              url="/dashboard/user-profile"
            />
          </div>
        </div> 
        <div className="flex justify-end gap-3 items-center ">
          <p>If you finish your job,just</p>
          <Logout />
        </div>
      </Container>
    </div>
  );
};

export default DashboardPage;
