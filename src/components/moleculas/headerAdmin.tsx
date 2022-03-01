import React from "react";
import { useSideNav } from "../../providers/sidenavProvider";
import { IconMenu } from "../atoms/icons";
import IconBell from "../atoms/icons/iconBell";

interface HeaderAdminProps {
  section: string;
}

const HeaderAdmin = ({ section }: HeaderAdminProps) => {
  const { setOpenNav } = useSideNav();
  const openNav = () => {
    setOpenNav(true);
  };
  return (
    <header className="flex  justify-between w-full items-center px-5 pt-5 max-w-sm m-auto lg:max-w-2xl lg:px-10 lg:pt-0">
      <h1 className="font-montserrat font-bold text-3xl lg:text-5xl">{section}</h1>
      <div className="flex items-center gap-5 lg:gap-10">
        <button className="block w-7 cursor-pointer relative">
          <IconBell className="w-7 text-black fill-current lg:w-9" />

          <span className="block absolute w-2.5 h-2.5 bg-danger rounded-full right-0 top-0"></span>
        </button>
        <button className="cursor-pointer lg:hidden" onClick={openNav}>
          <IconMenu className="w-7 text-black fill-current " />
        </button>
        <button className="object-cover w-7 h-7 cursor-pointer rounded-md overflow-hidden shadow-button lg:w-12 lg:h-12">
          <img
            src="https://images.unsplash.com/photo-1534308143481-c55f00be8bd7?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1930&q=80"
            alt=""
            className="object-cover h-full"
          />
        </button>
      </div>
    </header>
  );
};
export default HeaderAdmin;
