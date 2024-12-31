"use client";

import HeaderCp from "../components/HeaderCp";
import "./globals.css";
import "react-toastify/dist/ReactToastify.css";
import AuthProvider from "@/providers/AuthProvider";
import RTKStoreProvider from "@/providers/RtkProvider";
import FooterCP from "@/components/foooter/FooterCp";

import { ReactNode } from "react";

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body>
        <RTKStoreProvider>
          <AuthProvider>
            <HeaderCp />
            {/* <ArmSearcherAtHome /> */}
            <div className={`mt-[8vh] md:mt-[10vh] border-red-400 `}>
              {children}
            </div>
            <FooterCP />
          </AuthProvider>
        </RTKStoreProvider>
      </body>
    </html>
  );
}

 