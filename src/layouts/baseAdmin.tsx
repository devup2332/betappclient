import Head from "next/head";
import React from "react";
import { AdminSidenav } from "../components/organism";

interface BaseAdminProps {
    children: JSX.Element;
    section: string;
    header: JSX.Element;
}

const BaseAdmin = ({ children, section, header }: BaseAdminProps) => {
    return (
        <>
            <Head>
                <link
                    rel="stylesheet"
                    href="https://fonts.googleapis.com/css2?family=Montserrat:wght@100;200;300;400;500;600;700;800&family=Roboto:wght@100;300;400;500;700;900&display=swap"
                />
                <title>Admin - {section}</title>
            </Head>
            <div className="flex">
                <AdminSidenav />
                <div className="w-full h-screen lg:py-10 lg:max-w-xl overflow-y-auto ">
                    {header}
                    {children}
                </div>
            </div>
        </>
    );
};

export default BaseAdmin;
