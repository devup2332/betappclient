import { useRouter } from "next/router";
import React, { useEffect, useRef, useState } from "react";
import { sidenavOptions } from "../../lib/utils/sidenavOptions";
import { useSideNav } from "../../providers/sidenavProvider";
import { IconClose } from "../atoms/icons";


const AdminSidenav = () => {
    const { openNav, setOpenNav } = useSideNav();
    const router = useRouter();
    const [match, setMatch] = useState(false);
    const sidenavRef = useRef<HTMLDivElement>(null);
    const handleCloseSideNav = () => {
        setOpenNav(false);
    };
    const setMediaQuery = () => {
        let lg = matchMedia("(min-width: 1024px)").matches;
        setMatch(lg);
    };
    useEffect(() => {
        setOpenNav(false);
        setMediaQuery();
        window.addEventListener("resize", setMediaQuery);
        return () => {
            removeEventListener("resize", setMediaQuery);
        };
    }, []);
    return (
        <div
            className="fixed top-0 left-0 w-full h-full transition-all duration-300 lg:static lg:h-screen lg:w-5/12 xl:w-3/12 2xl:w-2/12 "
            style={{
                opacity: !match ? (openNav ? "1" : "0") : "1",
                zIndex: !match ? (openNav ? "1" : "-1") : "1",
            }}
            ref={sidenavRef}
        >
            <div
                className="transition-all bg-white duration-300 -left-full font-montserrat absolute top-0 left-0 w-5/6 max-w-xs h-full shadow-card py-7 lg:static left-0 lg:shadow-none lg:bg-bgsidenav lg:h-full lg:w-full lg:max-w-none lg:py-10 overflow-y-auto"
                style={{
                    left: openNav ? "0px" : "-100%",
                }}
            >
                <div className="flex justify-between px-5 xl:px-10">
                    <h1 className="text-3xl font-bold font-montserrat xl:text-4xl">SEPHYRUS</h1>
                    <button onClick={handleCloseSideNav} className=" lg:hidden">
                        <IconClose className="w-5 text-black fill-current" />
                    </button>
                </div>

                <ul className="mt-5 text-xs lg:text-sm xl:text-base">
                    {sidenavOptions.map((opt, index) => {
                        return (
                            <li
                                className="flex gap-3 py-2 px-5 items-center hover:bg-bgbutton cursor-pointer transition-all  lg:py-4 xl:px-10"
                                key={index}
                                onClick={() => opt.actions(router)}
                            >
                                {opt.icon}
                                <span className={opt.label === "Salir" ? "text-danger font-bold" : ""}>
                                    {opt.label}
                                </span>
                            </li>
                        );
                    })}
                </ul>
            </div>
            <div className="bg-bgsecondary w-full h-full lg:hidden" onClick={handleCloseSideNav}></div>
        </div>
    );
};

export default AdminSidenav;
