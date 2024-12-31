"use client";

import FormSubmitBtn, { ClickButton } from "@/components/buttons/formBtn";
import { baseUrl } from "@/lib/configs";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { RiDeleteBin6Line } from "react-icons/ri";
import { toast, ToastContainer } from "react-toastify";

export default function AddNewFixture() {
  const router = useRouter();
  const [waiting, setWaiting] = useState(false);
  const [formData, setFormData] = useState({
    host: "",
    visitors: "",
    date: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setWaiting(true);
    const response = await fetch(baseUrl() + "/api/fixtures", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
      cache: "no-cache",
    });
    const results = await response.json();
    toast(results.message, { type: results.success ? "success" : "error" });
    setWaiting(false);
    if (results.success) setFormData({ host: "", visitors: "", date: "" });
    router.refresh();
  };

  //handle onchange
  const OnChange = (e) => {
    const { value, name } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };
  return (
    <div className="my-10">
      <h2 className="font-semibold mb-2 text-white text-2xl bg-gray-500 pl-2">
        Create new fixture
      </h2>
      <form onSubmit={handleSubmit} className="flex flex-wrap gap-2">
        <div>
          <p>Host</p>
          <input
            type="text"
            value={formData.host}
            required
            name="host"
            onChange={OnChange}
            maxLength={20}
            className="border text-lg px-2 w-60"
          />
        </div>

        <div>
          <p>Visitors</p>
          <input
            type="text"
            value={formData.visitors}
            required
            name="visitors"
            onChange={OnChange}
            className="border text-lg px-2 w-60"
            maxLength={20}
          />
        </div>

        <div>
          <p>Date</p>
          <input
            type="date"
            value={formData.date}
            required
            onChange={OnChange}
            name="date"
            className="border text-lg px-2 w-40"
          />
        </div>

        <FormSubmitBtn
          waiting={waiting}
          disabled={waiting}
          waitingText={"Saving fixture..."}
          primaryText={"Add"}
          styles="secondary__btn px-3 text-green-400"
        />
      </form>
    </div>
  );
}

export function DisplayFixtures({ fixtures }) {
  const [fixtureToEdit, setFixtureToEdit] = useState(null);

  return (
    <div>
      <table>
        <caption className="font-bold text-3xl bg-gray-600 text-white">
          Fixtures
        </caption>
        <tbody>
          <tr className="border p-2">
            <th>Match</th>
            <th>Date</th>
            <th>Action</th>
          </tr>
          {fixtures.map((fixture) => (
            <tr key={fixture._id} className="border p-2 text-xl">
              <td className="px-2 py-2">
                {fixture.host + " vs " + fixture.visitors}
              </td>
              <td className="px-2 py-2">{fixture.date}</td>
              <td className="px-2 py-2 flex gap-2 text-sm ">
                <ClickButton
                  handleClickEvent={() => {
                    setFixtureToEdit(fixture);
                  }}
                  primaryText={"Edit"}
                  styles="text-green-500"
                />
                <DeleteFixture fixtureId={fixture._id} />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <EditFixture
        fixture={fixtureToEdit}
        setFixtureToEdit={setFixtureToEdit}
      />
      <ToastContainer />
    </div>
  );
}

export function EditFixture({ fixture, setFixtureToEdit }) {
  const router = useRouter();
  const [waiting, setWaiting] = useState(false);
  const [formData, setFormData] = useState({
    host: fixture?.host,
    visitors: fixture?.visitors,
    date: fixture?.date,
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setWaiting(true);
    const response = await fetch(baseUrl() + "/api/fixtures", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        ...formData,
        date: formData.date.substring(0, 10),
        _id: fixture._id,
      }),
      cache: "no-cache",
    });
    const results = await response.json();
    toast(results.message, { type: results.success ? "success" : "error" });
    setWaiting(false);
    if (results.success) {
      setFormData({ host: "", visitors: "", date: "" });
      setFixtureToEdit(null);
    }
    router.refresh();
  };

  //handle onchange
  const OnChange = (e) => {
    const { value, name } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  if (!fixture) return;

  return (
    <div
      onClick={() => setFixtureToEdit(null)}
      className={`fixed right-0 left-0  z-30 pt-8 bg-[#00000005] transition-all duration-200 ${
        fixture ? "bottom-0 top-0" : "-top-full"
      } `}
    >
      <br />
      <form
        onSubmit={handleSubmit}
        onClick={(e) => e.stopPropagation()}
        className=" m-auto w-56 bg-slate-400 p-2 flex flex-col gap-2 justify-center items-center shadow-lg"
      >
        <h1 className="__h2 text-green-100 shadow w-full">Edit fixture</h1>
        <p className="text-yellow-300">
          {fixture.host + " vs " + fixture.visitors}
        </p>
        <hr />
        <div>
          <p>Host</p>
          <input
            type="text"
            onChange={OnChange}
            name="host"
            value={formData.host}
            className="border text-lg px-2 w-40"
          />
        </div>
        <div>
          <p>Visitors</p>
          <input
            type="text"
            onChange={OnChange}
            name="visitors"
            value={formData.visitors}
            className="border text-lg px-2 w-40"
          />
        </div>
        <div>
          <p>Date</p>
          <input
            type="date"
            value={formData.date}
            onChange={OnChange}
            name="date"
            className="border text-lg px-2 w-40"
          />
        </div>
        <FormSubmitBtn
          waiting={waiting}
          disabled={waiting}
          waitingText={"Saving changes..."}
          primaryText={"Save changes"}
          styles="secondary__btn px-3 mt-2"
        />
      </form>
    </div>
  );
}

export function DeleteFixture({ fixtureId }) {
  const router = useRouter();

  const [waiting, setWaiting] = useState(false);

  const handleDelete = async (e) => {
    e.preventDefault();
    setWaiting(true);
    const response = await fetch(baseUrl() + "/api/fixtures", {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        fixtureId: fixtureId,
      }),
      cache: "no-cache",
    });
    const results = await response.json();
    toast(results.message, { type: results.success ? "success" : "error" });
    setWaiting(false);

    router.refresh();
  };
  return (
    <ClickButton
      waiting={waiting}
      disabled={waiting}
      waitingText=""
      handleClickEvent={handleDelete}
      styles=" px-2 flex items-center text-red-600"
    >
      <RiDeleteBin6Line className={waiting && "hidden"} />
    </ClickButton>
  );
}
