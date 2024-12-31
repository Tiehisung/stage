"use client";

export function NewsSource({
  source = { link: true, text: "", href: "" },
  setSource,
}) {
  return (
    <div className="shadow p-2 rounded-md">
      <div className="flex justify-between items-center py-2">
        <p className="__h2">Source</p>
        <span className="flex gap-1 items-center">
          <button
            className={`text-center px-2 ${
              !source.link ? "primary__btn" : "secondary__btn"
            }`}
            onClick={() => setSource((prev) => ({ ...prev, link: false }))}
          >
            Plaintext
          </button>
          <button
            className={`text-center px-2 ${
              source.link ? "primary__btn" : "secondary__btn"
            }`}
            onClick={() => setSource((prev) => ({ ...prev, link: true }))}
          >
            Link
          </button>
        </span>
      </div>

      <div className="grid md:grid-cols-2 gap-2">
        <textarea
          name=""
          className="bg-[#fbfbfb] p-2 w-full"
          value={source.text}
          onChange={(e) =>
            setSource((prev) => ({ ...prev, text: e.target.value }))
          }
          placeholder={source.link ? "Source link text" : "Source text"}
        />

        <textarea
          name=""
          hidden={!source.link}
          className="bg-[#fbfbfb] p-2 w-full"
          value={source.href}
          onChange={(e) =>
            setSource((prev) => ({ ...prev, href: e.target.value }))
          }
          placeholder={"Source link url/href"}
        />
      </div>
    </div>
  );
}
