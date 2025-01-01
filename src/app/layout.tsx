"use client";

import HeaderCp from "../components/HeaderCp";
import "./globals.css";
import "react-toastify/dist/ReactToastify.css";
import AuthProvider from "@/providers/AuthProvider";
import RTKStoreProvider from "@/providers/RtkProvider";
import FooterCP from "@/components/foooter/FooterCp";

import { ReactNode } from "react";
import { ToastContainer } from "react-toastify";

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body>
        <RTKStoreProvider>
          <AuthProvider>
            <HeaderCp />
            {/* <ArmSearcherAtHome /> */}
            <div className={` border-red-400 `}>
              {children}
            </div>
            <FooterCP />
          </AuthProvider>
        </RTKStoreProvider>
        <ToastContainer />
      </body>
    </html>
  );
}

 