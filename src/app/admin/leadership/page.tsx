import { ToastContainer } from "react-toastify";
import NewManagerForm from "./CreateLeader";
import ManagerFormModal from "./EditManager";
import { baseUrl } from "@/lib/configs";
import Image from "next/image";
import CaptaincyAdm from "./Captaincy";
import { IFileProps } from "@/types/interface";

export interface IManager {
  email: string 
  dob: string 
  _id: string;
  image: IFileProps;
  avatar: IFileProps;
  role: string;
  fullname: string;
  dateSigned: string;
  phone: string;
}

export const GetManagers = async (id?: string) => {
  if (id) {
    const response = await fetch(baseUrl() + "/api/managers/" + id, {
      cache: "no-cache",
    });
    const manager = await response.json();
    return manager;
  } else {
    const response = await fetch(baseUrl() + "/api/managers/", {
      cache: "no-cache",
    });
    const managers = await response.json();
    return managers;
  }
};

export const GetCaptains = async () => {
  const response = await fetch(baseUrl() + "/api/managers/captains", {
    cache: "no-cache",
  });
  const captains = await response.json();
  return captains;
};

export default async function Page() {
  const managers: IManager[] = await GetManagers();
  return (
    <main>
      <br />
      <NewManagerForm />
      <ul className="grid md:grid-cols-2 gap-y-36 justify-center items-center bg-white rounded-t-3xl p-2">
        {managers?.map((manager, index: number) => (
          <li
            key={index}
            className="flex flex-col justify-center items-center gap-2 my-5"
          >
            <Image
              src={manager?.image?.secure_url}
              width={300}
              height={300}
              alt="desc image"
              className="h-40 w-40 rounded-full shadow"
            />
            <p className="__h2 text-[grayText] first-letter:uppercase">
              {manager?.role}
            </p>
            <p>{manager?.fullname}</p>
            <p>
              <small className="italic">Since</small>{" "}
              <span>{manager?.dateSigned}</span>
            </p>
            <p className="text-teal-400">{manager?.phone}</p>
            <ManagerFormModal manager={manager} />
          </li>
        ))}
      </ul>

      <CaptaincyAdm />
      <ToastContainer />
    </main>
  );
}
