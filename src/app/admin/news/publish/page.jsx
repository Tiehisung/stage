import { baseUrl } from "@/lib/configs";
import NewsCanvasCp from "./Canvas";
import Link from "next/link";

export const GetNews = async (id) => {
  if (id) {
    const response = await fetch(baseUrl() + "/api/news/" + id, {
      cache: "no-cache",
    });
    const result = await response.json();
    return result;
  }
  const response = await fetch(baseUrl() + "/api/news", { cache: "no-store" });
  const results = await response.json();
  return results;
};
export default async function NewsAdm({}) {
  return (
    <main>
      <h1 className="text-center __h2">News canvas</h1>
      
      <NewsCanvasCp />
    </main>
  );
}
