import { GetNews } from "./publish/page";
import NewsActionsCp from "./NewsActions";
import { baseUrl } from "@/lib/configs";
import LoadingSpinner from "@/components/loading/icon-loaders";

export const GetArchives = async (category) => {
  const response = await fetch(
    baseUrl() + "/api/archives?category=" + category,
    {
      cache: "no-store",
    }
  );
  const results = await response.json();
  return results;
};
export default async function ManageNews({ searchParams }) {
  const news = await GetNews();

  const query = searchParams.n_query || "";
  const filterString = searchParams.n_filter;

  const results = news?.filter((newsItem) =>
    (newsItem?.headline + newsItem?.createdAt)?.toLowerCase()?.includes(query)
  );
  function filteredNews() {
    switch (filterString) {
      case "latest":
        return results?.filter((newsItem) => newsItem.stats.isLatest);
      case "trending":
        return results?.filter((newsItem) => newsItem.stats.isTrending);
      default:
        return results;
    }
  }

  return (
    <div className="bg-[#abc0ff1a]">
      <ul className=" ">
        {!results && (
          <LoadingSpinner
            message="Searching news..."
            loaderNumber={1}
            iconStyle={"text-3xl"}
            contStyle="flex flex-col justify-center items-center h-full text-teal-400"
          />
        )}
        {filteredNews()?.map((newsItem, index) => (
          <li
            key={index}
            className="grid gap-5 hover:bg-slate-50 px-2 py-1 group h-20 first-of-type:rounded-t-xl"
          >
            <h1 className="pr-24 truncate relative">
              {newsItem.headline}
              <span className="absolute right-0 text-gray-400 text-sm italic">
                {newsItem.createdAt.substring(0, 10)}
              </span>
            </h1>

            <NewsActionsCp newsItem={newsItem} />
          </li>
        ))}
      </ul>
    </div>
  );
}
