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
                <div className="w-full pb-10 h-screen lg:py-10 overflow-y-auto max-w-sm m-auto lg:max-w-none lg:m-none">
                    {header}
                    {children}
                </div>
            </div>
        </>
    );
};

export default BaseAdmin;
