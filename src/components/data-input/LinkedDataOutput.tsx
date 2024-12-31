import { baseUrl } from "@/lib/configs";

export default function LinkedDataOutput({ importData }) {
  if (!importData) return null;
  return (
    <p>
      {importData.map((dataObject, index) =>
        dataObject.break ? (
          <br key={index} />
        ) : dataObject.link ? (
          <a
            href={dataObject.href}
            target={dataObject.href.includes(baseUrl()) ? "" : "_blank"}
            className="px-1 rounded-sm text-blue-700 visited:text-pink-900 inline"
          >
            {dataObject.linkText}
          </a>
        ) : (
          dataObject.text
        )
      )}
    </p>
  );
}
