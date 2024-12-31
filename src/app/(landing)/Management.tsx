import ReactResponsiveCarousel from "@/components/Animate/ReactResponsive/Carousel";
import React from "react";
import { GetCaptains, GetManagers, IManager } from "../admin/leadership/page";
import Image from "next/image";
import { ICaptainProps } from "../admin/leadership/Captaincy";
import _players from "@/data/players";

export const TechnicalManagement = async () => {
  const managers: IManager[] = await GetManagers();
  return (
    <div id="technical-management" className="md:max-w-xl max-w-full overflow-hidden">
      <h1 className="mb-4 text-lg md:text-xl px-1">Technical Management</h1>
      <ReactResponsiveCarousel
        showIndicators
        autoPlay
        slidesPerView={2}
        className="grow sm:grow-0 sm:max-w-96 border border-gray-100 rounded-badge p-5 "
      >
        {managers?.map((manager: IManager, index: React.Key) => (
          <div
            key={index}
            className="flex flex-col justify-center items-center gap-2 mb-6 "
          >
            <Image
              src={manager?.image?.secure_url}
              width={300}
              height={300}
              alt="desc image"
              className="h-40 w-40 max-w-40 rounded-full shadow"
            />
            <p className="font-bold text-lg text-[grayText] first-letter:uppercase">
              {manager?.role}
            </p>
            <p className="text-black">{manager?.fullname}</p>
          </div>
        ))}
      </ReactResponsiveCarousel>
    </div>
  );
};

export const CaptaincySlides = async () => {
  const captains: ICaptainProps[] = await GetCaptains();
  return (
    <div id="captaincy">
      <h1 className="mb-4 text-lg md:text-xl px-1">Captaincy</h1>

      <ReactResponsiveCarousel
        autoPlay
        className="grow sm:grow-0 sm:max-w-96 border border-gray-100 rounded-badge p-5 "
        slidesPerView={2}
      >
        {captains?.map((captain, index: number) => (
          <div
            key={index}
            className="flex flex-col justify-center items-center gap-2 mb-6"
          >
            <Image
              src={
                captain?.player?.avatar?.secure_url! ??
                _players[0].avatar?.secure_url
              }
              width={300}
              height={300}
              alt="desc image"
              className="h-40 w-40 max-w-40 rounded-xl shadow-md"
            />
            <p className=" text-[grayText] first-letter:uppercase">
              {captain?.captaincy}
            </p>
            <p>
              {captain?.player?.firstName ?? "Firstname"}{" "}
              {captain?.player?.lastName ?? "Lastname"}
            </p>
          </div>
        ))}
      </ReactResponsiveCarousel>
    </div>
  );
};

const LandingTeamManagement = () => {
  return (
    <div className="flex flex-wrap gap-6 items-start">
      <TechnicalManagement />
      <CaptaincySlides />
    </div>
  );
};
export default LandingTeamManagement;
