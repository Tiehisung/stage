"use client";

import Link from "next/link";
import SearchNewsAdm from "./SearchNews";
import { usePathname } from "next/navigation";
import { ToastContainer } from "react-toastify";

export default function AdmNewsLayout({ children }) {
  const pathname = usePathname();

  return (
    <main className="bg-slate-200 px-[1vw] py-5 ">
      <br />
      <SearchNewsAdm pathname={pathname} />

      <br />

      <h2>News items</h2>
      <section className="grid bg-white gap-2 rounded-t-xl ">
        {children}
      </section>

      <br />

      <div className={`flex flex-wrap gap-2 items-center my-3 p-3 `}>
        <Link
          className={`h-fit w-fit px-9 py-5 font-extrabold shadow-md text-white text-center secondary__link ${
            pathname.includes("/publish") ? "hidden" : "flex"
          }`}
          href={"/admin/news/publish"}
        >
          Publish new
        </Link>
        <Link
          className={`h-fit w-fit px-9 py-5 font-extrabold shadow-md text-white text-center secondary__link ${
            pathname.includes("/news-archives") ? "hidden" : "flex"
          }`}
          href={"/admin/news/news-archives"}
        >
          Archives
        </Link>
        <Link
          className={`h-fit w-fit px-9 py-5 font-extrabold shadow-md text-white text-center secondary__link ${
            pathname.endsWith("/news") ? "hidden" : "flex"
          }`}
          href={"/admin/news/"}
        >
          View all news
        </Link>
        
      </div>

      <ToastContainer />
    </main>
  );
}
