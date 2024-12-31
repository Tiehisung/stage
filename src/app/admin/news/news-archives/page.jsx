import { ToastContainer } from "react-toastify";
import { GetArchives } from "../page";
import NewsArchiveActionsAdm from "./ArchiveActions";
import LoadingSpinner from "@/components/loading/icon-loaders";

export default async function AdmNewsArchives({ searchParams }) {
  const newsArchives = await GetArchives("archived_news");
  const searchQuery = searchParams.n_query;
  const results = newsArchives.filter((newsItem) =>
    (newsItem?.headline + newsItem?.createdAt)
      ?.toLowerCase()
      ?.includes(searchQuery||"")
  );

  return (
    <div>
      <ul className=" ">
        {!results && (
          <LoadingSpinner
            message="Searching news..."
            loaderNumber={1}
            iconStyle={"text-3xl"}
            contStyle="flex flex-col justify-center items-center h-full text-teal-400"
          />
        )}
        {results?.map((newsItem, index) => (
          <li
            key={index}
            className="grid gap-3 hover:bg-slate-50 p-2 group h-20 first-of-type:rounded-t-xl"
          >
            <h1 className="pr-24 truncate relative">
              {newsItem.headline}
              <span className="absolute right-0 text-gray-400 text-sm italic">
                {newsItem.createdAt.substring(0, 10)}
              </span>
            </h1>

            <NewsArchiveActionsAdm newsItem={newsItem} />
          </li>
        ))}
      </ul>
    </div>
  );
}
